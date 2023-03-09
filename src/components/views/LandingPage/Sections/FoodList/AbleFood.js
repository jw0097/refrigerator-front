import React, {useEffect, useState} from 'react'
import { View, Dimensions } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import AbleFoodData from './AbleFoodData'
import { useSelector } from 'react-redux';
import CarouselCardItem from '../../../Common/CarouselCardItem'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import {API_KEY, PORT} from '@env';
const AbleFood = () => {
  const user = useSelector(state => state.user.loginSuccess);
  const isFocused = useIsFocused(); // isFoucesd Define
  const pagenum = Math.floor(Math.random() * 20);
  useEffect(() => {
    if (user) {
      const refri = user.refrigerator
      const getURl = 'http://'+API_KEY+':'+PORT+'/recipes/api/recommendRecipe/' + refri;
      axios.get(getURl)
     .then(response => setAbleFoodList(response.data))
     .catch(error => console.log(error))
    } else {
      const getURl = 'http://'+API_KEY+':'+PORT+'/recipes/api/searchRecipe/' + pagenum;
      axios.get(getURl)
     .then(response => setAbleFoodList(response.data.content))
     .catch(error => console.log(error))
    }
  }, [isFocused])
  const [ableFoodList, setAbleFoodList] = useState([])
  const navigation = useNavigation();
  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5)
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={ableFoodList}
        renderItem = {({item}) => {
          return <CarouselCardItem item={item} navigation={navigation}/>
        }}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={ableFoodList.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
}


export default AbleFood