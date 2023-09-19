import './cell-list-item.css';

import { Cell } from '../state'; 
import Codecell from './code-cell';
import ActionBar from './action-bar';
//import TextEditor from './text-editor';


interface CellListItemProps { 
    cell: Cell;
}

// individual cells dispatched from store to render
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => { 

    let child: JSX.Element | undefined ; 

    // text editor feature removed due sourcemap error caused by bug in react 5.0.1
    // will follow-up when issue is fixed on new react update. 
    if (cell.type === 'code') {
        child = <> 
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id} />
            </div>
            <Codecell cell={cell} /> 
        </>;
    } 
    
    return ( 
        <div className='cell-list-item'> 
            {child}
        </div>
    ); 
};

export default CellListItem; 