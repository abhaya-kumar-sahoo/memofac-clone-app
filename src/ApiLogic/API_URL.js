// export
const PROD_URL = 'https://memofac.in/api';
const DEV_URL = 'https://dev.memofac.in/api';
const BASE_URL = PROD_URL;
// const BASE_URL = DEV_URL;

export const APP_APIS = {
  BASE_URL: BASE_URL,
  SEND_OTP: BASE_URL + '/send_otp',
  SEND_OTP_IOS: BASE_URL + '/send_otp_ios',
  LOGIN: BASE_URL + '/login',
  REGISTER: BASE_URL + '/register',
  LOGOUT: BASE_URL + '/logout',
  DELETE_USER_ACCOUNT: BASE_URL + '/deleteUser',

  // TIMELINE
  RECOMMENDED_MEMOS: '/memo_list',
  LIST_OF_MEMOS: '/memo_list_new',

  TIMELINE_POSTS: BASE_URL + '/time_line',
  SEARCH_MEMO_LIST: BASE_URL + '/memo_list_for_recapture',

  // POST
  ADD_REACT: BASE_URL + '/addReact',
  ADD_COMMENT: BASE_URL + '/addCommment',
  DELETE_COMMENT: BASE_URL + '/deleteCommment',

  LIST_COMMENT_REACT: BASE_URL + '/listComReact',
  RECAPTURE: BASE_URL + '/addRecapture',
  DELETE_RECAPTURE_POST: BASE_URL + '/deletePost',
  EDIT_PROFILE: BASE_URL + '/edit_profile',
  SINGL_POST: BASE_URL + '/singlepost',
  DELETE_PROFILE_PIC: BASE_URL + '/delete_profile_image',
  // USER PROFILE
  USER_DETAILS: '/userDetails',
  MY_RECAPTURE_LIST: BASE_URL + '/myReacapture',
  GET_GALLERY_IMAGES: '/getGalleryImage',
  FRIENDS_DETAILS: '/otherUserDetails',
  FRIENDS_MEMO_CATEGORY: '/otherUserCategoryDetails',
  USER_MEMO_CATEGORY: '/userCategoryDetails',

  FRIENDS_RECAPTURE_LIST: '/userReacapture',

  // CONTACT
  ADD_MASTER_CONTACT: BASE_URL + '/addMasterContact',
  GET_CONTACT_LIST: BASE_URL + '/mastercontactList',
  GET_MEMOFAC_USER_CONTACT_LIST: BASE_URL + '/appContactList',
  DELETE_MASTER_CONTACT: BASE_URL + '/deleteMasterContact',
  CREATE_GROUP: BASE_URL + '/createGroup',
  GET_GROUP_LIST: BASE_URL + '/getGroupList',
  ADD_MEMBER_GROUP: BASE_URL + '/addMemberGroup',
  REMOVE_MEMBER_GROUP: BASE_URL + '/removerMemberGroup',
  GET_GROUP_LIST_WITH_MEMBERS: BASE_URL + '/getGroupMemberList',

  // COLLECTION
  GET_COLLECTION_FOLDER: BASE_URL + '/getCollectionFolder',
  CREATE_PRIMARY_FOLDER: BASE_URL + '/createPrimaryFolder',
  CREATE_SECONDARY_FOLDER: BASE_URL + '/createSecondaryFolder',

  // MEMOS
  CATEGORY_DETAILS: BASE_URL + '/categoryDetails',
  MAIN_CATEGORY_LIST: BASE_URL + '/mainCategoryList',
  SUBCATEGORY_LIST: BASE_URL + '/subCategoryList',
  CATEGORY_LIST_OF_MEMOS: BASE_URL + '/subCategoryListNew',
  SEARCH_MEMOS: '/memo_list_for_recapture',
  RATE_MEMOS: BASE_URL + '/memorate',
  ADD_MEMO: '/addMemo',
  MEMO_DETAILS: BASE_URL + '/memoDetails',
  MEMO_RELATED_POST: BASE_URL + '/memoRelatedPost',
  MEMOS_OF_CATEGORY: BASE_URL + '/rateMemoList',
  REQ_SECONDARY_FOLDER: BASE_URL + '/addSecondaryGroup',
  USER_RATINGS: BASE_URL + '/listRatedUser',
  SEEN_MEMO: BASE_URL + '/seen_memo',
  // WISHLIST
  ADD_WISHLIST: BASE_URL + '/wishlist',
  ADD_MEMO_TO_WISHLIST: BASE_URL + '/wishlist_memo',
  // GET WISHSLIST
  WISHLIST_POSTS: BASE_URL + '/wishlistPost',
  WISHLIST_MEMOS: BASE_URL + '/wishlistMemoList',
  WISHLIST_GALLERY: BASE_URL + '/getWishlistGalleryImage',

  //FAVOURITES
  WISHLIST_FOLDER: BASE_URL + '/wishlist_folder',

  // TRENDING
  TRENDING: BASE_URL + '/trending',

  // SETTINGS
  REPORT_PROBLEM: BASE_URL + '/report_problem',
  REPORT_MEMO_PROBLEM: BASE_URL + '/report_memo',
};

export const API_TYPE = {
  POST: 'POST',
  GET: 'GET',
};
