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
        let dados = false;
        if(response.status !== "unknown"){
            dados = await api.post('/login', {
            response,
        })
        }   
        if(dados){
            if(dados.data != null){
                const { _id } = dados.data;
                history.push(`/main/${_id}`);
            }
            else{
                const {name, email} = response;
                history.push(`/register/${name}/${email}`);
        } 
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