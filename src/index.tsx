import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from "react-redux";
import { store } from './state';
import CellList from "./components/cell-list";
import { Buffer } from 'buffer';

// react 18 new api. 
import { createRoot } from 'react-dom/client';
import React from 'react';

const App = () => { 
   
    return ( 
        
        // display cell list
        <Provider store={store}> 
            <CellList /> 
        </Provider>
        
    );


}; 

window.Buffer = window.Buffer || Buffer;

// new react 18 api
const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(<App />);



