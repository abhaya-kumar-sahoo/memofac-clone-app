import React, { Component, Fragment } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ActivityIndicator, Divider, Modal, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import Toast from 'react-native-simple-toast';
import { AppHeader } from '../../components/AppHeader';
import { BioImageView } from '../../components/BioImageView';
import { AccentButton, Container } from '../../components/Mini';
import {
  AddCommentApiCall,
  ListcommentsApiCall,
  DeleteCommentApiCall,
} from '../../redux/sagas/post/request';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
  WhiteFadeView,
} from '../../shared/Global.styles';
import { HeartFillIcon, ReactionsIcon } from '../../shared/Icon.Comp';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChatFilledIcon } from 'shared/Icon.Comp';
import {
  getPostReactionsComments,
  updateReactionComments,
} from 'redux/reducers/Post/PostComments.reducer';
import { MemofacKeyboard } from 'components/MemofacKeyboard';
import { useNavigation } from '@react-navigation/native';
import { hp } from 'shared/dimens';
import { updateUserCommentCount } from 'redux/reducers/UserProfile/UserPost_reducer';
import { updateCommentCount } from 'redux/reducers/Timeline/Timeline.reducer';
import { updateMemoCommentCount } from 'redux/reducers/Post/MemoRelatedPost.reducer';
import { PostMenuOption } from 'screens/Settings/Settings.screen';
import { ModalButtons } from 'screens/Timeline/components/MenuOption';
import { showToast } from 'shared/Functions/ToastFunctions';

const MessageRow = {
  id: 2,
  post_id: '3',
  user_id: '1',
  comment: 'hi this is good post',
  created_at: '2021-05-13T12:15:14.000000Z',
  updated_at: '2021-05-13T12:15:14.000000Z',
  name: 'Prabhat',
  image: 'https://memofac.devclub.co.in/public/images/1619764045.jpg',
};

const m = moment;
m.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%sago',
    s: 'now',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

export const CommentMessageView = ({
  item = { ...MessageRow },
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',

          maxWidth: AppDimens.width * 0.65,
        }}
      >
        <BioImageView imageSize={40} imageSrc={item.image} />
        <HoriSpace size={10} />
        <View style={{ marginTop: -5 }}>
          <Text
            numberOfLines={1}
            style={{
              width: AppDimens.width * 0.65,
              fontSize: 18,
              color: AppColors.white2,
              fontFamily: AppFonts.CalibriBold,
            }}
          >
            {item.name}
          </Text>
          <VertSpace size={5} />
          <Text
            style={{
              width: AppDimens.width * 0.65,
              fontSize: 16,
              fontFamily: AppFonts.CalibriRegular,
              color: AppColors.disableColor,
              lineHeight: 17,
            }}
          >
            {item.comment}
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: FontSize.medium,
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.disableColor,
        }}
      >
        {m(item.created_at).fromNow(true)}
        {/* 3w */}
      </Text>
    </TouchableOpacity>
  );
};

export const CommentScreen = ({ route }) => {
  const refContainer = React.useRef(null);
  const { userAuth } = useSelector(state => state);
  const [comment, setcomment] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [deleteMenu, setDeleteMenu] = React.useState(false);
  const [commId, setCommId] = React.useState({ id: null, index: 0 });

  const [commentsList, setCommentsList] = React.useState([]);
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.PostReactionCommentsReducer);
  const navigation = useNavigation();
  const { navigate } = { ...navigation };

  const ReactionView = ({ reactionsNumber = 0, onPress = () => {} }) => {
    // console.log({ reactionsNumber });

    return (
      <>
        {reactionsNumber !== 0 && (
          <TouchableOpacity
            onPress={onPress}
            style={{ flexDirection: 'row', ...GStyles.containView }}
          >
            {/* <HeartFillIcon size={18} /> */}
            <HoriSpace size={5} />
            <Text
              style={{
                color: AppColors.white2,
                fontFamily: AppFonts.CalibriLight,
                fontSize: FontSize.large,
                paddingBottom: 3,
              }}
            >
              {reactionsNumber} {reactionsNumber > 1 ? 'likes' : 'like'}
            </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const onComment = () => {
    const { post_id, postindex, location } = route.params;
    if (comment !== '') {
      let newCommnet = { ...MessageRow };
      newCommnet = {
        comment,
        name: userAuth.userData.name,
        image: userAuth.userData.image,
        created_at: moment(),
      };
      setcomment('');
      setCommentsList([...commentsList, newCommnet]);
      // dispatch(updateCommentCount({ postIndex: postindex }));
      AddCommentApiCall(userAuth.userToken, post_id, comment).then(() => {
        Toast.showWithGravity('Comment added', Toast.SHORT, Toast.CENTER);
        dispatch(updateReactionComments({ comments: commentsList }));

        if (location === 'T') {
          dispatch(updateCommentCount({ postIndex: postindex }));
        } else if (location === 'M') {
          dispatch(updateUserCommentCount({ postIndex: postindex }));
        } else if (location === 'P') {
          dispatch(updateMemoCommentCount({ postIndex: postindex }));
        }
      });
    } else {
      Toast.showWithGravity(
        'Please enter a comment',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  };

  React.useEffect(() => {
    if (!loading && refContainer.current) {
      refContainer.current.scrollToEnd({ animated: true });
    }
  }, [commentsList]);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  React.useEffect(() => {
    const { post_id } = route.params;

    ListcommentsApiCall(userAuth.userToken, post_id)
      .then(response => {
        setCommentsList(response.content.post_com);
        setLoading(false);
      })
      .catch(error => console.log(error));

    dispatch(
      getPostReactionsComments({
        usertoken: userAuth.userToken,
        post_id,
      }),
    );
  }, []);
  const onLongPress = (id, index) => {
    showModal();
    setCommId({ id, index });
  };

  const DeleteComment = () => {
    hideModal();
    DeleteCommentApiCall(userAuth.userToken, commId.id)
      .then(e => {
        // setCommentsList(commentsList.slice(commId.index + 1));
        setCommentsList(commentsList.filter(i => i.id != commId.id));
        if (e.result === 'success') {
          showToast('Deleted');
        }
      })
      .catch(e => {
        console.log('error', e);
        showToast('Try again');
      });
  };

  // DESIGN VIEW
  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack>
        <ReactionView
          onPress={() => {
            navigate('ContactsWithReaction');
          }}
          reactionsNumber={data?.post_react?.length}
        />
      </AppHeader>
      {/* <CommentDeleteModal id={commId} visibleModal={deleteMenu} /> */}

      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            contentContainerStyle={{}}
          >
            <View style={{ alignItems: 'flex-start' }}>
              <ModalButtons
                height={70}
                textStyle={{
                  fontSize: 25,
                  alignItems: 'center',
                }}
                width={'100%'}
                // IconVisible={true}
                modalStyle={{
                  justifyContent: 'center',
                  width: AppDimens.width * 0.8,
                  backgroundColor: AppColors.white,
                }}
                title={'Delete'}
                onPress={DeleteComment}
              />
            </View>
          </Modal>
        </Portal>

        <></>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <Container style={{ flex: 1, paddingHorizontal: Spacing.large }}>
            <View>
              {/* <WhiteFadeView
            reverse
            style={{ position: 'absolute', width: '100%', zIndex: 20 }}
          >
            <Text
              style={{
                fontFamily: AppFonts.CalibriBold,
                color: AppColors.DarkGrey,
                fontSize: Spacing.xxlarge,
                paddingLeft: 10,
              }}
            >
              Comments
            </Text>
            <VertSpace size={50} />
          </WhiteFadeView> */}
            </View>

            <FlatList
              ref={refContainer}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  {commentsList.length == 0 && loading == false && (
                    <View style={{ ...GStyles.containView, marginTop: 100 }}>
                      <ChatFilledIcon
                        size={100}
                        color={AppColors.VeryLightGrey}
                      />
                      <Text
                        style={{
                          fontSize: FontSize.inputText,
                          fontFamily: AppFonts.InkFree,
                          color: AppColors.white2,
                          padding: 20,
                        }}
                      >
                        No Comments yet,{'\n'} please add one
                      </Text>
                    </View>
                  )}
                  {loading && (
                    <ActivityIndicator color={AppColors.MediumGrey} />
                  )}
                  <VertSpace size={200} />
                </View>
              }
              data={commentsList}
              ItemSeparatorComponent={() => {
                return (
                  <Fragment>
                    <VertSpace size={20} />
                    <Divider />
                    <VertSpace size={20} />
                  </Fragment>
                );
              }}
              ListHeaderComponent={() => <VertSpace size={40} />}
              renderItem={({ item, index }) => (
                <CommentMessageView
                  item={item}
                  index={index}
                  onLongPress={() => {
                    item.user_id == userAuth.userData.id
                      ? onLongPress(item.id, index)
                      : null;
                  }}
                  onPress={() => {
                    navigate('FriendsProfile', { user_id: item.user_id });
                  }}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
            />

            <MemofacKeyboard
              value={comment}
              onChangeText={setcomment}
              onPress={onComment}
              multiline={true}
              autoFocus={false}
            />
          </Container>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const CommentDeleteModal = ({ id }) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { userAuth } = useSelector(state => state);

  const DeleteComment = () => {
    hideModal();
    console.log(id);
    DeleteCommentApiCall(userAuth.userToken, id)
      .then(e => {
        setVisible(!visible);
        console.log(e);
        if (e.result === 'success') {
          showToast('Deleted');
        }
      })
      .catch(e => {
        console.log('error', e);
        showToast('Try again');
      });
  };

  React.useEffect(() => {
    console.log('id', id);
    if (id !== undefined || id !== null) {
      showModal();
      console.log('calling');
    }
  }, []);
  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{}}
        >
          <View style={{ alignItems: 'flex-start' }}>
            <ModalButtons
              height={70}
              textStyle={{
                fontSize: 25,
                alignItems: 'center',
              }}
              width={'100%'}
              // IconVisible={true}
              modalStyle={{
                justifyContent: 'center',
                width: AppDimens.width * 0.8,
                backgroundColor: AppColors.white,
              }}
              title={'Delete'}
              onPress={DeleteComment}
            />
          </View>
        </Modal>
      </Portal>

      <></>
    </View>
  );
};
