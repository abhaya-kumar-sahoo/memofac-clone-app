import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { AppColors } from 'assets/AppColors';
import { useNavigation } from '@react-navigation/native';

export const CarouselRenderView = ({ item, imagesList, index }) => {
  const lenghtImagelIst = imagesList.length;
  const navigation = useNavigation();
  const { navigate } = { ...navigation };
  return (
    <Pressable
      onPress={() => {
        navigate('ImageViewScreen', {
          imageUrl: item.image,
          imagesList: imagesList.reverse(),
          clickedImageIndex:
            lenghtImagelIst - index - 1 < 0 ? 0 : lenghtImagelIst - index - 1,
        });
      }}
      style={{
        backgroundColor: AppColors.white,
        width: 200,
        height: 200,
        borderRadius: 30,
        transform: [{ scaleX: -1 }],
      }}
    >
      <View
        style={{
          backgroundColor: AppColors.VeryLightGrey,
          width: 200,
          height: 200,
          borderRadius: 30,
          borderWidth: 5,
          borderColor: AppColors.white,
        }}
      >
        {/* <Text>Hello</Text> */}
        <Image
          resizeMethod={'auto'}
          resizeMode={'cover'}
          style={{
            position: 'absolute',
            width: 190,
            height: 190,
            borderRadius: 26,
          }}
          source={{ uri: item.image }}
        />
      </View>
    </Pressable>
  );
};
