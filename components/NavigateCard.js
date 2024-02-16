import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAP_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import {MaterialIcons,AntDesign} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Samad</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
          placeholder='Where to?'
          styles={toInputBoxStyles}
          fetchDetails={true}
          enablePoweredByContainer={false}
          nearbyPlacesAPI='GooglePlacesSearch'
          query={{
            key: GOOGLE_MAP_APIKEY,
            language: 'en',
          }}
          returnKeyType={'search'}
          minLength={2}
          onPress={(data,details=null)=>{
             dispatch(setDestination({
               location:details.geometry.location,
               description:data.description,
             }))
             navigation.navigate('RideOptionsCard')
          }}
          debounce={400}

          />
        </View>
        <NavFavourites/>
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity onPress={()=> navigation.navigate('RideOptionsCard')} style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
          <AntDesign name='car' size={16} color='white'/>
          <Text style={tw`text-center text-white`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row  w-24 px-4 py-3 rounded-full justify-between`}>
          <MaterialIcons name='fastfood' size={16} color='black'/>
          <Text style={tw`text-center text-black`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    paddingTop:20,
    flex:0,
  },
  textInput:{
    backgroundColor:'#DDDDDF',
    borderRadius:0,
    fontSize:18,
  },
  textInputContainer:{
    paddingHorizontal:20,
    paddingBottom:0,
  }
})