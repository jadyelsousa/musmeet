import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import logo from '../assets/logo.svg';
import itsameet from '../assets/itsameet.png';
import api from '../services/api';

export default function Main ({ match, history }){

    const [users, setUsers] = useState([]);
    const [meet, setMeet] = useState(null);

    async function handleSubmit(){

        const dados =  match.params.id;
    
            if(dados){
            history.push(`/explore/${dados}`);
        } 
    }

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/user', {
                headers: {
                    user : match.params.id
                }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    useEffect(() => {
        const socket = io('http://localhost:3333',{
            query : { user: match.params.id}
        }); 

        socket.on('match', user => {
            setMeet(user);  
        })

        
    }, [match.params.id]);

    async function handleLike(id){
        await api.post(`user/${id}/likes`, null, {
            headers: {user: match.params.id}
            
        })
        setUsers(users.filter(user => user._id !== id));
    }  

    async function handleDislike(id){
        await api.post(`user/${id}/dislikes`, null, {
            headers: {user: match.params.id}
        })
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleFilter(e){

        const category = e.target.name;
        const user = match.params.id;
        const userFilter = await api.post(`user/${user}/filter` , {
            category
        })

        setUsers(userFilter.data);
        
    }  

    
    return(
        <div className="main-container">
            <form className="explore-button">
            <button className="btn btn-info" onClick={handleSubmit}>Explorer</button>
                    </form>  
            <div className="image-logo">    
            <Link to="/">
            <img src={logo} alt="logo" />
            </Link>
            </div>
            { users.length > 0 ? (
                         <ul>
                         {users.map(user => (
                              <li key={user._id}>
                              <img src={`http://localhost:3333/files/${user.image}`} alt="user" />
                              <footer>
                                  <strong>{user.name}</strong>
                                  <p>{user.bio}</p>
                                  <p>{user.email}</p>
                                  <p>{user.category.map(category =>( 
                                      <button type="button" className="category-button" onClick={ handleFilter } key={category._id} name={category._id}>{category.name}</button>
                                  ))}</p>
                            
                              </footer>
                              
                              <div className="buttons">
                                  <button type="button" onClick={() => handleDislike(user._id)} >
                                      <img src={dislike} alt={dislike} />
                                  </button>
                                  <button type="button" onClick={() => handleLike(user._id)} >
                                      <img src={like} alt={like} />
                                  </button>
                              </div>
                          </li>
                         ))}
                         
                     </ul>
            ):(
                <div className="empty">
                    Você viu tudo! :(
                </div>
            )} 
            { meet && (
                <div className="match-container">
                    <img src={itsameet} alt="Foi um meet" />
                    <img className="avatar" src={meet.picture} alt="" />   
                    <strong>{meet.name}</strong>       
                    <p>{meet.email}</p>       
                    <button type="button" onClick={() => setMeet(null)} >Voltar</button> 
                    <div class="buttonWts">
                    <a href={`https://api.whatsapp.com/send?phone=55${meet.phone}&text=olá%20${meet.name}%20tudo%20bem?`} class="btn btn-success">WhatsApp</a>
                    </div>                
                </div>
            ) }
        </div>
    )
}
