import { AppColors } from 'assets/AppColors';
import { StyleSheet } from 'react-native';
import { hp } from 'shared/dimens';
import { AppDimens, GStyles } from 'shared/Global.styles';

export const styles = StyleSheet.create({
  container: { backgroundColor: AppColors.white, flex: 1 },
  screenRenderContainer: {
    width: AppDimens.width,
    height: 500,
    justifyContent: 'center',
    // backgroundColor: 'wheat',
    // height: AppDimens.height,
    // justifyContent: 'center',
    marginTop: 80,
    // alignItems: 'center',
  },
  pressableArea: {
    height: hp(100),
    width: '100%',
    position: 'absolute',
    bottom: 100,
    zIndex: 200,
  },
  imageContainer: {
    backgroundColor: AppColors.green,
  },
  contentStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    width: '100%',
  },
  bottomViewSection: {
    // width: 250,
    height: 50,
    borderRadius: 30,
    ...GStyles.containView,
  },
  bottomViewContainer: {
    position: 'absolute',
    bottom: 60,
    width: AppDimens.width,
    alignItems: 'center',
  },
});
