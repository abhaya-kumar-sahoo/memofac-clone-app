import { useNavigation } from '@react-navigation/core';
import React, { Fragment, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Modal, Portal } from 'react-native-paper';
import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import { AppHeader } from 'components/AppHeader';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from 'shared/Global.styles';
import {
  AddDarkIcon,
  EditIcon,
  RadioButtonGreen,
  RadioButtonOff,
} from 'shared/Icon.Comp';
import { useDispatch, useSelector } from 'react-redux';
import { reqSecondaryFolderApiCall } from 'redux/sagas/Memos/request';
import { Gravities, showToast } from 'shared/Functions/ToastFunctions';
import { Skeletons } from 'shared/Skeletons';
import { hp } from 'shared/dimens';
import { AccentButton, Container } from 'components/Mini';
import { ModalButtons } from 'screens/Timeline/components/MenuOption';

export const SavetoCollection = ({ route }) => {
  const [secondaryList, setsecondaryList] = useState({});
  const navigation = useNavigation();
  const [routePrimaryInfo, setRoutePrimaryInfo] = useState('');
  const [Category, setCategory] = useState({ id: 0, name: 'All' });
  const userToken = useSelector(state => state.userAuth.userToken);
  const { MaincategoryList } = useSelector(state => state.MainCategoryRedux);

  const { subcategoryList, dataLoading } = useSelector(
    state => state.subCategoryRedux,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (route.params.primaryInfo) {
      setRoutePrimaryInfo(route.params.primaryInfo);
    }
  }, [route.params]);

  const buttonDisabled = Object.keys(secondaryList).length == 0;
  const SearchValue = route.params;
  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* SEARCH SECONDARY GROUP */}

          {/* DONE BUTTON */}
          <HoriSpace />

          <AddSecondaryGroup Category={Category} />
        </View>
      </AppHeader>

      <Container>
        {/* <VertSpace size={Spacing.xxlarge} /> */}
        {/* <PrimaryGroupList
          onCategorySelect={(data) => {

            setCategory({ ...data });
            // dispatch(GetSubCategoryAction(userToken, data.id));
          }}
          dataSet={[{ id: 0, name: 'All' }, ...MaincategoryList]}
        /> */}
        {/* <VertSpace size={Spacing.size40} /> */}
        {/* {dataLoading && <ActivityIndicator color={AppColors.LightGrey} />} */}
        <VertSpace />

        <View>
          <Text style={Styles.headerTextDark}>Choose suitable </Text>
          <Text style={Styles.headerTextDark}>catagories</Text>
        </View>
        <SkeletonContent
          containerStyle={Styles.containerStyle}
          boneColor={AppColors.RecomBoneDark}
          highlightColor={AppColors.SkeletonBone}
          isLoading={dataLoading}
          layout={Skeletons.searchMemos}
        />

        <SecondaryGroupList
          limit={1}
          multiple={false}
          dataSet={subcategoryList}
          secondaryList={secondaryList}
          onSelect={selectedSecondary => {
            setsecondaryList(selectedSecondary);
            navigation.navigate('CreateNewMemo', {
              secondaryList: selectedSecondary,
              SearchValue,
              primaryInfo: routePrimaryInfo,
            });
          }}
        />
      </Container>

      {/* <BottomView
        title={`Choose group that "${SearchValue.SearchValue}"  belongs too`}
      /> */}
      {/* <LinearGradient
        angle={0}
        useAngle={true}
        colors={[AppColors.white, AppColors.whiteop01, AppColors.Transparent]}
        style={{ position: 'absolute', ...GStyles.containView, bottom: 0, height: 50, width: '100%' }}> */}

      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export const BottomView = ({ title = 'Just another title' }) => {
  return (
    <View
      style={{
        borderTopColor: AppColors.DarkMode,
        borderTopWidth: 1,
        position: 'absolute',
        ...GStyles.containView,
        bottom: 0,
        height: 50,
        backgroundColor: AppColors.DarkBG,
        width: '100%',
      }}
    >
      <Text
        style={{
          color: AppColors.white3,
          fontFamily: AppFonts.CalibriRegular,
          fontSize: FontSize.medium,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
export const PrimaryGroupList = ({ dataSet, onCategorySelect = () => {} }) => {
  const [selected, setselected] = useState(0);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        marginRight: -Spacing.large,
      }}
    >
      {/* ADD PRIMARY BUTTON */}
      <View style={{ position: 'absolute', zIndex: 10, height: 50, width: 50 }}>
        <Ripple
          rippleContainerBorderRadius={10}
          onPress={() => {}}
          style={{ position: 'absolute', zIndex: 10 }}
        >
          <AddDarkIcon />
        </Ripple>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ flexDirection: 'row' }}
      >
        <HoriSpace size={Spacing.size40} />
        {dataSet.map((item, index) => {
          return (
            <View style={{ flexDirection: 'row' }} key={index.toString()}>
              {selected === index ? (
                <Ripple
                  onPress={() => onCategorySelect(item)}
                  rippleFades
                  style={{
                    ...GStyles.containView,
                    paddingHorizontal: Spacing.xlarge,
                    backgroundColor: AppColors.DarkGrey,
                    height: 40,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.CalibriBold,
                      fontSize: FontSize.xlarge,
                      color: AppColors.white,
                    }}
                  >
                    {item.name}
                  </Text>
                </Ripple>
              ) : (
                <Ripple
                  rippleFades
                  onPress={() => {
                    setselected(index);
                    onCategorySelect(item);
                  }}
                  style={{
                    ...GStyles.containView,
                    paddingHorizontal: Spacing.xlarge,
                    backgroundColor: AppColors.VeryLightGrey,
                    height: 40,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.CalibriBold,
                      fontSize: FontSize.xlarge,
                      color: AppColors.DarkGrey,
                    }}
                  >
                    {item.name}
                  </Text>
                </Ripple>
              )}
              <HoriSpace size={Spacing.short} />
            </View>
          );
        })}

        {/* <AddSecondaryGroup /> */}
      </ScrollView>
      {/* </ScrollView> */}
    </View>
  );
};
// MemosData
export const ChoiceGroup = ({ value = false }) => {
  // const [RadioValue, setRadioValue] = useState(value)
  return <View>{value ? <RadioButtonGreen /> : <RadioButtonOff />}</View>;
};
export const SecondaryGroupList = ({
  limit = -1,
  dataSet = [],
  onSelect = () => {},
  secondaryList = {},
  multiple = true,
  height = '75%',
  footerHeight = 0,
}) => {
  const renderItem = ({ item, index }) => {
    return (
      <View key={index.toString()}>
        <Ripple
          onPress={() => {
            if (multiple) {
              let SelectedData = { ...secondaryList };
              if (SelectedData[item.id]) {
                delete SelectedData[item.id];
              } else {
                if (limit >= 0) {
                  if (Object.values(SelectedData).length + 1 <= limit) {
                    SelectedData[item.id] = item;
                  } else {
                    showToast('Cannot select more than ' + limit);
                  }
                } else {
                  SelectedData[item.id] = item;
                }
              }
              onSelect(SelectedData);
            } else {
              const test = { id: item };
              item.id == test.id;

              test[item.id] = test['id'];
              delete test['id'];

              onSelect(test);
            }
          }}
          style={{
            width: AppDimens.width * 0.9,
            backgroundColor: AppColors.LightDark1,
            borderWidth: !secondaryList[item?.id] ? 0 : 0.5,
            borderColor: AppColors.disableColor,
            borderRadius: 15,
            height: hp(64),
            ...GStyles.flexRow,
            paddingLeft: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* <ChoiceGroup value={secondaryList[item?.id]} /> */}
            {/* <HoriSpace /> */}
            <Image
              style={{ width: 45, height: 45 }}
              resizeMode={'contain'}
              source={{ uri: item.icon == '' ? null : item.icon }}
            />
            <HoriSpace />
            <Text
              style={{
                fontSize: 25,
                fontFamily: AppFonts.CalibriBold,
                color: AppColors.white1,
              }}
            >
              {item.category_name}
            </Text>
          </View>
        </Ripple>
        <VertSpace size={Spacing.short} />
      </View>
    );
  };
  return (
    <View style={{ height: height }}>
      <FlatList
        data={dataSet}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<VertSpace size={footerHeight} />}
        renderItem={renderItem}
      />
    </View>
  );
};

const AddSecondaryGroup = ({ Category = { id: 0, name: 'All' } }) => {
  const [visible, setVisible] = React.useState(false);
  const secondaryGroupName = React.useRef('');

  const userData = useSelector(state => state.userAuth);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onSecondaryCreate = () => {
    const value = secondaryGroupName.current;
    if (value.length == 0 || value.length > 25) {
      showToast('Please enter name max 25');
    } else {
      const formdata = new FormData();
      formdata.append('token', userData.userToken);
      formdata.append('name', value);
      formdata.append('type', 'nothing');

      reqSecondaryFolderApiCall(formdata)
        .then(response => {
          hideModal();
          showToast(
            'We have got your request. Will try to address it as soon as possible',
            Gravities.BOTTOM,
          );
        })
        .catch(error => {
          showToast('Error while requesting', Gravities.BOTTOM);
        });
    }
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: AppColors.DarkBG,
            padding: 20,
            width: AppDimens.width * 0.7,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: AppColors.white,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxlarge,
              fontFamily: AppFonts.CalibriBold,
              color: AppColors.white,
            }}
          >
            Request to add a Secondary group
          </Text>
          <VertSpace />
          <TextInput
            style={{
              paddingHorizontal: Spacing.large,
              borderRadius: 20,
              height: 40,
              borderColor: AppColors.LightGrey,
              borderWidth: 1,
              color: AppColors.disableColor,
            }}
            placeholder="Enter name"
            onChangeText={value => (secondaryGroupName.current = value)}
          />

          <VertSpace />
          <View style={{ flexDirection: 'row', height: 50 }}>
            <View style={{ flex: 0.5, ...GStyles.containView }}>
              <ModalButtons
                ButtonIcon={() => null}
                onPress={hideModal}
                title={'Cancel'}
                color={AppColors.VeryLightGrey}
              />
            </View>
            <View style={{ flex: 0.5, ...GStyles.containView }}>
              <ModalButtons
                ButtonIcon={() => null}
                onPress={onSecondaryCreate}
                title={'Ok'}
                color={AppColors.VeryLightGrey}
              />
            </View>
          </View>
        </Modal>
      </Portal>

      <HoriSpace />
      <AccentButton
        title={'Add category'}
        disabled={false}
        onPress={showModal}
      />
      {/* <Ripple
        style={{
          height: 40,
          width: 40,
          backgroundColor: AppColors.DarkBG,
          ...GStyles.containView,
        }}
        onPress={showModal}
      >
        <AddIcon color={AppColors.white} size={FontSize.inputText} />
      </Ripple> */}
    </View>
  );
};

const Styles = StyleSheet.create({
  headerText: {
    fontFamily: AppFonts.CalibriBold,
    fontSize: 38,
    color: AppColors.DarkGrey,
  },
  headerTextDark: {
    fontFamily: AppFonts.CalibriBold,
    fontSize: 38,
    color: AppColors.white1,
  },
  containerStyle: { flexDirection: 'column', marginTop: 20 },
});
