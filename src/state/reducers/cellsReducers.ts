import { ActionType } from "../action-types";
import { Action } from "../actions"; 
import {Cell} from '../cell';
import produce from 'immer';


// Describe structure of Cell Reducer
interface CellState { 
    loading: boolean; 
    error: string | null;
    order: string[];
    data: { 
        [key: string]: Cell
    }

}

const initialState: CellState = { 
    loading: false,
    error: null,
    order: [],
    data: {},
};

const reducer = produce((
    state: CellState = initialState, // an array that stores all the cell objects currently on screen.
    action: Action // new update for a particular cell
    ) : CellState | void => { 
        
        switch(action.type) { 

            case ActionType.SAVE_CELLS_ERROR: 
                state.error = action.payload; 

                return state; 
            case ActionType.FETCH_CELLS: 
                state.loading = true; 
                state.error = null; 

                return state; 
            case ActionType.FETCH_CELLS_COMPLETE: 
                state.order = action.payload.map(cell => cell.id);
                state.data = action.payload.reduce((acc, cell)=> { 
                    acc[cell.id] = cell; 

                    return acc; 
                }, {} as CellState['data']);

                return state;
            case ActionType.FETCH_CELLS_ERROR: 
                state.loading = false;
                state.error = action.payload; 

                return state; 
            case ActionType.UPDATE_CELL:
                const { id, content } = action.payload; 
                state.data[id].content = content; 

                return;
            case ActionType.DELETE_CELL:

                // delete object from data of objs of cell obj
                delete state.data[action.payload]; 

                // remove id of deleted cell
                state.order = state.order.filter(id => id !== action.payload);

                return; 
                
            case ActionType.MOVE_CELL:
                const { direction } = action.payload; 

                // find index of cell to be moved.
                const index = state.order.findIndex((id) =>  id === action.payload.id);
                
                // based on chosen direction destination index is calculated. 
                const targetIndex = direction === 'up' ? index -1 : index + 1; 

                // invalid index.
                if (targetIndex < 0 || targetIndex > state.order.length -1) { return; } 

                state.order[index] = state.order[targetIndex]; 
                state.order[targetIndex] = action.payload.id; 

                return; 
            case ActionType.INSERT_CELL_AFTER:

                const cell : Cell = { 
                    content : '',
                    type: action.payload.type,
                    id: randomID()
                };

                state.data[cell.id] = cell; 

                const foundIndex = state.order.findIndex( id => id === action.payload.id); 

                // add new cell id into array. 
                if ( foundIndex < 0) { 
                    state.order.unshift(cell.id); // add new cell infront.
                } else {
                    state.order.splice(foundIndex + 1, 0, cell.id);
                }

                return; 
            default:

                return state; /* default state returns initialState  */
        }

}, initialState);

const randomID = () => { 
    return Math.random().toString(36).substring(2,5); 
}

export default reducer; 