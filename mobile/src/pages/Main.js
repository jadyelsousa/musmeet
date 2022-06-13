import React , { useEffect, useState } from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
import api from '../services/api';
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main({ navigation }){
    const [users, setUsers] = useState([]);
    const id = navigation.getParam('user');
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/user', {
                headers: {
                    user : id
                }
            })
            console.log(response.data);
            setUsers(response.data);
        }
        loadUsers();
    }, [id]);

    async function handleLike(){
        const [user, ...rest] = users;
        await api.post(`user/${id}/likes`, null, {
            headers: {user: user._id}
            
        })
        setUsers(rest);
    }  

    async function handleDislike(){
        const [user, ...rest] = users;
        await api.post(`user/${id}/dislikes`, null, {
            headers: {user: user._id}
        })
        setUsers(rest);
    }

    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }
    return (
        
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo}  source={logo} />
                </TouchableOpacity>

                <View style={ styles.cardContainer }>
                {users.length == 0 
                ? <Text style={styles.empty}>Acabou :(</Text> 
                : (users.map((user, index) => {
                    <View  style={[ styles.card , { zIndex: users.length  }]}> 
                        <Image  style={ styles.avatar } source={{ uri :'https://th.bing.com/th/id/OIP.Kobk8U-p_PLwy-vYSDM7QQHaDt?pid=ImgDet&rs=1'}} />
                        <View style={ styles.footer }>
                            <Text style={ styles.name }>sergsergses wawdawdawdad</Text>
                            <Text style={ styles.bio } numberOfLines={3}>adqweqeadawdaqwdawda</Text>
                        </View>
                    </View>
                 }))}      
                 
                </View> 

                
                
                { users.length > 0 && 
                <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleDislike} style={styles.button}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLike} style={styles.button}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View> }

                { users.length == 0 && <View style={styles.buttonsContainer}>
                </View> }

            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    logo: {
        marginTop: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        height: 380,
        width: 350,
        overflow: 'hidden',
        position: 'absolute',
        top: -200,
        left: -205,
        right: 0,
        bottom: 0,
    },
    avatar:{
        flex: 1,
        height: 20,
    },

    empty:{
        alignSelf:'center',
        color:'#999',
        fontSize:24, 
        fontWeight:'bold',  
    },

    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
        
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    
    
  });
