import React, { Component } from 'react';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { AppHeader } from '../../components/AppHeader';
import { AccentButton, Container } from '../../components/Mini';
import { FreiendsContacts } from '../../shared/Data.shared';
import { FontSize, HoriSpace, VertSpace } from '../../shared/Global.styles';
import { DoneFillIcon } from '../../shared/Icon.Comp';

export const RecentActivity = () => {
  const [boolValue, setBoolValue] = useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: AppColors.white, flex: 1 }}>
      <AppHeader enableBack />

      <Container>
        {/* MEMO ITEM */}

        <Pressable
          style={{ width: 100, height: 50, backgroundColor: 'skyblue' }}
          onPress={() => {
            setBoolValue(!boolValue);
          }}
        >
          <Text>CLICKALBLE</Text>
        </Pressable>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View style={{ height: 60, justifyContent: 'center' }}>
                <View
                  style={{
                    height: 1,
                    width: 100,
                    backgroundColor: AppColors.MediumGrey,
                  }}
                />
              </View>
            );
          }}
          data={FreiendsContacts}
          renderItem={({ item, index }) => {
            return <ActivityItem />;
          }}
        />
        <ActivityItem />
      </Container>
    </SafeAreaView>
  );
};

const ActivityItem = React.memo(() => {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          resizeMode={'contain'}
          style={{ width: 55, height: 55 }}
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/memofac-d6d5d.appspot.com/o/others%2FApps.png?alt=media&token=dc575916-8dd1-4117-9ed7-2dc7290c3a2f',
          }}
        />
        {/* HORIZONTAL SPACE */}
        <HoriSpace />
        <Text
          style={{
            color: AppColors.DarkGrey,
            fontSize: FontSize.inputText,
            fontFamily: AppFonts.CalibriBold,
          }}
        >
          Kookie Jar
        </Text>
      </View>

      <VertSpace size={30} />

      <ProfileMaper
        dataList={FreiendsContacts}
        keyName={'imageUrl'}
        dataLength={FreiendsContacts.length}
        size={30}
      />
    </View>
  );
});

export const ProfileMaper = ({
  dataList = [],
  keyName = 'imageUrl',
  size = 30,
  dataLength,
}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <DoneFillIcon size={10} />
      <View style={{ backgroundColor: AppColors.Transparent, height: size }}>
        {dataList.map((profile, index) => {
          return (
            <View
              key={index.toString()}
              style={{
                position: 'absolute',
                borderWidth: 2,
                borderColor: AppColors.white,
                borderRadius: size / 2,
                left: (dataLength - index - 1) * (size * 0.8),
              }}
            >
              <Image
                style={{ width: size, height: size, borderRadius: size / 2 }}
                source={{ uri: profile[keyName] }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
