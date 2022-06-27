import React , { useEffect, useState } from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
import io from 'socket.io-client';
import api from '../services/api';
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsameet from '../assets/itsameet1.png';
import { Linking, ToastAndroid } from 'react-native'


export default function Main({ navigation }){

    async function openUrl(url){
        if(await Linking.canOpenURL(url)) {
        //   ToastAndroid.show('Tá enviando' + url, ToastAndroid.SHORT)
          await Linking.openURL(url)
        }
        else {
            ToastAndroid.show('Can\'t open this URL', ToastAndroid.SHORT)
        }
    }

    const [users, setUsers] = useState([]);
    const id = navigation.getParam('user');
    const [meet, setMeet] = useState(null);
    
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

    useEffect(() => {
        const socket = io('http://localhost:3333',{
            query : { user: id}
        }); 

        socket.on('match', user => {
            setMeet(user);  
        })

        
    }, [id]);

    async function handleLike(){
        const [user, ...rest] = users;
        await api.post(`user/${user._id}/likes`, null, {
            headers: {user: id }
            
        })
        setUsers(rest);
    }  

    async function handleDislike(){
        const [user, ...rest] = users;
        await api.post(`user/${user._id}/dislikes`, null, {
            headers: {user: id}
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
              
                { users.length == 0 && 
                <Text style={styles.empty}>Acabou :(</Text>  }

                { users.map((user, index) => 
                
                    <View  key={user._id} style={[ styles.card , { zIndex: users.length - index  }]}> 
                        <Image  style={ styles.avatar } source={{ uri :`http://localhost:3333/files/${user.image}`}} />
                        <Button  title={user.category[0].name}/>
                        <View style={ styles.footer }>
                            <Text style={ styles.name }>{user.name}</Text>
                            <Text style={ styles.bio } numberOfLines={3}>{user.bio}</Text>
                            <Text style={ styles.bio } >{user.email}</Text>
                      
                                
                          
                        </View>
                    </View>
                 )}
                 
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

                {
                    meet && (
                        <View style={styles.matchContainer}>
                            <Image source={itsameet} />
                            <Image  style={ styles.meetAvatar } source={{ uri : meet.picture}} />

                            <Text style={styles.meetName}>{meet.name}</Text>
                            <Text style={styles.meetBio}>{meet.email}</Text>

                            <TouchableOpacity onPress={() => setMeet(null)}>
                            <Text style={styles.closeMeet}>FECHAR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={ () => openUrl('https://api.whatsapp.com/send?phone=5561984451185&text=Olá%20Datolo%20Juvelino%20Tudo%20Bem?') }>
                            <Text style={styles.wtsMeet}>WHATSAPP</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }

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
        left: -200,
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
    
    matchContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor : 'rgba(0, 0, 0, 0.8)',
        justifyContent:'center',
        alignItems:'center'
    },

    meetAvatar: {
        width: 160,
        height:160,
        borderRadius:80,
        borderWidth:5,
        borderColor:'#FFF',
        marginVertical:30,
    },
    meetName: {
        fontSize: 26,
        fontWeight:'bold',
        color:'#FFF',
    },
    meetBio:{
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        lineHeight: 24,
        textAlign:'center',
        paddingHorizontal: 30
    },
    closeMeet:{
        fontSize:16,
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 30,
        fontWeight: 'bold'
    },
    wtsMeet:{
        fontSize:16,
        color: 'green',
        marginTop: 30,
        fontWeight: 'bold'
    },
  });