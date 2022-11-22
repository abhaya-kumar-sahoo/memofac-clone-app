import {StyleSheet} from 'react-native';
import {AppColors} from '../../assets/AppColors';
import {AppDimens, Spacing} from '../../shared/Global.styles';

export const styles = StyleSheet.create({
  settingsView: {
    position: 'absolute',
    backgroundColor: AppColors.Transparent,
    zIndex: 120,
    padding: Spacing.large,
    right: 0,
    top: 10,
  },

  headerStyle: {
    backgroundColor: AppColors.white,
    width: AppDimens.width,
    height: 300,
    padding: Spacing.large,
  },
  profilepicstyle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    // elevation: 10,
    marginLeft: Spacing.large,
    backgroundColor: AppColors.white,
    // position: 'absolute',
  },
});
