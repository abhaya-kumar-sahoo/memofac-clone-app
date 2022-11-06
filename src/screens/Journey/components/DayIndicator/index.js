import React, { Component, Fragment } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../../../../assets/AppColors';
import { AppFonts } from '../../../../assets/fonts/AppFonts';
import {
  JourneyTimeLineData,
  MonthNames,
} from '../../../../shared/Data.shared';
import {
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../../../shared/Global.styles';

export const DayIndicator = ({ onJourneyClick }) => {
  const [Selected, setSelected] = React.useState(0);
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderColor: AppColors.white,
        borderTopColor: AppColors.VeryLightGrey,
        borderWidth: 2,
        // paddingTop: 10,
      }}
    >
      {/* <View
        style={{
          width: 50,
          height: 2,
          backgroundColor: AppColors.DarkGrey,
          transform: [{ translateX: Selected * 50 }],
        }}
      /> */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        // ItemSeparatorComponent={() => <HoriSpace size={25} />}
        keyExtractor={(item, index) => index.toString()}
        data={JourneyTimeLineData}
        renderItem={({ item, index }) => (
          <DateJourneyItem
            item={item}
            index={index}
            selectedIndex={Selected}
            onPress={() => {
              setSelected(index);
            }}
          />
        )}
      />
    </View>
  );
};

// { date: 3, month: 3, year: 2020 },
function DateJourneyItem({
  item = { date: 3, month: 3, year: 2020 },
  index = 0,
  selectedIndex = 0,
  onPress = () => {},
}) {
  return (
    <View>
      {selectedIndex === index ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 20,
            width: 40,
            height: 4,
            borderRadius: 10,
            marginHorizontal: 10,
            marginTop: -1,
            backgroundColor: AppColors.DarkGrey,
          }}
        />
      ) : null}

      {/* <VertSpace /> */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Ripple
          rippleFades
          rippleContainerBorderRadius={5}
          onPress={() => onPress()}
          style={{
            backgroundColor: AppColors.white,
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              ...GStyles.containView,
              borderColor: AppColors.DarkGrey,
              borderWidth: 1,
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.large,
                color: AppColors.DarkGrey,
                fontFamily: AppFonts.CalibriBold,
              }}
            >
              {item.date}
            </Text>
          </View>
          <VertSpace size={10} />
          <Text
            style={{
              fontSize: FontSize.shorter,
              color: AppColors.DarkGrey,
              fontFamily: AppFonts.CalibriRegular,
            }}
          >
            {MonthNames[item.month]} {item.year.toString().substring(2, 4)}
          </Text>
        </Ripple>

        {item.date === 1 && (
          <View style={{ flexDirection: 'row' }}>
            <HoriSpace size={20} />
            <View
              style={{
                height: 20,
                width: 2,
                backgroundColor: AppColors.MediumGrey,
                marginTop: 10,
              }}
            />
            <HoriSpace size={Spacing.large} />
          </View>
        )}
      </View>
    </View>
  );
}
