/* eslint-disable react-native/no-inline-styles */
import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {AppHeader} from 'components/AppHeader';
import React, {useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useDispatch, useSelector} from 'react-redux';
import {GetSinglePostAction} from 'redux/reducers/Post/SinglePost.reducer';
import {AppDimens, GStyles, Spacing, VertSpace} from 'shared/Global.styles';
import {PostView} from '../components/PostView/Postview.comp';

export const SinglePostScreen = ({route}) => {
  const {userToken} = useSelector(state => state.userAuth);

  const dispatch = useDispatch();
  // calling the single post api
  const {data, dataLoading} = useSelector(state => state.SinglePostReducer);

  useEffect(() => {
    dispatch(GetSinglePostAction(userToken, route.params?.post));

    // if (route.params?.post) {
    //   GetSinglePostData(userToken, route.params?.post)
    //     .then(response => {
    //       // console.log('\n\n\nResposne structure\n', response.content);

    //       setPostData(response.content);
    //     })
    //     .finally(() => setLoading(false));
    // }
  }, [route.params]);

  // console.log('NOTIFICATION_DATA', postData);
  // console.log('NOTIFICATION_DATA_POST', route.params?.post);

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack />
      <VertSpace size={10} />

      <SkeletonContent
        containerStyle={{flexDirection: 'column'}}
        boneColor={AppColors.RecomBoneDark}
        highlightColor={AppColors.SkeletonBone}
        isLoading={dataLoading}
        layout={timeline}>
        {!dataLoading && (
          <View style={{}}>
            {Object.keys(data).length === 0 ? (
              <View
                style={[
                  GStyles.Dark,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text
                  style={{
                    color: AppColors.white1,
                    fontFamily: AppFonts.CalibriBold,
                    fontSize: 24,
                    marginTop: -AppDimens.height * 0.3,
                  }}>
                  {/* Post Deleted */}
                </Text>
              </View>
            ) : (
              <PostView item={data} location="S" />
            )}
          </View>
        )}
      </SkeletonContent>
    </SafeAreaView>
  );
};

const timeline = [
  {
    marginHorizontal: Spacing.large,
    key: 'someId1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    children: [
      {
        flexDirection: 'row',
        children: [
          {
            width: 60,
            height: 60,
            borderRadius: 30,
          },
          {
            marginLeft: 20,
            children: [
              {
                width: 100,
                height: 25,
                borderRadius: 15,
                marginBottom: 10,
              },
              {
                width: 50,
                height: 16,
                borderRadius: 15,
              },
            ],
          },
        ],
      },
      // {
      //   height: 40,
      //   width: 10,
      // },
    ],
  },

  {
    marginVertical: 30,
    alignSelf: 'center',
    height: 320,
    width: 320,
    borderRadius: 30,
    marginTop: 90,
  },

  {
    flexDirection: 'row',

    children: [
      {
        height: 40,
        width: 150,
        borderRadius: 50,
        marginLeft: Spacing.large,
      },
    ],
  },
];
