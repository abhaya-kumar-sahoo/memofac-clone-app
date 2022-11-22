/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {CalendarList} from 'react-native-calendars';
import {AppColors} from '../../../assets/AppColors';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import {AppHeader, DropdownHeader} from '../../../components/AppHeader';
import {Container, NextButton} from '../../../components/Mini';
import {MonthNames} from '../../../shared/Data.shared';
import {
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from 'shared/Global.styles';
import {NoideaIcon} from 'shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/core';

export const stringvalueDate = (date, month, year) => {
  var dateString = `${date}`,
    monthString = `${month}`;
  if (date < 10) {
    dateString = '0' + dateString;
  }
  if (month < 10) {
    monthString = '0' + monthString;
  }

  return `${year}-${monthString}-${dateString}`;
};

// MONTH PICKER
export const MonthPicker = ({route}) => {
  const calenderRef = React.useRef(null);
  const [Data, setData] = React.useState(null);
  const [YearSelected, setYearSelected] = React.useState('2021');
  const [MonthIndex, setMonthIndex] = React.useState(0);
  const [SelectedDate, setSelectedDate] = React.useState();
  const navigation = useNavigation();
  const {routename, subRoutename} = route.params;
  const [MarkedDate, setMarkedDate] = React.useState({});
  // MarkedDate[`${SelectedDate}`] = { selected: true };

  React.useEffect(() => {
    let tempMarkedDate = {};
    tempMarkedDate[`${SelectedDate}`] = {selected: true};
    setMarkedDate(tempMarkedDate);
  }, [SelectedDate]);

  // USEFECT
  React.useEffect(() => {
    const CurrentDate = moment().date();
    const CurrentYear = moment().year();
    const CurrentMonthIndex = moment().month();
    setMonthIndex(CurrentMonthIndex);
    setSelectedDate(
      stringvalueDate(CurrentDate, CurrentMonthIndex + 1, CurrentYear),
    );
  }, []);

  // const UpdateSelectedDate = (date, month, year) => {
  //   setSelectedDate(
  //     `${year}-${month < 10 ? '0' + month : month}-${
  //       date < 10 ? '0' + date : date
  //     }`
  //   );
  // };

  return (
    <SafeAreaView style={{backgroundColor: '#000000', flex: 1}}>
      <AppHeader enableBack>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ripple
            onPress={() => {
              navigation.navigate('RecaptureActivity', {DatePicked: false});
            }}>
            {/* <Image
              width={40}
              height={40}
              source={require('../../../assets/images/Nodiea.png')}
            /> */}
            <NoideaIcon />
          </Ripple>
          <HoriSpace size={20} />
          <NextButton
            title={'Done'}
            disabled={false}
            onPress={() => {
              if (
                subRoutename === undefined ||
                subRoutename === null ||
                subRoutename === ''
              ) {
                navigation.navigate(routename, {
                  DatePicked: true,
                  data: Data,
                });
              } else {
                navigation.navigate(routename, {
                  screen: subRoutename,
                  params: {
                    DatePicked: true,
                    data: Data,
                  },
                });
              }
            }}
          />
        </View>
      </AppHeader>

      <Container>
        <DropdownHeader
          fontStyles={styles.yearStyles}
          title={YearSelected}
          onHeaderPress={() => navigation.navigate('YearPicker')}
        />

        <VertSpace size={Spacing.xlarge} />

        <MonthList
          MonthIndex={MonthIndex}
          onMonthPress={monthIndex => {
            var monthString =
              monthIndex < 10 ? '0' + (monthIndex + 1) : monthIndex;

            calenderRef?.current.scrollToMonth(`${2021}-${monthString}`);
          }}
        />
      </Container>

      <CalendarList
        ref={calenderRef}
        horizontal
        onVisibleMonthsChange={months => {}}
        pagingEnabled
        pastScrollRange={MonthIndex}
        futureScrollRange={12}
        scrollEnabled={false}
        showScrollIndicator={true}
        current={SelectedDate}
        onDayPress={day => {
          setSelectedDate(day.dateString);
          setData(day);
        }}
        onDayLongPress={day => {}}
        markedDates={MarkedDate}
        monthFormat={'yyyy MM'}
        onMonthChange={month => {}}
        disableAllTouchEventsForDisabledDays={true}
        theme={AppCalenderTheme}
      />
    </SafeAreaView>
  );
};

const MonthList = ({MonthIndex, onMonthPress = () => {}}) => {
  const [MonthSelected, setMonthSelected] = React.useState(-1);
  React.useEffect(() => {
    setMonthSelected(MonthIndex);
  }, [MonthIndex]);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{marginHorizontal: -Spacing.large}}>
      <HoriSpace size={Spacing.large} />
      {MonthNames.map((month, index) => {
        return (
          <View key={index.toString()} style={{flexDirection: 'row'}}>
            <Ripple
              onPress={() => {
                onMonthPress(index);
                setMonthSelected(index);
              }}
              disabled={index > MonthIndex}
              rippleContainerBorderRadius={100}
              style={{
                ...styles.monthContainer,
                backgroundColor:
                  index > MonthIndex
                    ? AppColors.VeryLightGrey
                    : index == MonthSelected
                    ? AppColors.DarkGrey
                    : AppColors.LightGrey,
              }}>
              <Text
                style={{
                  ...styles.monthFontStyles,
                  color:
                    index > MonthIndex
                      ? AppColors.LightGrey
                      : index == MonthSelected
                      ? AppColors.white
                      : AppColors.DarkGrey,
                }}>
                {month}
              </Text>
            </Ripple>
            <HoriSpace size={Spacing.medium} />
          </View>
        );
      })}
    </ScrollView>
  );
};
const AppCalenderTheme = {
  textDayFontFamily: AppFonts.CalibriBold,
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: AppColors.DarkGrey,
  selectedDayTextColor: AppColors.white,
  todayTextColor: AppColors.blue,
  dayTextColor: AppColors.MediumGrey,
  textDisabledColor: AppColors.VeryLightGrey,
  dotColor: AppColors.VeryDarkGrey,
  selectedDotColor: '#ffffff',
  arrowColor: AppColors.VeryDarkGrey,
  disabledArrowColor: AppColors.VeryLightGrey,
  monthTextColor: AppColors.DarkGrey,
  indicatorColor: AppColors.LightGrey,
};

const styles = StyleSheet.create({
  monthFontStyles: {
    fontSize: FontSize.inputText,
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey,
  },
  monthContainer: {
    backgroundColor: AppColors.LightGrey,
    borderRadius: 50,
    height: 40,
    ...GStyles.containView,
    paddingHorizontal: Spacing.large,
  },
  yearStyles: {
    fontSize: FontSize.x6Large,
    color: AppColors.DarkGrey,
    fontFamily: AppFonts.CalibriBold,
  },
});
