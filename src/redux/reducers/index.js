import { combineReducers } from 'redux';
import { CollectionFolderReducer } from './Collection/CollectionFolder.reducer';
import { MainCategoryReducer } from './Memos/Maincategory.reducer';
import { RecomMemosReducer } from './Memos/RecomMemos.reducer';
import { SubCategoryReducer } from './Memos/Subcategory.reducer';
import { MemoVisibilityReducer } from './Modal/SumRecaptcure';
import { UserAuthReducer } from './UserAuth.reducer';
import { TimelinePostsReducer } from 'redux/reducers/Timeline/Timeline.reducer';
import { UserDetailsReducer } from 'redux/reducers/UserProfile/userprofile.reducer';
import { UserPostReducer } from 'redux/reducers/UserProfile/UserPost_reducer';
import { MemoPostReducer } from './Post/MemoRelatedPost.reducer';
import { PostReactionCommentsReducer } from 'redux/reducers/Post/PostComments.reducer';
import { DebugModeReducer } from 'redux/reducers/Debug/debug.reducer';
import { photoSelectReducer } from 'redux/reducers/Post/photoEdit.reducer';
import { MemoDetailsReducer } from 'redux/reducers/Memos/MemoDetails.reducer';
import { contactReducer } from 'redux/reducers/Contact/contacts.reducer';
import { SaveMemoExpReducer } from 'redux/reducers/Memos/SaveMemoExp.reducer';
import { FriendPostReducer } from './FriendsProfile/FriendsProfile.reducer';
import { SinglePostReducer } from './Post/SinglePost.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { ProgressReducer } from './progress/ProgressRedux';
const persistConfigs = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['rmemos', 'data', 'userProfileData'],
  timeout: 3000,
  serialize: true,
};
const persistContactConfig = {
  key: 'contactKey',
  timeout: 2000,
  storage: AsyncStorage,
  whitelist: ['contacts'],
  serialize: true,
};
const persistPostConfigs = {
  key: 'postKey',
  timeout: 1000,
  storage: AsyncStorage,
  whitelist: ['subcategoryList'],
  serialize: true,
};
const RootReducer = combineReducers({
  userAuth: UserAuthReducer,
  subCategoryRedux: persistReducer(persistPostConfigs, SubCategoryReducer),
  RecomMemosRedux: persistReducer(persistConfigs, RecomMemosReducer),
  // RecomMemosRedux: RecomMemosReducer,
  MainCategoryRedux: MainCategoryReducer,
  CollectionFolderRedux: CollectionFolderReducer,
  UserDetailsReducer: persistReducer(persistConfigs, UserDetailsReducer),
  // TimelinePostsReducer: persistReducer(
  //   persistPostConfigs,
  //   TimelinePostsReducer,
  // ),
  TimelinePostsReducer,
  PostReactionCommentsReducer,
  MemoVisibilityReducer,
  DebugModeReducer,
  photoSelectReducer,
  MemoDetailsReducer,
  contactReducer: persistReducer(persistContactConfig, contactReducer),
  SaveMemoExpReducer,
  UserPostReducer,
  MemoPostReducer,
  SinglePostReducer,
  ProgressReducer,
  // FriendPostReducer,
  //ThemeChange,
});

export default RootReducer;
