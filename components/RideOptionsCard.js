import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { TouchableOpacity } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Image } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const data = [
    {
      id: "Uber-X-123",
      title: "UberX",
      multiplier: 1,
      image: "https://links.papareact.com/3pn",
    },
    {
      id: "Uber-XL-456",
      title: "Uber XL",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8",
    },
    {
      id: "Uber-LUX-789",
      title: "Uber LUX",
      multiplier: 1.75,
      image: "https://links.papareact.com/7pf",
    }
  ]
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <Text style={tw`text-center py-2 text-xl `}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("NavigateCard")} style={[tw`absolute top-1 left-5 p-2 rounded-full`]}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
         
      </View>

      <FlatList
      style={{
        
      }}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => setSelected(item)} style={tw`flex-row justify-between items-center px-10 ${item.id === selected?.id && "bg-gray-200"}`} >
          <Image
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
            }}
            source={{
              uri: item.image,
            }}
            />
          <View style={tw`-ml-6`}>
            <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
            <Text >{travelTimeInformation?.duration?.text} Travel Time</Text>
          </View>
          <Text style={tw`text-xl`}>{new Intl.NumberFormat('en-gb',{
            style:"currency",
            currency:"GBP",
          }).format((travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * item.multiplier / 100).toFixed(2))}</Text>
        </TouchableOpacity>
      )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} disabled={!selected}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})