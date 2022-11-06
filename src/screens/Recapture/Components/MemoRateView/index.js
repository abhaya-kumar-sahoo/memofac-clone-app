import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  Pressable,
  Easing,
} from 'react-native';
import { AppColors } from '../../../../assets/AppColors';
import { AppFonts } from '../../../../assets/fonts/AppFonts';
import {
  FontSize,
  GStyles,
  HoriSpace,
  VertSpace,
} from '../../../../shared/Global.styles';
import Ripple from 'react-native-material-ripple';
import {
  BronzeIcon,
  CancelIcon,
  GoldIcon,
  SilverIcon,
  StarUnFilledDarkIcon,
  StarUnFilledIcon,
} from '../../../../shared/Icon.Comp';
import { wp } from 'shared/dimens';
import FastImage from 'react-native-fast-image';
import { Container } from 'components/Mini';
import { useSelector } from 'react-redux';

const MemorateStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memoName: {
    color: AppColors.DarkGrey,
    fontSize: FontSize.xxlarge,
    fontFamily: AppFonts.CalibriBold,
  },
  memoNameDark: {
    color: AppColors.white,
    fontSize: FontSize.xxlarge,
    fontFamily: AppFonts.CalibriBold,
  },
});

export const MemoRateView = ({
  RateStarSize = 40,
  memoName = '',
  imageUrl = null,
  showImage = true,
  ratingGiven = -1,
  onRateCallback = () => {},
  removable = true,
  onRemove = () => {},
  justRating = false,
  titleSpacing = 0,
  defaultRate = -1,
  memoDesc = '',
  paddingHorizontal = 0,
  descriptionPadding = 0,
  memoNameWidth = wp(250),
  gapInTitleDes = 18,
}) => {
  return (
    <View>
      <View
        style={{
          ...MemorateStyles.mainContainer,
          // alignItems: 'flex-start',
          marginBottom: -15,
          paddingHorizontal: titleSpacing,
        }}
      >
        {!justRating && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* MEMO IMAGE */}
            {/* {showImage && (
              <>
                <FastImage
                  resizeMode="contain"
                  source={{ uri: imageUrl }}
                  style={{ width: 30, height: 30 }}
                />
                <HoriSpace />
              </>
            )} */}
            {/* NAME MEMO */}

            <Text
              numberOfLines={4}
              style={[MemorateStyles.memoNameDark, { width: memoNameWidth }]}
            >
              {memoName}
            </Text>
          </View>
        )}

        {/* CANCEL BUTTON */}

        {removable && (
          <Ripple
            rippleContainerBorderRadius={10}
            style={{ width: 50, height: 50, ...GStyles.containView }}
            onPress={onRemove}
          >
            <CancelIcon color={AppColors.white} size={FontSize.large} />
          </Ripple>
        )}
      </View>
      <VertSpace size={gapInTitleDes} />
      <Container padding={descriptionPadding}>
        {memoDesc == '' ? (
          <Text
            style={{
              color: AppColors.LowDark,
            }}
          >
            - - - -
          </Text>
        ) : (
          <Text
            style={{
              color: AppColors.LowDark,
            }}
          >
            {memoDesc}
          </Text>
        )}
      </Container>

      <VertSpace size={10} />
      <View style={{ paddingHorizontal: paddingHorizontal }}>
        <RatingComponent
          titleSpacing={titleSpacing}
          ratingGiven={ratingGiven}
          RateStarSize={RateStarSize}
          defaultRate={defaultRate}
          onRate={selectedIndex => onRateCallback(selectedIndex)}
        />
      </View>
    </View>
  );
};

export const RatingComponent = ({
  RateStarSize = 40,
  onRate = () => {},
  ratingGiven = -1,
  titleSpacing = 0,
  defaultRate = -1,
}) => {
  var numstars = 10;
  const ratingRef = useRef('');
  let stars = Array(numstars).fill({});
  const animation = new Animated.Value(1);
  const animatedValueRef = useRef(animation);
  const [rating, setRating] = React.useState();

  // console.log(
  //   'logging from MemoRateView',
  //   'ratingGiven from inside',
  //   ratingGiven,
  // );
  React.useEffect(() => {
    setRating(ratingGiven);
  }, [ratingGiven]);

  useEffect(() => {
    setTimeout(() => {
      if (defaultRate !== -1) {
        AnimateIt(defaultRate);
        onRate(defaultRate);
      }
    }, 1000);
  }, [defaultRate]);

  const AnimateIt = index => {
    Animated.timing(animatedValueRef.current, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animatedValueRef.current.setValue(1);
    });

    setRating(index == rating ? -1 : index);
    // addPlaceRatings(index + 1);
  };

  const animateScale = animatedValueRef.current.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animationStyle = {
    transform: [{ scale: animateScale }],
  };

  return (
    <View>
      {/* <SilverIcon />
      <GoldIcon />
      <BronzeIcon />
      <StarUnFilledIcon /> */}

      <ScrollView
        contentOffset={{ x: wp(500), y: 0 }}
        snapToEnd={true}
        ref={ratingRef}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <HoriSpace size={titleSpacing == 0 ? 0 : 10} />
        {stars.map((item, index) => {
          return (
            <Pressable
              style={{ flexDirection: 'row' }}
              onPress={() => {
                AnimateIt(index);
                onRate(index == rating ? -1 : index);
              }}
              key={index}
            >
              <Animated.View
                style={{
                  ...animationStyle,
                  backgroundColor: AppColors.Transparent,
                  alignItems: 'center',
                  padding: 15,
                }}
              >
                {index == rating ? (
                  index > 6 ? (
                    <GoldIcon size={RateStarSize} />
                  ) : index > 2 ? (
                    <SilverIcon size={RateStarSize} />
                  ) : (
                    <BronzeIcon size={RateStarSize} />
                  )
                ) : (
                  <StarUnFilledDarkIcon size={RateStarSize} />
                )}

                <Text
                  style={{
                    fontSize: FontSize.medium,
                    color: AppColors.LowWhite,
                    fontFamily: AppFonts.CalibriBold,
                  }}
                >
                  {index + 1}
                </Text>
              </Animated.View>

              {/* <HoriSpace size={30} /> */}
            </Pressable>
          );
        })}
        <HoriSpace size={titleSpacing - 10} />
      </ScrollView>
    </View>
  );
};
