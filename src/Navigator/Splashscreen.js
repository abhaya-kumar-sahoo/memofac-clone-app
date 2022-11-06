import { VidSrc } from 'assets/videos/VideoIndex';
import React from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { GStyles } from 'shared/Global.styles';
import { AppColors } from '../assets/AppColors';
import ImgSrc from '../assets/images/ImageIndex';
import Video from 'react-native-video';

export function SplashScreen() {
  const { userToken, isLoading } = useSelector(state => state.userAuth);
  const [VideoLength, setVideoLength] = React.useState(0);

  const RecommendedMemosLoading = useSelector(
    state => state.RecomMemosRedux.dataLoading,
  );
  const MainCategoryDataLoading = useSelector(
    state => state.MainCategoryRedux.dataLoading,
  );

  const SplashScreenLoading =
    isLoading ||
    (userToken !== null &&
      (RecommendedMemosLoading || MainCategoryDataLoading));

  return (
    <SafeAreaView style={GStyles.Dark}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Video
          source={VidSrc.SplashVideo} // Can be a URL or a local file.
          ref={ref => {
            // console.log(ref);
          }} // Store reference
          style={styles.backgroundVideo}
          resizeMode="cover"
          paused={false}
          fullscreen
          onProgress={t => {
            // setVideoLength(VideoLength + t.currentTime);

            if (t.currentTime == 0) {
              setVideoLength(0);
            } else {
              const total = t.currentTime / t.seekableDuration;
              setVideoLength(total);
            }
          }}
          onEnd={() => {
            setVideoLength(1);
          }}
        />

        {/* <Image
          style={{
            width: 350,
            height: 300,
            // borderRadius: 1000,
            // marginTop: -10,
          }}
          source={ImgSrc.SplashScreenImage}
          resizeMode="contain"
          resizeMethod="scale"
        />
      </View> */}

        {/* <View
        style={{
          position: 'absolute',
          zIndex: 200,
          width: '100%',
          height: 100,
          ...GStyles.containView,
          bottom: 10,
        }}
      >
        {SplashScreenLoading && (
          <ActivityIndicator color={AppColors.MediumGrey} />
        )} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: AppColors.DarkMode,
    zIndex: 0,
  },
});
