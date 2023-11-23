import React from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../news/screens/Home';
import Add from '../news/screens/Add';
import Search from '../news/screens/Search';
import Profile from '../news/screens/Profile';
import Detail from './screens/Detail';
import EditProfile from './screens/EditProfile';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
        </Stack.Navigator>
    )
}

const NewsNavigation = () => {
    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'HomeStack') {
                if (!focused) {
                    return <Image source={require('../../assets/images/icon_home.png')} />
                } else {
                    return <Image source={require('../../assets/images/icon_home_selected.png')} />
                }
            } else if (route.name === 'Search') {
                if (!focused) {
                    return <Image source={require('../../assets/images/icon_explore.png')} />
                } else {
                    return <Image source={require('../../assets/images/icon_explore_selected.png')} />
                }
            } else if (route.name === 'Add') {
                if (!focused) {
                    return <Image source={require('../../assets/images/icon_bookmark.png')} />
                } else {
                    return <Image source={require('../../assets/images/icon_bookmark_selected.png')} />
                }
            } else if (route.name === 'ProfileStack') {
                if (!focused) {
                    return <Image source={require('../../assets/images/icon_profile.png')} />
                } else {
                    return <Image source={require('../../assets/images/icon_profile_selected.png')} />
                }
            }
        },
        tabBarLabel: ({ focused, color, size }) => {
            if (route.name == 'HomeStack') {
                return focused ? <Text style={styles.textLabelSeleted}>Home</Text> : <Text style={styles.textLabel}>Home</Text>
            } else if (route.name == 'Search') {
                return focused ? <Text style={styles.textLabelSeleted}>Search</Text> : <Text style={styles.textLabel}>Search</Text>
            }
            if (route.name == 'Add') {
                return focused ? <Text style={styles.textLabelSeleted}>Add</Text> : <Text style={styles.textLabel}>Add</Text>
            } else if (route.name == 'ProfileStack') {
                return focused ? <Text style={styles.textLabelSeleted}>Profile</Text> : <Text style={styles.textLabel}>Profile</Text>
            }
        },
        tabBarStyle: styles.icon,
        headerShown: false,
    })
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='HomeStack' component={HomeStack} />
            <Tab.Screen name='Search' component={Search} />
            <Tab.Screen name='Add' component={Add} />
            <Tab.Screen name='ProfileStack' component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default NewsNavigation

const styles = StyleSheet.create({
    icon:{
        with: 70, 
        height: 70, 
        paddingBottom: 4, 
        paddingTop: 4, 
        paddingLeft: 8, 
        paddingright: 8, 
        gap: 4
    },
    textLabelSeleted: {
        fontFamily: 'Poppins-Regular', 
        fontStyle: 'normal', 
        fontSize: 14, 
        lineHeight: 14, 
        color: '#1877F2'
    },
    textLabel: {
        fontFamily: 'Poppins-Regular', 
        fontStyle: 'normal', 
        fontSize: 14, 
        lineHeight: 14
    }
})