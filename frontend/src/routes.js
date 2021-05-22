import React from 'react';
import { BrowserRouter , Route} from 'react-router-dom';


import Login from './pages/Login';
import Main from './pages/Main';
import Explore from './pages/Explore';
import Register from './pages/Register';

export default function Routes(){
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/main/:id' component={Main} />
            <Route path='/register/:name/:email' component={Register} />
            <Route path="/explore/:id" component={Explore} />
        </BrowserRouter>

    )
}


