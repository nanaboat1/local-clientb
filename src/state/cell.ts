// define the type of code cell used. 

export type CellTypes = 'code' | 'text';


export interface Cell {
    id: string; 
    type: CellTypes;
    content: string; 
}