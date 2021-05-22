import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import './Explore.css';
import logo from '../assets/logo.svg';
import api from '../services/api';

export default function Main ({ match }){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/userMeet', {
                headers: {
                    user : match.params.id
                }
            })
           setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    return(
        <div className="main-container">            
            <div className="image-logo">    
            <Link to="/">
            <img src={logo} alt="logo" />
            </Link>
            </div>
            { users.length > 0 ? (
                         <ul>
                         {users.map(user => (
                              <li key={user._id}>
                              <img src={user.picture} alt="user" />
                              <footer>
                                  <strong>{user.name}</strong>
                                  <p>{user.email}</p>
                              </footer>
                          </li>
                         ))}
                         
                     </ul>
            ):(
                <div className="empty">
                    Isto e Tudo ! :D
                </div>
            )} 
        </div>
    )
}