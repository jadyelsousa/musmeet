import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import RegisterPhoto from './pages/RegisterPhoto'


export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
        Register,
        RegisterPhoto,
        
    })
);