import React from 'react';
import './App.css';
import {Pages} from './routes/pages';
import {BrowserRouter} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                {/*<Layout>*/}
                    <Pages/>
                {/*</Layout>*/}
            </BrowserRouter>
        </div>
    );
}

export default App;
