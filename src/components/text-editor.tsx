import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react"; 
import './text-editor.css';
import { Cell } from '../state'; 
import { useActions } from '../hooks/use-actions';

interface TextEditorProps { 
    cell: Cell;
}

const TextEditor : React.FC<TextEditorProps> = ({ cell }: TextEditorProps) => { 

    const [editing, setEditing] = useState(false); 
    const ref = useRef<HTMLDivElement | null>(null);

    const { updateCell } = useActions(); 

   
    // gets and updates state of text editor
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                
                return; 
            } 
            setEditing(false);
        }; 
        document.addEventListener('click', listener, {capture: true}); 

        return () => { 
            document.removeEventListener('click', listener, {capture: true});
        };
    }, []);


    if (editing) { 
        
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor 
                 value={cell.content}
                 onChange={(v) => updateCell(cell.id, v|| '')}
                />
            </div>
        );
    }

    return( 
        <div className="text-editor" onClick={() => setEditing(true)}>

            <div className="card-content">
             <MDEditor.Markdown source={ cell.content || 'Click to edit' } />
            </div>
        </div> 
        );
};

export default TextEditor;