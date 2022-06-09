import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main(){
    return (
        
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo}  source={logo} />

                <View style={ styles.cardContainer }>

                    <View style={[ styles.card , { zIndex: 3 }]}>
                        <Image  style={ styles.avatar } source={{ uri :'https://th.bing.com/th/id/OIP.Kobk8U-p_PLwy-vYSDM7QQHaDt?pid=ImgDet&rs=1'}} />
                        <View style={ styles.footer }>
                            <Text style={ styles.name }>Cézar Engraçado</Text>
                            <Text style={ styles.bio }>Este é o Cezinha Engraçadinho. Tenha certeza de que ele será boa companhia em momentos ruins de sua vida :D.</Text>
                        </View>
                    </View>
                    
                    {/* <View style={ styles.card }>
                        <Image  style={ styles.avatar } source={{ uri :'https://th.bing.com/th/id/OIP.Kobk8U-p_PLwy-vYSDM7QQHaDt?pid=ImgDet&rs=1'}} />
                        <View>
                            <Text style={ styles.name }>Cézar Graçadinho</Text>
                            <Text style={ styles.bio }> EngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâoEngraçadâo </Text>
                        </View>
                    </View>
                    <View style={ styles.card }>
                        <Image style={ styles.avatar } source={{ uri :'https://th.bing.com/th/id/OIP.Kobk8U-p_PLwy-vYSDM7QQHaDt?pid=ImgDet&rs=1'}} />
                        <View>
                            <Text style={ styles.name }>Cézar Graçadinho</Text>
                            <Text style={ styles.bio }> Engraçadâo </Text>
                        </View>
                    </View> */}
                    
                </View> 
                
                <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>

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
        maxHeight: 380,
        overflow: 'hidden',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
    },
    avatar:{
        flex: 1,
        height: 20,
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