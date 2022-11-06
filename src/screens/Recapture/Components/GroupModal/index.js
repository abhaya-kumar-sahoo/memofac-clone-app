import React from 'react';
import Ripple from 'react-native-material-ripple';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { CancelIcon } from 'shared/Icon.Comp';
import { ChoiceGroup } from '../../../Memos/SavetoCollection';
import { ModalButtons } from 'screens/Timeline/components/MenuOption';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
  WhiteFadeView,
} from 'shared/Global.styles';
import { AppColors } from 'assets/AppColors';
import { ModalHeader } from 'components/AppHeader';
import { NextButton } from 'components/Mini';
import { AppFonts } from 'assets/fonts/AppFonts';
import { AppButton } from 'components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { AddDarkIcon } from 'shared/Icon.Comp';
import {
  createPrimaryFolderApiCall,
  createSecondaryFolderApiCall,
} from 'redux/sagas/Collection/request';
import { Gravities, showToast } from 'shared/Functions/ToastFunctions';
import { GetCollectionAction } from 'redux/reducers/Collection/CollectionFolder.reducer';
const samplData = [{ id: 0, name: '', secondary: [{ name: '', id: 0 }] }];

// Folder UI
export const FolderList = ({
  data = [...samplData],
  onSelect = () => {},
  onSecondaryAdd = () => {},
}) => {
  const [selectedData, setselectedData] = React.useState({});
  return (
    <ScrollView
      persistentScrollbar={true}
      style={{
        padding: 20,
        minHeight: AppDimens.height * 0.35,
        maxHeight: AppDimens.height * 0.4,
      }}
    >
      {data.map((item, index) => {
        var SecondaryNames = item.secondary
          .map(function (folder) {
            return folder.name;
          })
          .join(',');

        return (
          <>
            <Ripple
              onPress={() => {
                let dataSelected = { ...selectedData };
                if (dataSelected[item.id]) {
                  delete dataSelected[item.id];
                } else {
                  dataSelected[item.id] = {
                    id: item.id,
                    name: item.name,
                    secondary: [],
                  };
                }
                setselectedData(dataSelected);
                onSelect(dataSelected);
              }}
              key={index.toString()}
              style={styles.foldercontainer}
            >
              <View>
                <ChoiceGroup value={selectedData[item.id]} />
              </View>
              <HoriSpace />
              <View>
                <Text style={styles.primaryNames}>{item.name}</Text>
                {!selectedData[item.id] && (
                  <>
                    {SecondaryNames !== '' && (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={{
                          ...styles.secondaryNames,
                          // backgroundColor: 'wheat',
                          width: '100%',
                        }}
                      >
                        {SecondaryNames}
                      </Text>
                    )}
                  </>
                )}
              </View>
            </Ripple>

            <View>
              {selectedData[item.id] && <VertSpace size={15} />}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                // style={{ marginHorizontal: -Spacing.xxlarge }}
                horizontal={true}
              >
                {selectedData[item.id] && (
                  <Ripple
                    rippleContainerBorderRadius={10}
                    onPress={() => {
                      onSecondaryAdd(item.secondary, item.id);
                    }}
                    style={{}}
                  >
                    <AddDarkIcon />
                  </Ripple>
                )}

                <HoriSpace size={Spacing.large} />
                {selectedData[item.id] &&
                  item.secondary.map((dataObj, _) => {
                    return (
                      <View style={{ flexDirection: 'row' }} key={dataObj.id}>
                        <Ripple
                          onPress={() => {
                            let selectedSecondaries = [
                              ...selectedData[item.id]['secondary'],
                            ];

                            let findSecond = selectedSecondaries.filter(
                              item => item.id == dataObj.id,
                            );
                            if (findSecond.length !== 0) {
                              let removeSecondary = selectedSecondaries.filter(
                                item => item.id !== dataObj.id,
                              );
                              let dataSelected = { ...selectedData };
                              dataSelected[item.id][
                                'secondary'
                              ] = removeSecondary;

                              setselectedData(dataSelected);
                              onSelect(dataSelected);
                            } else {
                              selectedSecondaries.push(dataObj);
                              let dataSelected = { ...selectedData };
                              dataSelected[item.id][
                                'secondary'
                              ] = selectedSecondaries;

                              setselectedData(dataSelected);
                              onSelect(dataSelected);
                            }
                          }}
                          style={{
                            borderRadius: 30,
                            backgroundColor:
                              // selectedData[item.id]['secondary'] == dataObj.id
                              isSecondarySelected(
                                selectedData[item.id]['secondary'],
                                dataObj.id,
                              )
                                ? AppColors.DarkGrey
                                : AppColors.LightGrey,
                            height: 40,
                            ...GStyles.containView,
                            paddingHorizontal: 16,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: AppFonts.CalibriBold,
                              color: isSecondarySelected(
                                selectedData[item.id]['secondary'],
                                dataObj.id,
                              )
                                ? AppColors.white
                                : AppColors.DarkGrey,
                              fontSize: 20,
                            }}
                          >
                            {dataObj.name}
                          </Text>
                        </Ripple>
                        <HoriSpace size={10} />
                      </View>
                    );
                  })}
              </ScrollView>
              {selectedData[item.id] && <VertSpace size={30} />}
            </View>

            <VertSpace size={30} />
          </>
        );
      })}
    </ScrollView>
  );
};

const isSecondarySelected = (data = [], id) => {
  let dataFound = data.filter(item => item.id === id);
  return dataFound.length > 0;
};

export const GroupSaveModal = ({
  onSelect = () => {},
  visible,
  onDismiss = () => {},
  onDone = () => {},
}) => {
  const [secondaryname, setsecondaryname] = React.useState('');
  const [addingSecondary, setaddingSecondary] = React.useState(false);
  const [selectedID_primary, setselectedID_primary] = React.useState(0);
  const [dataBase, setdataBase] = React.useState({});
  const userToken = useSelector(state => state.userAuth.userToken);
  const dispatch = useDispatch();
  const [
    secondaryModalVisibility,
    setsecondaryModalVisibility,
  ] = React.useState(false);
  const { CollectionFolderRedux } = useSelector(state => state);

  let primFolder = [];
  primFolder = CollectionFolderRedux.collectionFolders.filter(
    primaryFolder => primaryFolder.id === selectedID_primary,
  );
  let secondarFolder = primFolder[0]?.secondary.filter(
    secondary => secondary.name == secondaryname,
  );

  // .filter((secondary) => secondary.name === secondaryname);

  const createSecondaryFolder = () => {
    if (secondaryname === '' || secondaryname.length > 25)
      showToast('Please enter name max upto 25 characters', Gravities.BOTTOM);
    else if (secondarFolder.length !== 0)
      showToast('Secondary folder already exists', Gravities.BOTTOM);
    else {
      setaddingSecondary(true);

      createSecondaryFolderApiCall(userToken, secondaryname, selectedID_primary)
        .then(response => {
          dispatch(GetCollectionAction(userToken));

          setaddingSecondary(false);
          setsecondaryname('');
          setsecondaryModalVisibility(false);

          showToast('Secondary group created', Gravities.BOTTOM);
        })
        .catch(error => {
          setaddingSecondary(false);
          setsecondaryname('');
          showToast(
            'Problem while creating Secondary folder',
            Gravities.BOTTOM,
          );
        });
    }
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            width: AppDimens.width * 0.8,
            borderRadius: 30,
          }}
        >
          <View style={{}}>
            <ModalHeader enableBack onBackPress={onDismiss}>
              <NextButton
                title={'Done'}
                disabled={false}
                onPress={() => {
                  onDismiss();
                  onDone(dataBase);
                }}
              />
            </ModalHeader>

            {/* FOLDERS */}
            {/* {Foldernames} */}
            <View>
              <WhiteFadeView
                reverse
                style={{ position: 'absolute', width: '100%', zIndex: 20 }}
              >
                <VertSpace size={20} />
              </WhiteFadeView>
            </View>
            <FolderList
              onSelect={data => {
                onSelect(data);
                setdataBase(data);
              }}
              onSecondaryAdd={(secondaryList, primaryId) => {
                setsecondaryModalVisibility(true);
                setselectedID_primary(primaryId);
              }}
              data={CollectionFolderRedux.collectionFolders}
            />

            {/* ADD PRIMARY FOLDER */}
            <AddPrimaryFolder />
          </View>
        </Modal>

        <Modal
          visible={secondaryModalVisibility}
          onDismiss={() => setsecondaryModalVisibility(false)}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            width: AppDimens.width * 0.7,
            borderRadius: 30,
          }}
        >
          <View style={{ padding: Spacing.xlarge }}>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: FontSize.inputText,
                fontFamily: AppFonts.CalibriBold,
                color: AppColors.MediumGrey,
              }}
            >
              New Secondary folder
            </Text>
            <VertSpace size={Spacing.xlarge} />
            <TextInput
              style={{
                borderRadius: 40,
                borderWidth: 1,
                borderColor: AppColors.MediumGrey,
                paddingHorizontal: Spacing.large,
                color: AppColors.disableColor,
              }}
              value={secondaryname}
              onChangeText={name => setsecondaryname(name)}
            />
            <VertSpace size={Spacing.xlarge} />
            {addingSecondary ? (
              <View>
                <ActivityIndicator color={AppColors.MediumGrey} />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: Spacing.xlarge,
                }}
              >
                <ModalButtons
                  IconVisible={false}
                  width={'100%'}
                  modalStyle={{ justifyContent: 'flex-start' }}
                  title={'Cancel'}
                  onPress={() => {
                    setsecondaryModalVisibility(false);
                    // navigation.goBack();
                  }}
                />
                <ModalButtons
                  IconVisible={false}
                  width={'100%'}
                  modalStyle={{ justifyContent: 'flex-start' }}
                  title={'OK '}
                  ButtonIcon={() => <CancelIcon size={FontSize.large} />}
                  onPress={createSecondaryFolder}
                />
              </View>
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export const AddPrimaryFolder = ({}) => {
  const [visible, setvisible] = React.useState(false);
  const [primaryname, setPrimaryname] = React.useState('');
  const [addingPrimary, setaddingPrimary] = React.useState(false);
  const userToken = useSelector(state => state.userAuth.userToken);
  const { CollectionFolderRedux } = useSelector(state => state);
  const dispatch = useDispatch();
  const onClose = () => setvisible(false);
  const onOpen = () => setvisible(true);

  const checkPrimarNameexist = CollectionFolderRedux.collectionFolders.filter(
    primaryFolder => primaryFolder.name === primaryname,
  );

  const createPrimaryFolder = () => {
    if (primaryname === '' || primaryname.length > 25)
      showToast('Please enter name upto 25 characters', Gravities.BOTTOM);
    else if (checkPrimarNameexist.length !== 0)
      showToast('Primary folder already exists', Gravities.BOTTOM);
    else {
      setaddingPrimary(true);
      createPrimaryFolderApiCall(userToken, primaryname)
        .then(response => {
          dispatch(GetCollectionAction(userToken));
          setaddingPrimary(false);
          setPrimaryname('');
          onClose();

          showToast('Primary group created', Gravities.BOTTOM);
        })
        .catch(error => {
          setaddingPrimary(false);
          setPrimaryname('');
          showToast('Problem while creating primary folder', Gravities.BOTTOM);
        });
    }
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onClose}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            width: AppDimens.width * 0.7,
            borderRadius: 30,
          }}
        >
          <View style={{ padding: Spacing.xlarge }}>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: FontSize.inputText,
                fontFamily: AppFonts.CalibriBold,
                color: AppColors.MediumGrey,
              }}
            >
              New primary folder
            </Text>
            <VertSpace size={Spacing.xlarge} />
            <TextInput
              style={{
                borderRadius: 40,
                borderWidth: 1,
                borderColor: AppColors.MediumGrey,
                paddingHorizontal: Spacing.large,
                color: AppColors.disableColor,
              }}
              value={primaryname}
              onChangeText={name => setPrimaryname(name)}
            />
            <VertSpace size={Spacing.xlarge} />

            {addingPrimary ? (
              <View>
                <ActivityIndicator color={AppColors.MediumGrey} />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: Spacing.xlarge,
                }}
              >
                <ModalButtons
                  IconVisible={false}
                  width={'100%'}
                  modalStyle={{ justifyContent: 'flex-start' }}
                  title={'Cancel'}
                  onPress={() => {
                    onClose();
                    // navigation.goBack();
                  }}
                />
                <ModalButtons
                  IconVisible={false}
                  width={'100%'}
                  modalStyle={{ justifyContent: 'flex-start' }}
                  title={'OK '}
                  ButtonIcon={() => <CancelIcon size={FontSize.large} />}
                  onPress={createPrimaryFolder}
                />
              </View>
            )}
          </View>
        </Modal>
      </Portal>

      <View
        style={{
          borderTopColor: AppColors.VeryLightGrey,
          borderWidth: 0,
          borderTopWidth: 1,
        }}
      >
        <View style={{ padding: 20, paddingHorizontal: 60 }}>
          <AppButton
            outlined
            onPress={onOpen}
            borderColor={AppColors.LightGrey}
            backgroundColor={AppColors.Transparent}
            width={'100%'}
            height={40}
            titleFontSize={FontSize.large}
            titleColor={AppColors.MediumGrey}
            title="Add Primary group"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  foldercontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    minHeight: 30,
  },
  primaryNames: {
    lineHeight: FontSize.inputText,
    fontSize: FontSize.inputText,
    color: AppColors.MediumGrey,
    fontFamily: AppFonts.CalibriBold,
  },
  secondaryNames: {
    width: '60%',
    fontSize: FontSize.short,
    color: AppColors.LightGrey,
    fontFamily: AppFonts.CalibriRegular,
  },
});
