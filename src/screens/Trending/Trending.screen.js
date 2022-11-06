import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { AppHeader, HeadingBar } from 'components/AppHeader';
import { API_TYPE, APP_APIS } from 'ApiLogic/API_URL';
import { useSelector } from 'react-redux';
import request from 'ApiLogic/axios.config';
import { ImgSourceCheck } from 'components/BioImageView';
import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import {
  FontSize,
  HoriSpace,
  VertSpace,
  WhiteFadeView,
} from 'shared/Global.styles';
import { BioIconAvatar } from 'shared/Icon.Comp';
import { hp, wp } from 'shared/dimens';
import { Container } from 'components/Mini';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Skeletons } from 'shared/Skeletons';

export const TrendingApiCall = token => {
  return request({
    url: APP_APIS.TRENDING,
    method: API_TYPE.POST,
    data: {
      token,
    },
  });
};

export const TrendingScreen = ({ navigation }) => {
  const { userToken } = useSelector(state => state.userAuth);
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TrendingApiCall(userToken).then(response => {
      setTrendingData(response.content.data);
      setLoading(false);
    });
  }, []);

  const trendingSkeleton = new Array(5).fill(Skeletons.trendingList);
  return (
    <SafeAreaView style={{ backgroundColor: '#000000', flex: 1 }}>
      <AppHeader enableBack />

      <View>
        <WhiteFadeView
          reverse
          style={{ position: 'absolute', width: '100%', zIndex: 20 }}
        >
          <HeadingBar title="Trending" description="in last 7 days" />
          <VertSpace size={60} />
        </WhiteFadeView>
      </View>

      <Container>
        <SkeletonContent
          containerStyle={{ marginTop: 20 }}
          boneColor={AppColors.RecomBoneDark}
          highlightColor={AppColors.SkeletonBone}
          isLoading={loading}
          layout={[
            {
              marginTop: 100,
              children: trendingSkeleton,
            },
          ]}
        >
          <FlatList
            ListFooterComponent={<VertSpace size={hp(200)} />}
            ListHeaderComponent={<VertSpace size={hp(100)} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View>
                <View
                  style={{
                    marginVertical: 50,
                    backgroundColor: AppColors.LightGrey,
                    width: 200,
                    height: 1,
                  }}
                />
              </View>
            )}
            data={trendingData}
            renderItem={({ item, index }) => {
              const { image, title, description, users = [] } = { ...item };
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ViewMemo', { memoId: item.id });
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      resizeMode={'contain'}
                      resizeMethod={'scale'}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: AppColors.Transparent,
                      }}
                      source={{ uri: ImgSourceCheck(image) }}
                    />
                    <HoriSpace />
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        style={{
                          color: AppColors.DarkGrey,
                          fontFamily: AppFonts.CalibriBold,
                          fontSize: FontSize.large,
                        }}
                      >
                        {title}
                      </Text>
                      {description.length > 0 && <Text>{description}</Text>}
                    </View>
                  </View>
                  <VertSpace size={30} />
                  <View
                    style={{
                      // backgroundColor: 'wheat',
                      height: hp(30),
                      flexDirection: 'row',
                      width: wp(30 * users.length),
                    }}
                  >
                    {users.map((item, index) => {
                      const { name } = { ...item };
                      return (
                        <View>
                          <View key={index.toString()}>
                            <View
                              style={{
                                borderWidth: 2,
                                borderColor: AppColors.white,
                                backgroundColor: AppColors.greyLight,
                                borderRadius: 23,
                                height: wp(30),
                                width: wp(30),
                                left: 25 * index,
                                zIndex: -index,
                                position: 'absolute',
                              }}
                            >
                              {item.image != null ? (
                                <Image
                                  style={{
                                    height: wp(25),
                                    width: wp(25),
                                    borderRadius: 30,
                                  }}
                                  source={{ uri: item.image }}
                                />
                              ) : (
                                <BioIconAvatar width={wp(25)} height={wp(25)} />
                              )}
                            </View>
                          </View>

                          {/* <Text>{name}</Text> */}
                        </View>
                      );
                    })}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </SkeletonContent>
      </Container>
    </SafeAreaView>
  );
};
