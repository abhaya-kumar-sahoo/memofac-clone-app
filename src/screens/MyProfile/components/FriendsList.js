import { useNavigation } from '@react-navigation/core';
import React, { Component, Fragment } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppColors } from '../../../assets/AppColors';
import { AppFonts } from '../../../assets/fonts/AppFonts';
import { BioImageView } from '../../../components/BioImageView';
import { TextNoDataView } from '../../../components/NodataView/TextNodata';
import { SeelAllButton } from '../../../components/SeeAllButton';
import { FreiendsContacts } from '../../../shared/Data.shared';
import {
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';

export const MiniFriendsList = ({ contactList = [] }) => {
  const nav = useNavigation();
  return (
    <View style={{}}>
      <View
        style={[
          GStyles.flexRow,
          { justifyContent: 'space-between', padding: Spacing.large },
        ]}
      >
        <Text
          style={{
            color: AppColors.DarkGrey,
            fontSize: FontSize.inputText,
            fontFamily: AppFonts.CalibriBold,
          }}
        >
          Friends
        </Text>
        <SeelAllButton onPress={() => nav.navigate('ContactsScreen')} />
      </View>
      {contactList.length == 0 && (
        <TextNoDataView title={'No contacts available'} />
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HoriSpace size={Spacing.large} />
        {contactList.map((FriendData, index) => {
          return (
            <View
              style={{ alignItems: 'center', marginRight: 23 }}
              key={FriendData.id.toString()}
            >
              {/* "id": 4,
                "name": "Nabendu Paul",
                "image": "https://memofac.devclub.co.in/public/images/user.png",
                "phone": "9903272861" */}
              <BioImageView imageSize={60} imageSrc={FriendData.image} />
              <VertSpace size={Spacing.short} />
              <Text
                style={{
                  color: AppColors.DarkGrey,
                  fontSize: FontSize.medium,
                  fontFamily: AppFonts.CalibriBold,
                }}
              >
                {FriendData.name}
              </Text>
            </View>
          );
        })}
        {/* <HoriSpace size={Spacing.large} /> */}
      </ScrollView>
    </View>
  );
};
