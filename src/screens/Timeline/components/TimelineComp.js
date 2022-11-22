/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {AppDimens, GStyles, VertSpace} from 'shared/Global.styles';
import ImgSrc from 'assets/images/ImageIndex';
import Ripple from 'react-native-material-ripple';
import {AddDarkIcon, DoneFillIcon} from 'shared/Icon.Comp';
import {SearchView} from 'components/SearchComponent';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {hp} from 'shared/dimens';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {Styles} from '../Timeline.styles';
import {Skeletons} from 'shared/Skeletons';
import {AppFonts} from 'assets/fonts/AppFonts';
import DefaultImage from 'assets/images/DefaultIcon.png';
import {useSelector} from 'react-redux';

export const TimelineHeader = () => {
  const nav = useNavigation();
  return (
    <View
      style={{
        width: AppDimens.width,
        ...GStyles.containView,
      }}>
      <View style={{height: hp(20)}} />

      <View
        style={{
          paddingHorizontal: 15,
          width: AppDimens.width * 1,
          ...GStyles.flexRowSpaceBetween,
        }}>
        <View
          style={{
            marginLeft: -6,
          }}>
          <Image
            source={ImgSrc.MemofacDarkLogo}
            style={{height: 65, width: 200}}
            resizeMode="contain"
          />
        </View>

        <Ripple
          onPress={() => {
            nav.navigate('RecaptureActivity');
          }}>
          <AddDarkIcon color={AppColors.Red} size={35} />
        </Ripple>
      </View>
      <View style={{height: hp(15)}} />

      <SearchView
        onPress={() => {
          nav.navigate('SearchScreen', {select: 'other'});
        }}
      />
    </View>
  );
};

export const SeeAllLineComp = ({timeLineLoading}) => {
  const nav = useNavigation();

  return (
    <SkeletonContent
      // duration={2000}
      animationType={'shiver'}
      containerStyle={{}}
      boneColor={AppColors.RecomBoneDark}
      highlightColor={AppColors.SkeletonBone}
      isLoading={timeLineLoading}
      layout={[
        {
          width: AppDimens.width * 1,
          ...GStyles.flexRowCenter,
          children: [
            {
              height: 1,
              width: AppDimens.width * 0.85,
            },
            {
              width: 57,
              height: 24,
              flexDirection: 'row',
              borderRadius: 30,
              ...GStyles.containView,
              position: 'absolute',
              right: 40,
            },
          ],
        },
      ]}>
      <View
        style={{
          width: '100%',
          ...GStyles.containView,
        }}>
        <View style={Styles.horizontalDark} />
        <Ripple
          style={{
            position: 'absolute',
            zIndex: 10,
            top: -10,
            right: 40,
          }}
          onPress={() => nav.navigate('SamplePage')}>
          <View style={Styles.SeeAllLDark}>
            <Text style={Styles.SeeAllLDarkText}>See All</Text>
          </View>
        </Ripple>
      </View>
    </SkeletonContent>
  );
};

export const CloseContactList = ({refreshing, ContactsList = []}) => {
  const nav = useNavigation();
  const {userData} = useSelector(state => state.userAuth);
  return (
    <SkeletonContent
      containerStyle={{
        marginTop: hp(50),
      }}
      boneColor={AppColors.RecomBoneDark}
      highlightColor={AppColors.SkeletonBone}
      isLoading={refreshing}
      layout={Skeletons.contacts}>
      {ContactsList.length > 0 && (
        <>
          <View style={{marginBottom: hp(50)}}>
            {ContactsList.length > 0 && (
              <Text
                style={{
                  color: AppColors.white1,
                  paddingLeft: 30,
                  fontSize: 20,
                  fontFamily: AppFonts.ComicSans,
                }}>
                Friend's review
              </Text>
            )}

            <VertSpace />
            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 8,
              }}
              showsHorizontalScrollIndicator={false}
              style={{
                backgroundColor: AppColors.DarkBG,
              }}>
              {ContactsList.map((i, k) => {
                return (
                  <View key={k}>
                    {i.uid == userData.id ? null : (
                      <TouchableOpacity
                        onPress={() =>
                          nav.navigate('FriendsProfile', {user_id: i.uid})
                        }
                        key={k}
                        style={{
                          // width: 70,
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          paddingHorizontal: 5,
                          backgroundColor: AppColors.DarkBG,
                        }}>
                        <Image
                          source={
                            i.image === null
                              ? DefaultImage
                              : {
                                  uri: i.image,
                                }
                          }
                          resizeMethod="scale"
                          resizeMode="contain"
                          key={k}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 100,
                            // marginHorizontal: 5,
                          }}
                        />
                        <VertSpace size={10} />
                        <View
                          style={{
                            width: 70,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white1,
                              fontFamily: AppFonts.CalibriBold,
                            }}
                            ellipsizeMode="clip"
                            numberOfLines={1}>
                            {i.name}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: 10,
                          }}>
                          <Text style={{paddingTop: 3, paddingRight: 2}}>
                            <DoneFillIcon size={6} />
                          </Text>
                          <Text
                            style={{
                              color: AppColors.white1,
                              fontSize: 10,
                            }}>
                            {i.total_rated_memo}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </SkeletonContent>
  );
};
