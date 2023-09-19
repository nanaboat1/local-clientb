import { Dispatch } from "react";
import axios from "axios";
import { ActionType } from "../action-types";
import { UpdateCellAction, DeleteCellAction, InsertCellAfterAction, MoveCellAction, Direction, Action} from "../actions";
import { Cell, CellTypes } from "../cell"; 
import bundle from "../../bundler";
import { RootState } from "../reducers"; 


// update
export const updateCell = (
    id: string, 
    content: string, 
)
: UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL, 
        payload: {
            id,
            content, 
        },
    };
};

// delete
export const deleteCell = (

    id: string
): 
    DeleteCellAction => { 
        
        return {
            type: ActionType.DELETE_CELL,
            payload: id,
        };

    };

// movecell
export const moveCell = (
    id: string,
    direction: Direction,

): MoveCellAction  => {

    return {
        type: ActionType.MOVE_CELL, 
        payload: {
            id,
            direction,
        }
    };

};

// insert cell before
export const insertCellAfter  = (
    id: string | null, 
    cellType: CellTypes 
    ): InsertCellAfterAction  => {

        return {
            type: ActionType.INSERT_CELL_AFTER,
            payload: {
                id,
                type: cellType,
            }
        };
    }; 

export const createBundle = (cellId: string, input: string) => { 

    return async (dispatch: Dispatch<Action>) => { 
        dispatch({ 
            type: ActionType.BUNDLE_START, 
            payload: {
                cellId, 

            }
        }); 

        const result = await bundle(input); // output from bundling process. 


        dispatch({
            type: ActionType.BUNDLE_COMPLETE, 
            payload: {
                cellId, 
                bundle: result,
            }
        });
    }
}; 

// fetch cells data from storage. 
export const fetchCells = () => { 

    return async ( dispatch: Dispatch<Action>) => { 
        dispatch({type: ActionType.FETCH_CELLS });

        try {
            const { data }: { data: Cell[]; } = await axios.get('/cells'); 

            dispatch({ 
                type: ActionType.FETCH_CELLS_COMPLETE,
                payload: data 
            }); 
        } catch( err: any) {  

            if ( err instanceof Error) { 
                dispatch({ 
                    type: ActionType.FETCH_CELLS_ERROR, 
                    payload: err.message,
                }); 
            }

        }
    }; 
}; 

export const saveCells = () => { 
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {

        const { cells: { data, order }} = getState(); 

        const cells  = order.map(id => data[id]); 

        try {
            await axios.post('/cells', { cells }); 
        } catch (err: any) {

            if ( err instanceof Error ) { 
                dispatch({
                    type: ActionType.SAVE_CELLS_ERROR, 
                    payload: err.message,
                });
            } 
        }
    }
}; 