import { useNavigation } from '@react-navigation/core';
import { ImgSourceCheck } from 'components/BioImageView';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { hp, wp } from 'shared/dimens';
import { AppColors } from '../../../assets/AppColors';
import { AppFonts } from '../../../assets/fonts/AppFonts';
import { FontSize, GStyles, VertSpace } from '../../../shared/Global.styles';
import { DoneFillIcon, DoneIcon } from '../../../shared/Icon.Comp';
import { setSeenMemoApiCall } from 'redux/sagas/Memos/request';
import FastImage from 'react-native-fast-image';
import { AccentButton } from 'components/Mini';
import { MiniRating } from 'screens/Memos/MemoChip';
import { styles } from './RMemos.styles';
import { useDispatch } from 'react-redux';

const AverageView = ({ averageRating = 0 }) => {
  // const hasDecimal = num => {
  //   return !!(num % 1);
  // };

  if (averageRating == 0) {
    return null;
  } else {
    return (
      <View
        style={{
          ...GStyles.containView,
          backgroundColor: AppColors.greyLighter,
          height: 22,
          width: 43,
          borderRadius: 30,
          flexDirection: 'row',
        }}
      >
        <MiniRating
          rateNumber={averageRating}
          rateSize={wp(10)}
          toFixedDecimal={1}
          fontFamily={AppFonts.CalibriBold}
          color={AppColors.LowGrey}
          RATESIZE={15}
        />
      </View>
    );
  }
};

export function MemosPost({
  item,
  index,
  onExperience = () => {},
  onWishlist = () => {},
  userData,
}) {
  const nav = useNavigation();

  const { exp, wish, average_rating } = { ...item };
  const [wishlist, setWishlist] = useState(item.wish);
  const dispatch = useDispatch();
  const onContactPress = () => {
    nav.navigate('ExperiencedContacts', { MemoData: item });
    if (item.seen == 0) {
      setSeenMemoApiCall(userData.userToken, item.id);
    }
  };

  const onViewMemoPress = () => {
    nav.navigate('MemoDetailsView', { memoId: item.id, memoItem: item });
  };

  const onWishlistPress = () => {
    onWishlist(item);
    setWishlist(prevState => !prevState);
  };
  return (
    <View
      style={[
        styles.RecomMemoDark,
        {
          borderColor: AppColors.green1,
          borderWidth: item.me > 0 ? 2 : 0,
          backgroundColor:
            item.me > 0 ? AppColors.DarkBG : AppColors.LightDark1,
        },
      ]}
    >
      {/* <View
        style={{
          paddingHorizontal: wp(12),
          paddingTop: wp(12),
          minHeight: 40,
        }}
      >
        <AverageView averageRating={average_rating} />
      </View> */}
      {/* <VertSpace /> */}
      <TouchableOpacity onPress={onViewMemoPress} style={[GStyles.containView]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: wp(85),
            height: hp(85),
            backgroundColor: AppColors.Transparent,
          }}
          source={{
            uri: ImgSourceCheck(item.image),
            priority: FastImage.priority.high,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          height: hp(70),
          marginBottom: Platform.OS === 'android' ? hp(20) : hp(0),
        }}
      >
        <TouchableOpacity
          onPress={onViewMemoPress}
          style={{
            ...GStyles.containView,
          }}
        >
          <Text numberOfLines={1} style={styles.RecomMemoTitleDark}>
            {item.title}
          </Text>
          {item.description === null || item.description === '' ? (
            <Text style={styles.RecomMemoDescriptionDark} numberOfLines={1}>
              - - - -
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              style={{
                textAlign: 'center',
                // backgroundColor: 'wheat',
                fontSize: FontSize.short,
                width: wp(120),
                fontFamily: AppFonts.CalibriRegular,
                color: AppColors.MediumGrey,
                paddingTop: Platform.OS === 'android' ? 3 : 4,
              }}
            >
              {item.description}
            </Text>
          )}
        </TouchableOpacity>

        <VertSpace size={hp(10)} />

        <TouchableOpacity
          style={{ ...GStyles.containView }}
          onPress={onContactPress}
        >
          <KnownOnesMini memodata={item} onContactPress={onContactPress} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...GStyles.containView,
          // paddingBottom: hp(20),
        }}
      >
        <AccentButton
          title="Rate"
          onPress={() => {
            onExperience(item, index);
          }}
          style={{
            width: wp(120),
            height: wp(35),
            ...GStyles.containView,
            backgroundColor: AppColors.Red1,
          }}
        />
      </View>
    </View>
  );
}

export const MemosPostMemo = React.memo(MemosPost);

const DoneIconButton = ({ onPress = () => {}, status = true }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* <DoneIcon /> */}
      {status ? <DoneFillIcon /> : <DoneIcon />}
    </TouchableOpacity>
  );
};

const KnownOnesMini = ({ memodata, onContactPress }) => {
  const { users = [], totalExp } = { ...memodata };

  return (
    <>
      <View
        style={{
          height: hp(35),
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            marginBottom: hp(10),
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text style={{ marginTop: hp(5) }}>
            <DoneFillIcon size={9} />
          </Text>
          <Text style={styles.totalExpDark}>{totalExp}</Text>
        </View>

        {/* <View style={{ flexDirection: 'row' }}>
          {users.slice(0, 3).map((item, index) => {
            return (
              <View key={index.toString()}>
                <View style={[styles.knowMoreDark, { zIndex: 10 - index }]}>
                  <TouchableOpacity
                    style={{ height: 24 }}
                    onPress={onContactPress}
                  >
                    <Image
                      style={{
                        height: wp(29),
                        width: wp(29),
                        borderRadius: 20,
                      }}
                      source={
                        item.image != null ? { uri: item.image } : DefaultPic
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {users?.length > 3 && (
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'flex-end',
              paddingLeft: 8,
            }}
          >
            <Text style={styles.dashDark}>...</Text>
          </View>
        )} */}

        {/* {users?.length === 0 && (
          <Text style={styles.totalExpDark}>{totalExp}</Text>
        )} */}
      </View>
    </>
  );
};
