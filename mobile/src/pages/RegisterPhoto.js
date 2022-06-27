import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Button, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import api from '../services/api';
import logo from '../assets/logo.png';


export default function RegisterPhoto({ navigation }) {
    const [user, setUser] = useState(navigation.getParam('user'));
    const [photo, setPhoto] = useState(null);
    useEffect(() => {
        console.log(user);  
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData();
        data.append('image', {
            name: photo.fileName,
            type: photo.type,
            uri: photo.uri,
        });
        data.append('name', user.name);
        data.append('email', user.email);
        data.append('phone', user.phone);
        data.append('bio', user.bio);
        let ids = [];
       
        user.category.categories.map(categoryId => {
            if(categoryId.checked == true) {
                ids.push(categoryId.id);
            }
        })

        data.append('category', JSON.stringify(ids));
        console.log(data)
        
        api.post('/register', data, {
                headers: {
                      "Content-Type": "multipart/form-data",
                    }
        }).then(async function (response) {
            console.log(response)
            if(response.data != null){
                const {_id } = response.data;
                await AsyncStorage.setItem('user', _id);
                navigation.navigate('Main',{user:_id});
              }   
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true, includeBase64: true }, (response) => {
          if (response.assets) {
            setPhoto(response.assets[0]);
          }
        });
      };

    const handleLauchCamera = () => {
        launchCamera({ noData: true, includeBase64: true }, (response) => {
          if (response.assets) {
            setPhoto(response.assets[0]);
          }
        });
      };

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }
    return (

        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS == 'ios'}
            style={styles.container}
        >
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardContainer}>
                <Text style={styles.textInfo}>
                   Quase lá...
                </Text>
                <Text style={styles.textBig}>
                    Selecione a sua melhor foto
                </Text>
                <View style={{  alignItems: 'center' }}>
                {photo ? (
                    <>
                    <Image
                        source={{ uri: 'data:image/jpeg;base64,' + photo.base64 }}
                        style={{ width: 300, height: 300, marginBottom:12}}
                    />
                    </>
                ) : 
                    <>
                    <Image
                        source={{ uri: 'https://www.passeios.net/wp-content/uploads/2022/02/profile-perfil.jpg' }}
                        style={{ width: 300, height: 300, marginBottom:12}}
                    />
                    </>
                } 
                    <View style={{ marginBottom: 10, width: 200, height: 40}} >
                        <Button title="Selecionar Foto" onPress={handleChoosePhoto} />
                    </View>
                    <View style={{ width: 200, height: 40}}>   
                        <Button title="Abrir Camera" onPress={handleLauchCamera} />
                    </View>
                </View>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity disabled={ !photo && true } onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Pronto</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    logo: {
        marginTop: 30,
    },
    container: {
        flex: 1,
        backgroundColor: 'f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
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
    avatar: {
        flex: 1,
        height: 20,
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 5,
        paddingHorizontal: 90,
        marginBottom: 16,

    },

    textArea: {
        height: 80,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 5,
        paddingHorizontal: 90,
        marginBottom: 16,

    },

    textBig: {
        alignSelf: 'baseline',
        color: '#999',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    textInfo: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
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

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 13,

    },
    button: {
        height: 50,
        alignSelf: 'stretch',
        backgroundColor: '#2f3030',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    bottom: {
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 25
    },

});
