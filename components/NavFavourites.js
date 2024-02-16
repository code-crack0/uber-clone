import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK",
  },
  {
    id: "456",
    icon: "laptop",
    location: "Work",
    destination: "London Eye, London, UK",
  },
];
const NavFavourites = () => {
  return (
    <FlatList data={data} keyExtractor={(item) => item.id} ItemSeparatorComponent = {()=> <View style={[tw`bg-gray-200`,{height:0.5}]}></View>
    }renderItem={({item:{destination,location,icon}})=> (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <AntDesign
                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                name={icon}
                color="white"
                size={18}
            />
            <View>
                <Text style={tw`font-semibold text-lg`}>{location}</Text>
                <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
        </TouchableOpacity>
  )}/>
  )
}

export default NavFavourites

const styles = StyleSheet.create({})