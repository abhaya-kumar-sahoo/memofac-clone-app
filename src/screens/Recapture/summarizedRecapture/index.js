import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import { AppButton, AppButtonFlex } from 'components/AppButton';
import { ModalHeader } from 'components/AppHeader';
import { FormFillContainer } from 'components/FormContainer/FormFillContainer';
import { InputText } from 'components/FormContainer/InputText/InputText';
import { AccentButton } from 'components/Mini';
import { ToastLoader } from 'components/ToastLoader';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable } from 'react-native';
import { Button, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateRecomMemosAction } from 'redux/reducers/Memos/RecomMemos.reducer';
import { setNotesRecapture } from 'redux/reducers/Modal/SumRecaptcure';
import {
  GetUserDetailsAction,
  UpdateUserDetailsAction,
} from 'redux/reducers/UserProfile/userprofile.reducer';
import { MemoDetailsApi, RateMemos } from 'redux/sagas/Memos/request';
import { wp } from 'shared/dimens';
import { Gravities, showToast } from 'shared/Functions/ToastFunctions';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  VertSpace,
} from 'shared/Global.styles';
import { GalleryIcon, NotesIcon, ShareIcon } from 'shared/Icon.Comp';
import { MemoRateView } from '../Components/MemoRateView';
import { MoreButton } from '../Components/SumRecapture';
import { styles } from './index.styles';
const { Portal, Modal } = require('react-native-paper');

/**
 * visible: determines whether the modal will be visible at that point or not.
 * onExitModal:
 */

const SummarizedRecapture = ({
  navigation,
  visible,
  onExitModal,
  memoForRating,
  onSaveRating = () => {},
  userToken,
  onSuccessRating = () => null,
  memoListIndex = null,
}) => {
  const memoData = { ...memoForRating };
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const isCancel = React.useRef(true);
  const rateGiven = useRef(-1);
  const dispatch = useDispatch();

  const [SelectButtonGroupId, setSelectButtonGroupId] = React.useState(3);

  const setRatingGiven = index => {
    // setRatingGiven
    rateGiven.current = index;
    onSaveRating(index);
  };
  React.useEffect(() => {
    if (
      memoForRating.me_share_with !== null &&
      memoForRating.me_share_with !== undefined
    ) {
      setSelectButtonGroupId(parseInt(memoForRating.me_share_with));
    } else {
      setSelectButtonGroupId(3);
    }

    return () => {
      isCancel.current = true;
    };
  }, [memoForRating.me_share_with]);

  const onMemoRate = async () => {
    onSuccessRating();
    setDisable(true);
    let rateNum = parseInt(rateGiven.current) + 1;
    let rateNum2 = parseInt(memoData.me);
    let finalRate = rateNum > 0 ? rateNum : rateNum2;
    await RateMemos(
      userToken,
      memoData.id,
      finalRate,
      parseInt(SelectButtonGroupId),
    )
      .then(res => {
        if (res.result === 'success') {
          dispatch(UpdateUserDetailsAction(res.content));

          if (memoListIndex !== null) {
            dispatch(UpdateRecomMemosAction(finalRate, memoListIndex));
          }

          showToast('You have rated it', Gravities.BOTTOM);
        }
      })
      .catch(err => {
        showToast('rate again');
        console.log('error', err);
      });
  };

  return (
    <>
      <Portal>
        <Modal
          dismissable={false}
          visible={visible}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <>
            <View style={[styles.modalViewDark]}>
              <View style={[styles.headerView, { paddingHorizontal: -20 }]}>
                <ModalHeader enableBack onBackPress={onExitModal}>
                  {loading ? (
                    <View
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,

                        borderRadius: 30,
                      }}
                    >
                      <ActivityIndicator color={AppColors.MediumGrey} />
                    </View>
                  ) : (
                    <AccentButton disabled={disable} onPress={onMemoRate} />
                  )}
                </ModalHeader>
              </View>

              <MemoRateView
                showImage={false}
                removable={false}
                // defaultRate={5}
                ratingGiven={memoData.me == 0 ? -1 : memoData.me - 1}
                imageUrl={memoData.image || null}
                memoName={memoData.title || ''}
                RateStarSize={30}
                titleSpacing={20}
                onRateCallback={setRatingGiven}
                paddingHorizontal={15}
                memoDesc={memoData.description}
                descriptionPadding={20}
                memoNameWidth={wp(310)}
              />

              <View style={styles.formContainer}>
                <Text
                  style={{
                    fontSize: 18,
                    color: AppColors.MediumGrey,
                    fontFamily: AppFonts.CalibriRegular,
                  }}
                >
                  Share with ...
                </Text>
                <VertSpace />
                <AppButtonFlex
                  titleFontSize={15}
                  paddingHorizontal={20}
                  paddingVertical={6}
                  unSelectedBackgroundColor={AppColors.LowDark2}
                  onPress={i => setSelectButtonGroupId(i)}
                  style={{
                    justifyContent: 'flex-start',
                    marginHorizontal: -15,
                  }}
                  spaceBetween={5}
                />

                <VertSpace size={40} />
                <Ripple
                  onPress={() => {
                    const summarizedRecaptureProps = {
                      shareWithGroup: SelectButtonGroupId,
                      memoData: { ...memoData },
                      Addedrate: rateGiven.current,
                    };
                    onExitModal();
                    navigation.navigate('RecaptureActivity', {
                      summarizedRecaptureProps,
                    });
                  }}
                  style={{
                    ...GStyles.flexRow,
                    alignItems: 'center',
                    marginHorizontal: -10,
                  }}
                >
                  {/* <GalleryIcon size={26} /> */}
                  <Text
                    style={{
                      color: AppColors.white1,
                      fontFamily: AppFonts.CalibriBold,
                      fontSize: 18,
                    }}
                  >
                    Add photos and notes
                  </Text>
                </Ripple>
                <View>
                  <VertSpace />
                </View>
              </View>
            </View>

            <Pressable onPress={onExitModal} style={styles.backdropModal} />
          </>
        </Modal>
      </Portal>
    </>
  );
};

export { SummarizedRecapture };
