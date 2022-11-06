import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Alert,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import ImgSrc from '../../assets/images/ImageIndex';
import Carousel from 'react-native-snap-carousel';
import { AppDimens, GStyles } from '../../shared/Global.styles';
import PaginationDot from 'react-native-animated-pagination-dot';
import { useNavigation } from '@react-navigation/core';
import { FontSize, VertSpace } from 'shared/Global.styles';
import { useDispatch } from 'react-redux';
import { saveProgress } from 'redux/reducers/UserAuth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STR_KEYS } from 'shared/Storage';
import Ripple from 'react-native-material-ripple';
import { styles } from './index.styles';
import { hp } from 'shared/dimens';

const WalkthroughData = [
  {
    id: 8,
    imagSrc: ImgSrc.TUT_SCREEN_4,
    description: "Let's start",
  },
];

export const Walkthrough = ({}) => {
  const navigation = useNavigation();
  const carouselRef = React.useRef(null);
  // const [slider1ActiveSlide, setslider1ActiveSlide] = React.useState(0);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);
    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  // Use the index
  useEffect(() => {
    // console.warn(index);
  }, [index]);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    pagingEnabled: true,
    keyExtractor: useCallback(e => e.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: AppDimens.width,
        offset: index * AppDimens.width,
      }),
      [],
    ),
  };

  const ScreenRender = ({ item, index, onPress }) => {
    const resizeMode = 'contain';
    return (
      <View style={[styles.screenRenderContainer, { marginTop: 80 }]}>
        <Image
          style={{
            width: '100%',
            height: 500,
          }}
          resizeMode={resizeMode}
          source={item.imagSrc}
        />
        <Pressable onPress={onPress} style={styles.pressableArea} />
      </View>
    );
  };

  const onPress = () => {
    if (index !== 7) {
      carouselRef.current.scrollToIndex({
        animated: true,
        index: index + 1,
      });
    }
  };

  const onLastPress = () => {
    const setProceedStatus = async () => {
      try {
        await AsyncStorage.setItem(STR_KEYS.PROCEED_STATUS, 'timeline');
      } catch (e) {}
    };
    setProceedStatus();

    dispatch(
      saveProgress({
        proceedStatus: 'timeline',
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <TopView index={index} /> */}
      <FlatList
        data={WalkthroughData}
        ref={carouselRef}
        style={{ flex: 1 }}
        renderItem={({ ...props }) => {
          return <ScreenRender {...props} onPress={onPress} />;
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <BottomView index={index} onPress={onLastPress} />
    </SafeAreaView>
  );
};

const TopView = ({ index, onPress }) => {
  if (index > 2 && index < 7) {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 200,
          top: hp(50),
          // backgroundColor: 'red',
          width: '100%',
          ...GStyles.containView,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.CalibriBold,
            fontSize: 45,
            color:
              index == WalkthroughData.length - 1
                ? AppColors.white
                : AppColors.DarkGrey,
          }}
        >
          Tutorial {index - 2}
        </Text>
      </View>
    );
  } else {
    return null;
  }
};

const BottomView = ({ index, onPress }) => {
  return (
    <View style={styles.bottomViewContainer}>
      <VertSpace size={50} />
      <Ripple
        style={[
          styles.bottomViewSection,
          {
            width: 250,
            backgroundColor: AppColors.hotPink,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={{
            fontFamily: AppFonts.CalibriBold,
            fontSize: FontSize.xxlarge,
            color: AppColors.white,
          }}
        >
          {WalkthroughData[index].description}
        </Text>
      </Ripple>

      <VertSpace size={40} />
    </View>
  );
};
