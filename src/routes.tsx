import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" />
            {/* route pro sobre */}
        </BrowserRouter>

    )
};

export default Routes;