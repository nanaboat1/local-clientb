import MonacoEditor, { Monaco } from '@monaco-editor/react'; 
import { useRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';


interface CodeEditorProps { 
    initialValue: string;
    onChange(value: string): void; 
}


const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}: CodeEditorProps) => { // Type Annotation
    
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();// New API for Monaco


    const onEditorDidMount = ( 
        editor: monaco.editor.IStandaloneCodeEditor,
        _monaco: Monaco
    ) => { 
        editorRef.current = editor; 
        editor.onDidChangeModelContent(()=> onChange(editor.getValue()));
        editor.getModel()?.updateOptions({tabSize: 2}); 
    }; 

    
    const onFormatClick= () => { 
        
        if(editorRef.current) {
            const unformatted = editorRef.current.getValue(); 

            const formatting = prettier.format(unformatted, {
                parser: 'babel',
                plugins: [parser], 
                useTabs: false, 
                semi: true, 
                singleQuote: true, 

            }).replace(/\n$/, ''); 

            //set the formatted valued back to the editor. 
            editorRef.current?.setValue(formatting); 
        }

    };

    return (
    <div className="editor-wrapper">
        <button className="button button-format isprimary is-small"
         onClick={onFormatClick}>Format</button>
    <MonacoEditor
    onMount={onEditorDidMount}
    value= {initialValue}
    theme="vs-dark" 
    language="javascript"  
    height="100%"
    options={{
        wordWrap: 'on', 
        minimap : { enabled: false },
        showUnused : false, // for making sure unused import statements are still used. 
        folding: false, 
        lineNumbersMinChars: 3,
        fontSize: 16, 
        scrollBeyondLastLine: false,
        automaticLayout: true, 
    }}
    /></div>);
}; 

export default CodeEditor; 