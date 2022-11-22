import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {SearchHeader} from '../../components/AppHeader';
import {Container} from '../../components/Mini';
import {MemosData} from '../../shared/Data.shared';
import {
  FontSize,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';

export const SecondaryGroup = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: '#000000', flex: 1}}>
      <SearchHeader enableBack />

      <Container>
        <VertSpace />
        <FlatList
          data={MemosData}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <VertSpace size={Spacing.xxlarge} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableRipple
              onPress={() => {
                navigation.navigate('CreateNewMemo');
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 50, height: 50}}
                  resizeMode={'contain'}
                  resizeMethod={'resize'}
                  source={{uri: item.imageUrl}}
                />
                <HoriSpace />
                <Text
                  style={{
                    fontSize: FontSize.inputText,
                    fontFamily: AppFonts.CalibriBold,
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableRipple>
          )}
        />
      </Container>

      {/* <LinearGradient
        angle={0}
        useAngle={true}
        colors={[AppColors.white, AppColors.whiteop01, AppColors.Transparent]}
        style={{ position: 'absolute', ...GStyles.containView, bottom: 0, height: 50, width: '100%' }}> */}

      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
