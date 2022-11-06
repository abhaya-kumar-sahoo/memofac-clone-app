import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useDispatch, useSelector } from 'react-redux';
import { AppColors } from '../../../assets/AppColors';
import { AppFonts } from '../../../assets/fonts/AppFonts';
import { ModalHeader } from '../../../components/AppHeader';
import { NextButton } from '../../../components/Mini';
import { GetSubCategoryAction } from '../../../redux/reducers/Memos/Subcategory.reducer';
import {
  AppDimens,
  FontSize,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';
const { Portal, Modal } = require('react-native-paper');

export const PrimaryFolderModal = ({
  onSubmitPress = () => {},
  ButtonComponent = () => {
    return null;
  },
}) => {
  const [visible, setVisible] = React.useState(false);
  const { MainCategoryRedux, userAuth } = useSelector(state => state);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const dispatch = useDispatch();

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            paddingTop: 5,
            width: AppDimens.width * 0.8,
            borderRadius: 30,
          }}
        >
          <View style={{}}>
            {/* <VertSpace size={Spacing.large} /> */}
            <ModalHeader enableBack onBackPress={() => hideModal()}>
              <NextButton title={''} disabled={true} />
            </ModalHeader>

            {MainCategoryRedux && (
              <PrimaryGroupList
                ListData={MainCategoryRedux.MaincategoryList}
                onPress={indexSelected => {
                  dispatch(
                    GetSubCategoryAction(
                      userAuth.userToken,
                      MainCategoryRedux.MaincategoryList[indexSelected].id,
                    ),
                  );
                  onSubmitPress(
                    MainCategoryRedux.MaincategoryList[indexSelected],
                  );

                  hideModal();
                }}
              />
            )}
            <VertSpace />
          </View>
        </Modal>
      </Portal>

      <Ripple
        onPress={showModal}
        rippleContainerBorderRadius={20}
        style={{
          backgroundColor: AppColors.white,
        }}
      >
        <ButtonComponent />
      </Ripple>
    </View>
  );
};

export const PrimaryGroupList = ({ onPress = () => {}, ListData = [] }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ maxHeight: AppDimens.height * 0.6, padding: 10 }}
    >
      {ListData.map((item, index) => {
        // var SecondaryList = item.secondaryList
        //   .map(function (folder) {
        //     return folder.name;
        //   })
        //   .join(',');

        return (
          <TouchableOpacity onPress={() => onPress(index)}>
            <Text style={styles.primaryNames}>{item.name}</Text>

            {/* <Text numberOfLines={1} style={styles.secondaryNames}>
              {SecondaryList}
            </Text> */}

            <VertSpace size={Spacing.xxlarge} />
          </TouchableOpacity>
        );
      })}

      <VertSpace />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  foldercontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  primaryNames: {
    lineHeight: FontSize.inputText,
    fontSize: FontSize.inputText,
    color: AppColors.MediumGrey,
    fontFamily: AppFonts.CalibriBold,
  },
  secondaryNames: {
    // width: '60%',
    fontSize: FontSize.medium,
    color: AppColors.LightGrey,
    fontFamily: AppFonts.CalibriBold,
  },
});
