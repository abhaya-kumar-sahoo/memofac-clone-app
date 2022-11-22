import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {checkContactPermission} from 'shared/Permission';
import {syncContacts} from 'redux/reducers/Contact/contacts.reducer';
import Video from 'react-native-video';
import {VidSrc} from 'assets/videos/VideoIndex';
import * as Progress from 'react-native-progress';

export const IntroVideo = () => {
  const dispatch = useDispatch();
  const [VideoLength, setVideoLength] = React.useState(0);

  const navigation = useNavigation();
  const syncContactsFirst = async () => {
    const {isPermissionGranted} = await checkContactPermission();
    if (isPermissionGranted) {
      dispatch(syncContacts());
    }
  };
  useEffect(() => {
    syncContactsFirst();
    AsyncStorage.setItem('isFirstTime', 'true');
  }, []);

  return (
    <View style={{flex: 1, paddingTop: 20}}>
      {/* <Progressbar done={VideoLength} /> */}
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <Progress.Bar
        color={AppColors.white4}
        borderWidth={1.5}
        borderRadius={8}
        height={10}
        width={280}
        progress={VideoLength}
        style={{
          position: 'absolute',
          zIndex: 100,
          alignSelf: 'center',
          bottom: 60,
        }}
      />
      <Video
        source={VidSrc.IntroSection} // Can be a URL or a local file.
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
          navigation.navigate('LetsGoScreen');
          setVideoLength(1);
        }}
      />
    </View>
  );
};

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
