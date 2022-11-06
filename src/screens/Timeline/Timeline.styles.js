import { StyleSheet } from 'react-native';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { AppDimens, FontSize, GStyles } from '../../shared/Global.styles';

export const Styles = StyleSheet.create({
  nameStyle: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey,
    fontSize: FontSize.xlarge,
  },
  dateStyle: {
    fontFamily: AppFonts.CalibriRegular,
    color: AppColors.MediumGrey,
    fontSize: FontSize.short,
  },
  timelineLightStyle: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  timelineDarkStyle: {
    backgroundColor: AppColors.DarkBG,
    flex: 1,
  },
  SeeAllLight: {
    width: 60,
    borderWidth: 1,
    borderColor: AppColors.white1,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    ...GStyles.containView,
  },
  SeeAllLDark: {
    width: 60,
    borderWidth: 1,
    borderColor: '#ffffff30',
    height: 25,
    backgroundColor: AppColors.DarkBG,
    borderRadius: 20,
    ...GStyles.containView,
  },
  horizontalLight: {
    width: AppDimens.width - 50,
    height: 1,
    backgroundColor: AppColors.white1,
  },
  horizontalDark: {
    width: AppDimens.width - 50,
    height: 1,
    backgroundColor: '#ffffff30',
  },
  SeeAllLDarkText: {
    fontSize: FontSize.short,
    fontFamily: AppFonts.CalibriRegular,
    color: '#CCCCCC',
  },
  SeeAllLightText: {
    fontSize: FontSize.short,
    fontFamily: AppFonts.CalibriRegular,
    color: AppColors.DarkGrey,
  },
});
