import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { setupPlayer, addTrack} from './components/MusicService';
import MusicPlayer from './components/MusicPlayer';
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MusicList from './components/MusicList';

const Tab = createBottomTabNavigator()

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false)

  async function setup() {
    let isSetup = await setupPlayer()
    if (isSetup) {
      await addTrack()
    }
    setIsPlayerReady(isSetup)
  }
  useEffect(() => {
    setup()
  }, [])



  return (
      <NavigationContainer style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Music Player") {
                iconName = "music-note";
              } else if (route.name === "List") {
                iconName = "list";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#ed8796",
            tabBarInactiveTintColor: "#f4dbd6",
            tabBarStyle: {
              backgroundColor: "#181926",
              borderBlockColor: "#91d7e3",
              height: 60,
            },
          })}
        >
          <Tab.Screen name="Music Player" component={MusicPlayer} />
          <Tab.Screen name="List" component={MusicList} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
