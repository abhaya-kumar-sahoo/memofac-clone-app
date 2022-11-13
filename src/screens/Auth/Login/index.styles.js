import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {StyleSheet} from 'react-native';
import {wp} from 'shared/dimens';
import {AppDimens, FontSize} from 'shared/Global.styles';

export const styles = StyleSheet.create({
  countrySelectContainer: {
    backgroundColor: 'white',
    width: AppDimens.width * 0.8,
    borderRadius: 30,
  },
  countrySelectText: {
    fontFamily: AppFonts.CalibriRegular,
    color: AppColors.DarkGrey,
    fontSize: FontSize.large,
  },
  selectionStyles: {
    textAlign: 'center',
    fontFamily: AppFonts.CalibriBold,
    fontSize: FontSize.inputText,
    color: AppColors.white1,
    paddingLeft: 10,
  },
});
