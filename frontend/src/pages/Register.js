import React, { useState, useEffect} from 'react';
import './Register.css';
import api from '../services/api';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.jpg';



export default function Register({ match, history }){
    const [name, setName] = useState(match.params.name);
    const [email, setEmail] = useState(match.params.email);
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [image, setImage] = useState(null);
    const [imageLink, setImageLink] = useState(null);

    
    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData();
        data.append('image',image);
        data.append('name',name);
        data.append('email',email);
        data.append('phone',phone);
        data.append('bio',bio);
        data.append('category', categoryId);

        

        const response = await api.post('/register', data);

        const id = response.data._id;
    
            if(id){
            history.push(`/main/${id}`);
        }   
        
        console.log(response);


    }

    useEffect(() => {
        async function loadCategories(){
            const response = await api.get('/category');
            setCategories(response.data);
          
        }
        loadCategories();
    }, []);
    

    function handleCategories( e ){
        const checked = e.target.checked;
        let categoriesArray = [];

        if(checked){
            categoriesArray = [...categoryId];
            categoriesArray.push(e.target.value)
            setCategoryId(categoriesArray)
        }else{
            categoriesArray = [...categoryId];
            let index = categoriesArray.indexOf(e.target.value)
            categoriesArray.splice(index, 1)
            setCategoryId(categoriesArray)
        }
    }

    function handleImage(e){
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setImageLink(imageUrl);
        }  

    }

/*    useEffect(() => {
        function loadCategory(){
            console.log(categoryId);
          
        }
        loadCategory();
    }, [categoryId]);
 */
    return (
        <div className="register-container">
            <div className="image-logo">    
            <img src={logo} alt="logo" />
            <form className="form-register" onSubmit={handleSubmit}>
            { imageLink != null ? (
                    <img src={imageLink} alt="Minha foto"  />
             
                ) : (
                    <img src={avatar} alt="Logo" />
                )}
                <input type="file" name="imagem" accept="image/*" onChange={ handleImage } />   
                <input type="text" onChange={e => setName(e.target.value)} value={name} />
                <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type="tel" name="phone" onChange={e => setPhone(e.target.value)} value={phone} placeholder="Telefone" />
                <textarea name="bio" onChange={e => setBio(e.target.value)}  value={bio} placeholder="Bio" cols="30" rows="10" />
                { categories.length > 0 ? (
                    <label> Categorias  <br/><br/>
                     { categories.map(category => (
                        <label key={category._id} >{category.name} 
                            <input type="checkbox" name={category.name} onChange={handleCategories} value={category._id}  id="category" /> 
                        </label> 
                    ))}
                    </label>
                   ) : '' }
                
                <button type="submit" >Cadastrar</button>
            </form>
            </div>

        </div>
    )
}
