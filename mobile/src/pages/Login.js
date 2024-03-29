import React , { useEffect, useState } from 'react';
import {View,KeyboardAvoidingView, Text , StyleSheet, Image, TextImput, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';
import  AsyncStorage  from '@react-native-community/async-storage';
import { LoginButton, AccessToken, Profile, LoginManager} from 'react-native-fbsdk-next';
// import { LoginManager } from "react-native-fbsdk";
// import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
// import { FacebookSocialButton } from "react-native-social-buttons";


export default function Login({ navigation }){
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user){
        navigation.navigate('Main',{user});
      }
    })
  }, []);
  
  async function handleLogin(){
  
    console.log('butao');
    const currentProfile = await Profile.getCurrentProfile();

    if (currentProfile) {

      const response = await api.post('/login', {
        currentProfile,
      });
      
      if(response.data != null){
        const {_id } = response.data;
        await AsyncStorage.setItem('user', _id);
        navigation.navigate('Main',{user:_id});
      }else{
        navigation.navigate('Register',{user:currentProfile});
      }
    }


  }

  return (
    <KeyboardAvoidingView
    behavior="padding"
    enabled={Platform.OS == 'ios'}
    style={ styles.container }
    >
        <Image  source={logo} />
        
        
      <View style={styles.bottom}>
        <TouchableOpacity onPress= { handleLogin } style={styles.button}>
            <Text style={styles.buttonText}>Entrar com Facebook</Text>
        </TouchableOpacity>
        {/* <LoginButton style={styles.button}
          
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                navigation.navigate('Main');
              }
            }
          }
          /> */}
      </View>
      
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30
  },
  button:{
      height: 50,
      alignSelf: 'stretch',
      backgroundColor:'#2f3030',
      borderRadius: 4,
      marginTop: 10,
      justifyContent:'center',
      alignItems: 'center',
      fontSize: 13  ,
      
  },
  buttonText:{
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 13,
      
  },
  bottom: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25
  }
});

