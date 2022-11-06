import { AppColors } from 'assets/AppColors';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import RoundedCheckbox from 'react-native-rounded-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import { AppDimens, GStyles, Spacing, VertSpace } from 'shared/Global.styles';
export const checkButtonSize = AppDimens.width * 0.055;

export const ImageGridView = ({
  size = AppDimens.width * 0.3,
  onPress = () => {},
  selectable = false,
  isSelected = false,
  imageUrl = null,
  requiredLoader = true,
  index,
  item,
}) => {
  const mountRef = useRef(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const onPartialLoad = () => setImageLoading(false);
  const { node } = { ...item };
  const { uri } = { ...node?.image };
  const imageStyles = { width: size, height: size };
  const onImageSelect = () => {
    onPress(item, index);
    setChecked(prevState => !prevState);
  };
  const uncheckedColor = !checked ? AppColors.Transparent : AppColors.green;

  // console.log({ isSelected });

  useEffect(() => {
    // console.log('iseSelect change', isSelected, checked);
    if (isSelected !== checked && mountRef.current == true)
      setChecked(isSelected);

    mountRef.current == true;
  }, [isSelected]);

  const imagePlace = imageUrl !== null ? imageUrl : uri;
  return (
    <Pressable onPress={onImageSelect} style={[styles.container, imageStyles]}>
      {selectable && (
        <View style={[styles.containerView, { borderRadius: size / 2.9 }]}>
          <RoundedCheckbox
            innerSize={checkButtonSize}
            outerSize={checkButtonSize}
            checkedColor={checked ? AppColors.green : AppColors.Transparent}
            uncheckedColor={uncheckedColor}
            component={
              <Entypo
                size={16}
                name="check"
                color={checked ? '#fdfdfd' : AppColors.Transparent}
              />
            }
            onPress={onImageSelect}
          />
        </View>
      )}
      {imageLoading && requiredLoader && (
        <View style={{ position: 'absolute', zIndex: 20 }}>
          <ActivityIndicator color={AppColors.DarkGrey} />
        </View>
      )}
      <Image
        onPartialLoad={onPartialLoad}
        resizeMode={'cover'}
        style={[styles.imageView, imageStyles, { borderRadius: size / 4 }]}
        source={{ uri: imagePlace }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageView: {
    backgroundColor: AppColors.SkeletonBone,
  },
  containerView: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 20,
    backgroundColor: AppColors.Blackop1,
    borderColor: AppColors.white,
    borderWidth: 2,
  },
  container: {
    backgroundColor: AppColors.Transparent,
    ...GStyles.containView,
  },
});
