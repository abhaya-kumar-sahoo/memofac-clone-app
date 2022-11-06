import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import { wp } from 'shared/dimens';
import { AppDimens, FontSize, Spacing } from 'shared/Global.styles';

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: Spacing.large,
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    // maxWidth: wp(),
  },
  logo1: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'System',
    padding: 10,
  },

  textFieldContainer: {
    backgroundColor: AppColors.greyLighter,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingLeft: 20,
    // flexGrow: 1,
    width: wp(270),
    // height: 46,
    flexDirection: 'row',
    color: AppColors.DarkGrey,
    fontFamily: AppFonts.CalibriBold,
    fontSize: FontSize.xlarge,
    maxHeight: 100,
  },
  sendButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
