import {AppColors} from '../../../assets/AppColors';
import React from 'react';
import {HeartFillIcon, HeartIconDark} from '../../../shared/Icon.Comp';
import {GStyles} from '../../../shared/Global.styles';
import Ripple from 'react-native-material-ripple';
import {AddReactionApiCall} from '../../../redux/sagas/post/request';
import {useSelector} from 'react-redux';
const {StyleSheet} = require('react-native');
import {showToast} from 'shared/Functions/ToastFunctions';
export const ReactionButton = ({
  Icon = () => {
    return null;
  },
  onPress = () => {},
}) => {
  return (
    <Ripple
      // rippleColor={AppColors.yellowDarkI}
      rippleContainerBorderRadius={20}
      rippleFades
      style={{height: 50, width: 50, ...GStyles.containView}}
      onPress={() => onPress()}>
      <Icon />
    </Ripple>
  );
};

export const ReactionConsts = {
  NONE: -1,
  HEART: 1,
  SAD: 2,
  ANGRY: 3,
  CONFUSED: 4,
  AWE: 5,
  LAUGH: 6,
};
export const ReactionView = ({post, onReaction = () => {}}) => {
  // const [visible, setVisible] = React.useState(false);
  const {myRecation} = {...post};
  const [reaction, setreaction] = React.useState(Number(myRecation));
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  const {userAuth} = useSelector(state => state);

  // console.log('reaction,', reaction);
  // console.log('myRecation,', myRecation);

  // console.log('post,', post.user_name);

  const onReactionClick = reaction => {
    // hideModal();
    setreaction(reaction);
    if (reaction !== -1) {
      showToast('You have reacted to this post');
    }

    onReaction(reaction);
    AddReactionApiCall(userAuth.userToken, post.id, reaction)
      .then(() => {
        // console.log(response);
      })
      .catch(() => {
        if (reaction !== -1) {
          showToast('Something went wrong while reacting to this post.');
        }
      });

    // setTimeout(() => {
    //   onReaction(reaction);
    //   AddReactionApiCall(userAuth.userToken, post.id, reaction)
    //     .then(response => {
    //       // console.log(response);
    //     })
    //     .catch(error => {
    //       if (reaction !== -1)
    //         showToast('Something went wrong while reacting to this post.');
    //     });
    // }, 100);
  };

  return (
    <Ripple
      rippleContainerBorderRadius={20}
      rippleFades={true}
      onPress={() => {
        onReactionClick(
          reaction <= -1 ? ReactionConsts.HEART : ReactionConsts.NONE,
        );
      }}
      style={reactStyles.containerDark}>
      <>
        {/* {reaction === ReactionConsts.NONE && <HeartIcon size={30} />} */}

        {reaction === ReactionConsts.NONE && <HeartIconDark size={30} />}

        {reaction === ReactionConsts.HEART && <HeartFillIcon size={30} />}
      </>
    </Ripple>
  );
};

const reactStyles = StyleSheet.create({
  containerDark: {
    // backgroundColor: AppColors.white,
    backgroundColor: AppColors.DarkBG,

    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: AppColors.white,
    // backgroundColor: AppColors.DarkBG,

    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
