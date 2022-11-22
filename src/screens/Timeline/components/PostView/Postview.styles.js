import {StyleSheet} from 'react-native';
import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {FontSize} from 'shared/Global.styles';

export const Styles = StyleSheet.create({
  nameStyle: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey,
    fontSize: FontSize.xlarge,
  },
  nameStyleDark: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.white3,
    fontSize: FontSize.xlarge,
  },
  dateStyle: {
    fontFamily: AppFonts.CalibriRegular,
    color: AppColors.disableColor,
    fontSize: FontSize.short,
  },
  dateStyleDark: {
    fontFamily: AppFonts.CalibriRegular,
    color: '#9A9A9A',
    fontSize: FontSize.short,
  },
});
