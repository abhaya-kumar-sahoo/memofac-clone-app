export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const PROCEED_STATUS = 'PROCEED_STATUS';
export const SIGN_IN = 'SIGN_IN';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const SAVE_VERIFIED_NUMBER = 'SAVE_VERIFIED_NUMBER';
export const SIGN_OUT = 'SIGN_OUT';

const initialState = {
  userToken: null,
  isLoading: true,
  isSignout: false,
  countrycode: null,
  proceedStatus: null,
  userData: {},
  verifiedNumber: null,
};

export const RestoreToken = data => {
  return {
    type: RESTORE_TOKEN,
    payload: data,
  };
};

export const SignInAction = data => {
  return {
    type: SIGN_IN,
    payload: data,
  };
};

export const SignOutAction = () => {
  return {
    type: SIGN_OUT,
  };
};

export const updateUserData = ({ payload }) => {
  return {
    type: UPDATE_USER_DATA,
    payload,
  };
};

export const saveVerifiedNumber = ({ verifiedNumber }) => {
  return {
    type: SAVE_VERIFIED_NUMBER,
    verifiedNumber,
  };
};

export const saveProgress = ({ proceedStatus }) => {
  return {
    type: PROCEED_STATUS,
    proceedStatus,
  };
};

export const UserAuthReducer = (state = initialState, action) => {
  const { payload } = { ...action };
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.payload.token,
        userData: action.payload.userData,
        countrycode: action.payload.countrycode,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...state,
        isSignout: false,
        userToken: action.payload.token,
      };
    case UPDATE_USER_DATA:
      const { username, userphoto } = action;
      return {
        ...state,
        userData: {
          ...state.userData,
          ...payload,
        },
      };
    case SAVE_VERIFIED_NUMBER:
      const { verifiedNumber } = action;
      return {
        ...state,
        verifiedNumber,
      };
    case PROCEED_STATUS:
      const { proceedStatus } = action;

      return {
        ...state,
        proceedStatus: proceedStatus,
      };
    case SIGN_OUT:
      return {
        ...state,
        ...initialState,
        isLoading: false,
      };

    default:
      return state;
  }
};
