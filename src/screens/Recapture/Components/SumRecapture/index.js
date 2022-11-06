import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppColors } from '../../../../assets/AppColors';
import { ModalHeader } from '../../../../components/AppHeader';
import { AccentButton } from '../../../../components/Mini';
import {
  SetMemoVisibility,
  setRecaptureFormDefault,
  setRecaptureMemoRating,
} from '../../../../redux/reducers/Modal/SumRecaptcure';
import { AppDimens, FontSize, GStyles, VertSpace } from 'shared/Global.styles';
import { MemoRateView } from '../MemoRateView';
import { ShareIcon } from 'shared/Icon.Comp';
import { RateMemos } from '../../../../redux/sagas/Memos/request';
import { FormFillContainer } from 'components/FormContainer/FormFillContainer';
import Ripple from 'react-native-material-ripple';
import { AppFonts } from 'assets/fonts/AppFonts';
import { showToast } from 'shared/Functions/ToastFunctions';
import { updateExperience } from 'redux/reducers/Memos/RecomMemos.reducer';
import { PersistType } from 'redux/constants.redux';
import { useNavigation } from '@react-navigation/native';
const { Portal, Modal } = require('react-native-paper');

const memoData = { id: -1, category_id: '', title: '', image: null };
const groupSelected = { key: 1, text: 'All' };

export const SumRecapture = ({}) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { userAuth, UserDetailsReducer } = useSelector(state => state);
  const { userToken } = { ...userAuth };
  const {
    visible = false,
    memoData = { ...memoData },
    ratingGiven,
    groupSelected,
    actionInfo,
  } = useSelector(state => state.MemoVisibilityReducer);
  const { id } = { ...memoData };
  const closeModal = PersistType =>
    dispatch(SetMemoVisibility(false, memoData, PersistType));
  const defaultGroup = `Public`;

  const UpdateRating = ratingGiven => {
    dispatch(setRecaptureMemoRating({ ratingGiven }));
  };
  const clearFormValues = () => {
    dispatch(setRecaptureFormDefault());
  };
  const updateRecommendedMemosExp = () => {
    dispatch(updateExperience({ memo: memoData }));
  };

  const groupReduxSelect = `${groupSelected.name} (${groupSelected.count})`;
  return (
    <View>
      <Portal>
        <Modal
          dismissable={false}
          visible={visible}
          onDismiss={() => {
            clearFormValues();
            closeModal(PersistType.DATA_PERSIST);
          }}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            width: AppDimens.width * 0.85,
            borderRadius: 30,
          }}
        >
          <View style={{ marginHorizontal: -20 }}>
            <ModalHeader
              enableBack
              onBackPress={() => {
                clearFormValues();
                closeModal();
              }}
            >
              <AccentButton
                onPress={() => {
                  closeModal();
                  if (actionInfo.type !== null) dispatch(actionInfo);
                  updateRecommendedMemosExp();
                  // console.log(
                  //   'RATE GOING ON SERVER',
                  //   parseInt(ratingGiven) + 1,
                  // );
                  RateMemos(
                    userAuth.userToken,
                    memoData.id,
                    parseInt(ratingGiven) + 1, // rateIndex + 1 gives proper data
                    parseInt(groupSelected.id),
                  )
                    .then(response => {
                      clearFormValues();
                      showToast('You rated this memo');
                    })
                    .catch(error => {
                      showToast('Something went wrong while rating this memo');
                    });
                }}
              />
            </ModalHeader>
          </View>
          {memoData && (
            <MemoRateView
              showImage={false}
              removable={false}
              ratingGiven={ratingGiven}
              imageUrl={memoData.image || null}
              memoName={memoData.title || ''}
              RateStarSize={30}
              onRateCallback={index => {
                UpdateRating(index);
              }}
            />
          )}

          <VertSpace size={10} />
          {/* SHARE */}
          <FormFillContainer
            LeftComponent={<ShareIcon size={20} />}
            title={'Share with ...'}
            placeholder={
              groupSelected.id != 3 ? groupReduxSelect : defaultGroup
            }
            iconStyles={{ marginLeft: -20 }}
            onRightButtonPress={() => {
              closeModal(PersistType.DATA_PERSIST);
            }}
          />
          <VertSpace size={10} />

          <MoreButton
            onPress={() => {
              closeModal(PersistType.DATA_PERSIST);
              navigate('RecaptureActivity');
            }}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export const MoreButton = ({ onPress = () => {} }) => {
  return (
    <Ripple
      rippleContainerBorderRadius={20}
      style={{
        height: 40,
        marginBottom: -10,
        width: '100%',
        ...GStyles.containView,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: FontSize.large,
          color: AppColors.blue,
          fontFamily: AppFonts.CalibriBold,
        }}
      >
        ...more
      </Text>
    </Ripple>
  );
};
