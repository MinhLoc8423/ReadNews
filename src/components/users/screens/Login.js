import { View, Text, StyleSheet, TextInput, Pressable, Image, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import CheckBox from '@react-native-community/checkbox'
import Svg, { Path } from 'react-native-svg'
import { UserContext } from '../UserContext'

const Login = (props) => {
    const { navigation } = props
    const [isShowPass, setIsShowPass] = useState(false)
    const [email, setEmail] = useState('heroup@gmail.com')
    const [password, setPassword] = useState('1')
    const { onLogin } = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const onLoginPress = async () => {
        setLoading(true)
        const result = await onLogin(email, password)
        if (!result) {
            Alert.alert('Login failed!')
        }
        setLoading(false)
    }

    return (
        <View style={style.body}>
            <Text style={style.hello}>Hello</Text>
            <Text style={style.again}>Again!</Text>
            <Text style={style.welcom}>
                Welcome back you’ve been missed
            </Text>
            <View style={style.userName}>
                <Text style={style.text}>Username<Text style={{ color: '#C30052' }}>*</Text></Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    style={style.input} />
            </View>
            <View style={style.userPass}>
                <Text style={style.text}>Password<Text style={{ color: '#C30052' }}>*</Text></Text>
                <View style={style.inputContainer}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={style.input}
                        secureTextEntry={!isShowPass} />
                    <Svg onPress={() => setIsShowPass(!isShowPass)} style={style.eyeIconClose} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {
                            isShowPass ? <Path d="M11.9999 3C17.3919 3 21.8779 6.88 22.8189 12C21.8789 17.12 17.3919 21 11.9999 21C6.60791 21 2.12191 17.12 1.18091 12C2.12091 6.88 6.60791 3 11.9999 3ZM11.9999 19C14.0394 18.9996 16.0183 18.3068 17.6128 17.0352C19.2072 15.7635 20.3228 13.9883 20.7769 12C20.3211 10.0133 19.2048 8.24 17.6105 6.97003C16.0162 5.70005 14.0382 5.00853 11.9999 5.00853C9.9616 5.00853 7.9836 5.70005 6.38928 6.97003C4.79497 8.24 3.67868 10.0133 3.22291 12C3.677 13.9883 4.79258 15.7635 6.38705 17.0352C7.98152 18.3068 9.96044 18.9996 11.9999 19V19ZM11.9999 16.5C10.8064 16.5 9.66184 16.0259 8.81793 15.182C7.97401 14.3381 7.49991 13.1935 7.49991 12C7.49991 10.8065 7.97401 9.66193 8.81793 8.81802C9.66184 7.97411 10.8064 7.5 11.9999 7.5C13.1934 7.5 14.338 7.97411 15.1819 8.81802C16.0258 9.66193 16.4999 10.8065 16.4999 12C16.4999 13.1935 16.0258 14.3381 15.1819 15.182C14.338 16.0259 13.1934 16.5 11.9999 16.5ZM11.9999 14.5C12.6629 14.5 13.2988 14.2366 13.7677 13.7678C14.2365 13.2989 14.4999 12.663 14.4999 12C14.4999 11.337 14.2365 10.7011 13.7677 10.2322C13.2988 9.76339 12.6629 9.5 11.9999 9.5C11.3369 9.5 10.701 9.76339 10.2321 10.2322C9.7633 10.7011 9.49991 11.337 9.49991 12C9.49991 12.663 9.7633 13.2989 10.2321 13.7678C10.701 14.2366 11.3369 14.5 11.9999 14.5Z" fill="#4E4B66" /> : <Path d="M16.8819 18.297C15.1231 19.4126 13.0826 20.0033 10.9999 20C5.60791 20 1.12191 16.12 0.180908 11C0.610938 8.67072 1.78254 6.54289 3.52091 4.934L0.391908 1.808L1.80691 0.392998L21.6059 20.193L20.1909 21.607L16.8809 18.297H16.8819ZM4.93491 6.35C3.57591 7.58559 2.62923 9.20878 2.22291 11C2.5352 12.3665 3.16217 13.6411 4.05391 14.7226C4.94565 15.804 6.07753 16.6624 7.35946 17.2293C8.64139 17.7962 10.038 18.0561 11.438 17.9881C12.838 17.9202 14.2029 17.5264 15.4239 16.838L13.3959 14.81C12.5326 15.3538 11.5101 15.5881 10.4961 15.4744C9.48218 15.3608 8.53695 14.9059 7.81548 14.1844C7.09401 13.463 6.63914 12.5177 6.52547 11.5038C6.4118 10.4898 6.64609 9.46731 7.18991 8.604L4.93491 6.35ZM11.9139 13.328L8.67191 10.086C8.49397 10.5389 8.4521 11.034 8.55141 11.5103C8.65073 11.9867 8.88693 12.4238 9.23103 12.7679C9.57513 13.112 10.0122 13.3482 10.4886 13.4475C10.965 13.5468 11.46 13.5049 11.9129 13.327L11.9139 13.328ZM19.8069 15.592L18.3759 14.162C19.0444 13.2093 19.5203 12.1352 19.7769 11C19.5051 9.80972 18.9942 8.68714 18.2751 7.70049C17.5559 6.71384 16.6437 5.88372 15.5938 5.2606C14.5439 4.63748 13.3782 4.23436 12.1676 4.07576C10.9571 3.91716 9.72691 4.00638 8.55191 4.338L6.97391 2.76C8.22091 2.27 9.57991 2 10.9999 2C16.3919 2 20.8779 5.88 21.8189 11C21.5125 12.6657 20.8238 14.2376 19.8069 15.592ZM10.7229 6.508C11.3594 6.46866 11.997 6.56506 12.5935 6.79081C13.1899 7.01657 13.7315 7.36651 14.1825 7.81745C14.6334 8.26839 14.9833 8.81002 15.2091 9.40646C15.4348 10.0029 15.5312 10.6405 15.4919 11.277L10.7219 6.508H10.7229Z" fill="#4E4B66" />
                        }
                    </Svg>
                </View>
            </View>
            <View style={style.view1}>
                <View style={style.view2}>
                    <CheckBox
                        value={true}
                        tintColors={{ true: '#1877F2', false: '' }}
                    />
                    <Text style={style.text}>Remember me</Text>
                </View>
                <Text style={style.text2}>Forgot the password ?</Text>
            </View>
            <Pressable style={style.btn} onPress={onLoginPress}>
                <Text style={style.btnLabel}> {loading ? 'Loading...' : 'Login'} </Text>
            </Pressable>
            <Text style={[style.text, { textAlign: 'center' }]}>or continue with</Text>
            <View style={style.view1}>
                <Pressable style={style.btnSocal}>
                    <Image source={require('../../../assets/images/IconFB.png')} />
                    <Text>Facebook</Text>
                </Pressable>
                <Pressable style={style.btnSocal}>
                    <Image source={require('../../../assets/images/IconGG.png')} />
                    <Text>Google</Text>
                </Pressable>
            </View>
            <Text style={[style.text, { textAlign: 'center' }]}>don’t have an account ?
                <Text
                    onPress={() => navigation.navigate('Signup')}
                    style={[{ color: '#1877F2' }]} > Sign Up</Text>
            </Text>
        </View >
    )
}

export default Login

const style = StyleSheet.create({
    btnSocal: {
        marginBottom: 16,
        width: '45%',
        height: 48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12,
        paddingRight: 24,
        paddingBottom: 12,
        paddingLeft: 16,
        gap: 10,
        backgroundColor: '#EEF1F4',
        borderRadius: 6,
    },
    btnLabel: {
        fontFamily: "Poppins-Medium",
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#FFFFFF',
    },
    btn: {
        marginTop: 16,
        marginBottom: 16,
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#1877F2',
        borderRadius: 6,
    },
    text2: {
        fontFamily: "Poppins-Regular",
        fontStyle: 'normal',
        fontWeight: "bold",
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#5890FF',
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66',
    },
    view2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        marginLeft: -4,
        gap: 4,
    },
    view1: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    eyeIconClose: {
        position: 'absolute',
        right: 10,
        top: 17,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        width: '100%',
        height: 48,
        padding: 10,
        marginTop: 4,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#4E4B66',
    },
    userPass: {
        marginTop: 16,
    },
    userName: {
        marginTop: 48,
    },
    welcom: {
        width: 222,
        marginTop: 4,
        fontFamily: "Poppins-Regular",
        fontStyle: 'normal',
        fontSize: 20,
        lineHeight: 30,
        letterSpacing: 0.12,
        color: '#4E4B66',
    },
    hello: {
        fontFamily: "Poppins-Bold",
        fontStyle: 'normal',
        fontSize: 48,
        lineHeight: 72,
        color: '#050505',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        letterSpacing: 0.12,
    },
    again: {
        fontFamily: "Poppins-Bold",
        fontStyle: 'normal',
        fontSize: 48,
        lineHeight: 72,
        color: '#1877F2',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        letterSpacing: 0.12,
    },
    body: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF'
    }
})