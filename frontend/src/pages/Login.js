import React from 'react';
import FacebookLogin from 'react-facebook-login';
import './Login.css';
import api from '../services/api';
import logo from '../assets/logo.svg';

const componentClicked = (response) => {
    console.log('yes');
}

export default function Login({history}) {

    async function responseFacebook(response) {

        const dados = await api.post('/user', {
            response,
        })
        
        if(dados){
            const { _id } = dados.data;s
            history.push(`/main/${_id}`);
        }  
    }
    return (

        <div className="login-container">

            <form>
            <img src={logo} alt='Musmeet'/>
                <FacebookLogin
                    appId="164755398795594"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    textButton={"Login com facebook"}/>

            </form>


        </div>

    );
}