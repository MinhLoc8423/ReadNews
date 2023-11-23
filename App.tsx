import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { NewsProvider } from './src/components/news/NewsContext'
import { UserProvider } from './src/components/users/UserContext'
import AppNavigation from './src/components/navigation/AppNavigation'
import Home from './src/components/news/screens/Home'

function App(): JSX.Element {
  return (
    <UserProvider>
      <NewsProvider>
        <AppNavigation />
      </NewsProvider>
    </UserProvider>
  );
}

export default App;
