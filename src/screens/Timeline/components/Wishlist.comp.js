import React, {useEffect, useRef, useState} from 'react';
import Ripple from 'react-native-material-ripple';
import {StyleSheet} from 'react-native';
import {AppColors} from 'assets/AppColors';
import {WishlistDarkIcon, WishlistFillIcon} from 'shared/Icon.Comp';

const styles = StyleSheet.create({
  containerDark: {
    // backgroundColor: AppColors.white,
    backgroundColor: AppColors.DarkBG,

    width: 40,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: AppColors.white,

    width: 40,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const WishListButton = ({
  disabled = false,
  postData,
  onAddtoWishList = () => {},
}) => {
  const renderRef = useRef(false);

  const [WishListAdded, setWishListAdded] = useState(postData.wish);

  // console.log(postData.wish);
  // console.log('WishListAdded', WishListAdded);
  useEffect(() => {
    if (renderRef.current) setWishListAdded(postData.wish);
    else renderRef.current = true;
  }, [postData.wish]);

  const onPress = () => {
    setWishListAdded(prevState => !prevState);
    onAddtoWishList();
  };

  return (
    <Ripple
      disabled={disabled}
      rippleContainerBorderRadius={20}
      rippleFades={true}
      onPress={onPress}
      style={styles.containerDark}>
      {WishListAdded ? (
        <WishlistFillIcon size={30} />
      ) : (
        <WishlistDarkIcon color="white" size={30} />
      )}
    </Ripple>
  );
};
