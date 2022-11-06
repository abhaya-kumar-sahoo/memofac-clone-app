import { takeLatest } from 'redux-saga/effects';
import { GET_COLLECTION } from 'redux/reducers/Collection/CollectionFolder.reducer';
import {
  CONTACT_SYN,
  SYNC_CONTACTS,
} from 'redux/reducers/Contact/contacts.reducer';
import { GET_FRIEND_POST } from 'redux/reducers/FriendsProfile/FriendsProfile.reducer';
import { GET_MAINCATEGORY } from 'redux/reducers/Memos/Maincategory.reducer';
import {
  GET_MEMO_DETAILS,
  REFETCH_MEMO_DETAILS,
} from 'redux/reducers/Memos/MemoDetails.reducer';
import { GET_SUBCATEGORY } from 'redux/reducers/Memos/Subcategory.reducer';
import { GET_POST_POST } from 'redux/reducers/Post/MemoRelatedPost.reducer';
import { GET_POST_COMMENTS } from 'redux/reducers/Post/PostComments.reducer';
import { GET_SINGLE_POST } from 'redux/reducers/Post/SinglePost.reducer';

import {
  GET_TIMELINE_POSTS,
  REFRESH_TIMELINE_POSTS,
} from 'redux/reducers/Timeline/Timeline.reducer';
import {
  UserPostReducer,
  GET_USER_POST,
} from 'redux/reducers/UserProfile/UserPost_reducer';
import { GET_USER_DETAILS } from 'redux/reducers/UserProfile/userprofile.reducer';
import {
  GET_RECOMM,
  REFRESH_RECOMM,
} from '../reducers/Memos/RecomMemos.reducer';
import { CollectionFolderhandler } from './Collection/CollectionFolder.handler';
import { ContactSyncHandler } from './Contacts/Contact.sync.handler';
import { FriendPostDataHandler } from './FriendsProfile/Friends.handle';
import { MaincategoryHandler } from './Memos/Maincategory.handler';
import { MemoDetailsHandler } from './Memos/MemoDetails.handler';
import { RecomMemoshandler } from './Memos/RecomMemos.handler';
import { SubcategoryHandler } from './Memos/Subcategory.handler';
import { MemoPostDataHandler } from './post/MemoPost.hnadler';
import { CommentsReactionshandler } from './post/PostComments.handler';
import { SinglePostDataHandler } from './post/SinglePost.handler';
import { TimelineHandler } from './Timeline/Timeline.handler';
import { UserDataHandler } from './UserProfile/userData.handler';
import { UserPostDataHandler } from './UserProfile/UserPost.handler';

export function* watcherSaga() {
  yield takeLatest(GET_RECOMM, RecomMemoshandler);
  yield takeLatest(REFRESH_RECOMM, RecomMemoshandler);

  yield takeLatest(GET_COLLECTION, CollectionFolderhandler);
  yield takeLatest(GET_SUBCATEGORY, SubcategoryHandler);
  yield takeLatest(GET_MAINCATEGORY, MaincategoryHandler);
  yield takeLatest(GET_USER_DETAILS, UserDataHandler);
  yield takeLatest(GET_TIMELINE_POSTS, TimelineHandler);
  yield takeLatest(REFRESH_TIMELINE_POSTS, TimelineHandler);

  yield takeLatest(GET_POST_COMMENTS, CommentsReactionshandler);
  yield takeLatest(GET_MEMO_DETAILS, MemoDetailsHandler);
  yield takeLatest(REFETCH_MEMO_DETAILS, MemoDetailsHandler);
  yield takeLatest(SYNC_CONTACTS, ContactSyncHandler);
  yield takeLatest(CONTACT_SYN, ContactSyncHandler);
  yield takeLatest(GET_USER_POST, UserPostDataHandler);
  yield takeLatest(GET_POST_POST, MemoPostDataHandler);
  yield takeLatest(GET_FRIEND_POST, FriendPostDataHandler);
  yield takeLatest(GET_SINGLE_POST, SinglePostDataHandler);
}
