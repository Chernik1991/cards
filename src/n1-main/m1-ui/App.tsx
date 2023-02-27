import React from 'react';
import './App.css';
import {Pages} from './routes/pages';
import {BrowserRouter, HashRouter} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            {/*<BrowserRouter>*/}
                <HashRouter>
                {/*<Layout>*/}
                    <Pages/>
                {/*</Layout>*/}
            </HashRouter>
            {/*</BrowserRouter>*/}
        </div>
    );
}

export default App;
