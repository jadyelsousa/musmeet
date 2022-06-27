import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Button, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import api from '../services/api';
import logo from '../assets/logo.png';


export default function Register({ navigation }) {
    const [user, setUser] = useState(navigation.getParam('user'));
    const [categories, setCategories] = useState([
        {
            id: "60a0219a76e1bb25c4bf67b6",
            name: "Baterista",
            checked: false
        },
        {
            id: "60a021aa76e1bb25c4bf67b7",
            name: "Guitarrista",
            checked: false
        },
        {
            id: "60a021d276e1bb25c4bf67ba",
            name: "Violonista",
            checked: false
        },
        {
            id: "60a022f0e001192148c658c8",
            name: "Cantor(a)",
            checked: false
        },
        {
            id: "60a021c776e1bb25c4bf67b9",
            name: "Baixista",
            checked: false
        },
        {
            id: "60a021b676e1bb25c4bf67b8",
            name: "Tecladista",
            checked: false
        },
        {
            id: "60a021e576e1bb25c4bf67bb",
            name: "Saxofonista",
            checked: false
        },
        

    ]);

    // const FormSchema = Yup.object().shape({
    //     name: Yup.string().required('Preencha o campo Nome'),
    //     email: Yup.string().email('O email é inválido').required('Preencha o campo Nome'),
    //     phone: Yup.number('O campo telefone deve ser numérico').required('Preencha o campo Telefone').integer().min(10, 'Telefone inválido').max(11, 'Telefone inválido'),
    //     bio: Yup.string().required('Preencha o campo Biografia'),

    //   });

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        // validationSchema: FormSchema,
        initialValues: { name: user.name, email: '', phone: '', bio: '' },
        onSubmit: (values) => {
            const userArray = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                bio: values.bio,
                name: values.name,
                name: values.name,
                category: {
                    categories
                }
            }

            navigation.navigate('RegisterPhoto',{user: userArray});
        }
    });

    function handleCategories(id) {
        let temp = categories.map((category) => {
            if (id.id === category.id) {
                return { ...category, checked: !category.checked };
            }
            return category;
        });
        setCategories(temp);
    }

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
                    Conclua seu cadastro.
                </Text>
                <Text style={styles.textBig}>
                    Dados pessoais
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nome Completo'
                    autoCapitalize='none'
                    value={values.name}
                    onChangeText={handleChange('name')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Digite seu Email'
                    autoCapitalize='none'
                    autoCompleteType='email'
                    onChangeText={handleChange('email')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='(99)99999-9999'
                    autoCapitalize='none'
                    keyboardType="numeric"
                    onChangeText={handleChange('phone')}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder='Biografia'
                    numberOfLines={4}
                    multiline={true}
                    autoCapitalize='none'
                    onChangeText={handleChange('bio')}
                />

                {categories.length > 0 ? (
                    <>
                        <Text style={styles.textBig}>
                            Categorias
                        </Text>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}  >
                            {categories.map(category => (
                                <View key={category.id} style={{ padding: 5}}>
                                    <CheckBox
                                        disabled={false}
                                        value={category.checked}
                                        onChange={() =>
                                            handleCategories({
                                                id: category.id,
                                            })}
                                    />
                                    <Text>
                                        {category.name}
                                    </Text>
                                </View>
                            ))}

                        </View>
                    </>
                ) : <Text>''</Text>}
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Seguinte</Text>
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
        borderRadius: 4,
        borderColor: '#ddd',
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
