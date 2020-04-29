import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import apple_image from '../../assets/apple.png';
import facebook_image from '../../assets/facebook.png';
import google_image from '../../assets/google.png';
import logo from '../../assets/icon.png';



export default class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior='padding'
                enabled={Platform.OS === 'ios'}
                style={styles.container}>
                <Image source={logo} />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='E-mail'
                    placeholderTextColor='#999'
                    style={styles.input} />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Password'
                    placeholderTextColor='#999'
                    style={styles.input} />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Logar
                    </Text>
                </TouchableOpacity>

                <View style={styles.container_links}>
                    <Text style={styles.linksText}>
                        Esqueci minha senha
                    </Text>
                    <Text style={styles.linksText}>
                        Registre-se
                    </Text>
                </View>
                <View style={styles.container_links}>
                    <Image style={styles.linksText} source={facebook_image} />
                    <Image style={styles.linksText} source={google_image} />
                    <Image style={styles.linksText} source={apple_image} />



                </View>
                <Text>
                    Ao se inscrever, você concorda com nossos Termos e Condiçôes
                </Text>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30

    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#34549D',
        borderRadius: 20,
        marginTop: 10,
        justifyContent: "center",
        alignItems: 'center',


    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    linksText: {
        color: '#34549D',
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 10,
        alignSelf: 'stretch',

    },
    container_links: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: "space-between",

    },
})