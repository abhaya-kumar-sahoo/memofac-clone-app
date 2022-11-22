/* eslint-disable react-native/no-inline-styles */
import {StackActions, useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Image, ScrollView, View, SafeAreaView, Text} from 'react-native';
import {AppColors} from '../../assets/AppColors';
import {AppHeader} from '../../components/AppHeader';
import {FormFillInput} from '../../components/FormContainer/FormFillInput';
import {AccentButton, Container} from '../../components/Mini';
import {
  AppDimens,
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import {addMemoApiCall} from 'redux/sagas/Memos/request';
import {useSelector} from 'react-redux';
import {showToast} from 'shared/Functions/ToastFunctions';
import {AppFonts} from 'assets/fonts/AppFonts';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';

const secondaryFolder = {
  category_name: '',
  icon: null,
  id: -1,
  type: '',
};

export const CreateNewMemo = ({route}) => {
  const [secondaryList, setSecondaryList] = React.useState({});
  const [FolderSelected, setFolderSelected] = React.useState({
    ...secondaryFolder,
  });
  const {navigate} = useNavigation();
  const [MemoName, setMemoName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [info, setinfo] = useState('');
  const AppNavigation = useNavigation();
  const userToken = useSelector(state => state.userAuth.userToken);

  const savedInText = Object.values(secondaryList).reduce(function (
    prevVal,
    currVal,
    idx,
  ) {
    return idx == 0
      ? currVal.category_name
      : prevVal + ', ' + currVal.category_name;
  },
  '');

  React.useEffect(() => {
    if (route.params.secondaryList) {
      setSecondaryList(route.params.secondaryList);
      setFolderSelected(Object.values(route.params.secondaryList)[0]);
    }
  }, [route.params.secondaryList]);

  React.useEffect(() => {
    if (route.params.SearchValue) {
      // setSecondaryList(route.params.SearchValue);
      // setFolderSelected(Object.values(route.params.secondaryList)[0]);

      setMemoName(route.params.SearchValue.SearchValue);
    }
  }, [route.params.SearchValue]);

  const createNewMemo = () => {
    setLoading(true);
    var sentence = Object.values(route.params.secondaryList).reduce(function (
      previous,
      current,
      index,
    ) {
      return previous + current.id + (index !== 2 ? ',' : '');
    },
    '');

    if (MemoName.length == 0 || MemoName.length > 1000) {
      showToast('Please enter name max 1000');
    } else {
      addMemoApiCall(userToken, MemoName, info, sentence, FolderSelected.id)
        .then(Response => {
          // console.log('Response from create memo', Response);
          if (Response.result === 'failure') {
            showToast("Can't add. The requested memo already exist");
          } else {
            setLoading(false);
            showToast(MemoName + ' had been added');
            AppNavigation.dispatch(StackActions.pop(2));
          }
        })
        .catch(error => {
          console.log('error from create memo', error);
        })
        .finally(() => setLoading(false));
    }
  };

  React.useEffect(() => {
    if (route.params.primaryInfo) {
      setinfo(route.params.primaryInfo);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader
        enableBack
        preventDefault
        onBackPress={() => {
          navigate('SavetoCollection', {primaryInfo: info});
        }}>
        <AccentButton title={'Add'} onPress={() => createNewMemo()} />
      </AppHeader>
      <ScreenLoader loading={loading} message="Creating memo ..." />
      <ScrollView>
        <View style={{height: AppDimens.height * 0.85}}>
          <Container>
            <View style={{alignItems: 'center'}}>
              {FolderSelected && FolderSelected.id !== -1 && (
                <Image
                  resizeMethod={'resize'}
                  resizeMode={'contain'}
                  style={{
                    width: AppDimens.width * 0.4,
                    height: AppDimens.width * 0.4,
                  }}
                  source={{uri: FolderSelected.icon}}
                />
              )}

              {/* <ScrollView
              style={{
                marginVertical: 40,
                height: 50,
              }}
              keyboardShouldPersistTaps={'always'}
              horizontal
            >
              {Object.values(secondaryList).map((folder, index) => {
                return (
                  <View key={index.toString()}>
                    <View>
                      <Ripple
                        style={{
                          height: 50,
                          width: 50,
                          zIndex: 20,
                          ...GStyles.containView,
                        }}
                        onPress={() => {
                          setFolderSelected(folder);
                        }}
                      >
                        <Image
                          resizeMethod={'resize'}
                          resizeMode={'contain'}
                          style={{
                            width: 30,
                            height: 30,
                            marginBottom: 10,
                          }}
                          source={{ uri: folder.icon }}
                        />
                      </Ripple>
                      <View
                        style={{
                          position: 'absolute',
                          width: 50,
                          height: 3,
                          bottom: 0,
                          zIndex: 100,
                          backgroundColor:
                            FolderSelected.id == folder.id
                              ? AppColors.MediumGrey
                              : AppColors.VeryLightGrey,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        height: 15,
                        width: 2,
                        backgroundColor: AppColors.LightGrey,
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView> */}
              <VertSpace size={30} />
              <FormFillInput
                // autoFocus={true}
                multiline
                title={'Name'}
                placeholder={'Memo name'}
                titleFontSize={FontSize.large}
                textFieldSize={FontSize.x4large}
                FontFamily={AppFonts.Chaparral}
                value={MemoName}
                onChangeText={setMemoName}
                LeftComponent={null}
                RightComponent={<View />}
              />

              {/* <VertSpace size={Spacing.size40} /> */}

              {/* <FormFillInput
              editable={false}
              title={'Saved in'}
              multiline={true}
              value={savedInText}
              placeholder={'Enter primary'}
              onRightButtonPress={() => {
                navigate('SavetoCollection', { primaryInfo: info });
              }}
              titleFontSize={FontSize.large}
              textFieldSize={FontSize.large}
              LeftComponent={null}
            /> */}

              <VertSpace size={Spacing.large} />

              <FormFillInput
                RightComponent={<View />}
                editable={true}
                title={'Primary information'}
                multiline={true}
                value={info}
                placeholder={'Add year/address (city, country)'}
                titleFontSize={FontSize.large}
                textFieldSize={FontSize.xxlarge}
                FontFamily={AppFonts.Chaparral}
                LeftComponent={null}
                onChangeText={value => setinfo(value)}
                placeholderTextColor={AppColors.LowDark2}
              />
            </View>

            {/* <VertSpace size={200} /> */}
          </Container>

          <Text
            style={{
              color: AppColors.logoColour_1,
              fontSize: 14,
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
            }}>
            Please add year or address if any, so that others clearly understand
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
