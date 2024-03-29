import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {MaterialIcons} from '@expo/vector-icons'

const MapScreen = () => {
  const Stack = createStackNavigator();
  return (
    <View>
        <TouchableOpacity style={[tw`absolute top-16 left-8 p-3 rounded-full bg-white`, { elevation: 5 }]}>
  <MaterialIcons name='menu' size={24} />
</TouchableOpacity>

      <View style={tw`h-1/2`}>
        <Map/>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen name="NavigateCard" component={NavigateCard} options={{headerShown:false}} />
          <Stack.Screen name="RideOptionsCard" component={RideOptionsCard} options={{headerShown:false}} />
        </Stack.Navigator>
      </View>
      
    </View>
  )
}

export default MapScreen