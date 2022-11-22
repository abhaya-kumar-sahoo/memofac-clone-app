import {StyleSheet} from 'react-native';
import {hp} from 'shared/dimens';

export const Term_Styles = StyleSheet.create({
  bottomView: {
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(30),
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#faf8f2',
    padding: 13,
    borderRadius: 50,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  agreeButton: {
    marginBottom: '6%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});
