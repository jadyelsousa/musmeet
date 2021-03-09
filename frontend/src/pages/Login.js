import React from 'react';
import FacebookLogin from 'react-facebook-login';
import './Login.css';
import api from '../services/api';

async function responseFacebook(response) {

    const dados = await api.post('/user', {
        response,
    });

    console.log(dados);

}

const componentClicked = (response) => {
    console.log('yes');
}

export default function Login() {
    return (

        <div className="login-container">

            <form>
                <FacebookLogin
                    appId="164755398795594"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook} />

            </form>


        </div>

    );
}