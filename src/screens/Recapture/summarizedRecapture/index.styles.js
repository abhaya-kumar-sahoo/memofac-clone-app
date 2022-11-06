import { AppColors } from 'assets/AppColors';
import { StyleSheet } from 'react-native';
import { wp } from 'shared/dimens';
import { AppDimens } from 'shared/Global.styles';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: '#00000022',
    flex: 1,
    marginTop: -100,
  },
  modalView: {
    backgroundColor: AppColors.white,
    width: AppDimens.width * 1.01,
    zIndex: 999,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    // borderWidth: 0.5,
    borderBottomColor: AppColors.white,
    borderTopColor: AppColors.white,
    borderColor: AppColors.white,
  },

  modalViewDark: {
    backgroundColor: AppColors.DarkBG,
    width: AppDimens.width * 1.01,
    zIndex: 999,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderBottomColor: AppColors.white,
    borderTopColor: AppColors.DarkGrey,
    borderColor: AppColors.DarkGrey,
  },

  LoaderModalView: {
    backgroundColor: AppColors.white,
    // width: wp(300),
    paddingVertical: 15,
    paddingHorizontal: 50,
    position: 'absolute',
    zIndex: 999,
    borderRadius: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    // padding: 30,
  },

  headerView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  formContainer: {
    paddingTop: 16,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  backdropModal: {
    // backgroundColor: '#00aa1133',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
