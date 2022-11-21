import {navigate} from 'Notification';
import React, {useEffect} from 'react';
import NotificationService from './NotificationService';

export const NotificationWrapper = ({children}) => {
  // const navigation = useNavigation();
  const onRegister = response => {
    // console.log('\n\nonRegister====================================');
    // console.log(response);
    // console.log('====================================\n\n');
  };

  const onNotification = response => {
    // console.log('\n\nonNotification====================================');

    const {data, userInteraction} = {...response};
    // console.log('abhaya kumar sahoo', data);
    const {title, body, sound, image, data: payload} = {...data};
    // console.log('====================================\n\n');

    if (payload) {
      const ParsedPayload = JSON.parse(payload);
      // console.log('parsed Payload', ParsedPayload);
      const {Type, user, memoDetails, post} = {...ParsedPayload};
      // console.log('PAYLOAD TYPE ', Type);
      // console.log('              ');
      // console.log('PAYLOAD user ', user);
      // console.log('              ');

      // console.log('PAYLOAD memoDetails ', memoDetails);
      // console.log('              ');

      // console.log('PAYLOAD post ', post);

      setTimeout(() => {
        if (userInteraction) {
          switch (Type) {
            case 'comment':
              navigate('SinglePostScreen', {post: post.id});
              break;
            case 'reaction':
              navigate('SinglePostScreen', {post: post.id});
              break;
            case 'contact_joined':
              navigate('FriendsProfile', {user_id: user.id});
              break;
            case 'rated_an_experience':
              navigate('ViewMemo', {
                memoId:
                  typeof memoDetails === 'string'
                    ? memoDetails
                    : typeof memoDetails === 'number'
                    ? memoDetails
                    : memoDetails[0].id,
              });
              break;
            default:
              console.log('Unknown Notification');
          }
        }
      }, 500);
    }
  };

  const notification = new NotificationService(onRegister, onNotification);

  useEffect(() => {
    notification.popInitialNotification();
  }, []);

  return <>{children}</>;
};
