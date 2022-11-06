export const GET_MAINCATEGORY = 'GET_MAINCATEGORY';
const SET_MAINCATEGORY = 'SET_MAINCATEGORY';

export const GetMainCategoryAction = (usertoken) => ({
  type: GET_MAINCATEGORY,
  usertoken: usertoken,
});

export const SetMaincategoryAction = (data) => ({
  type: SET_MAINCATEGORY,
  MaincategoryList: data.MaincategoryList,
  dataLoading: data.dataLoading,
  error: data.error,
});

const initialState = {
  MaincategoryList: [],
  dataLoading: true,
  error: false,
};

export const MainCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAINCATEGORY:
      const { MaincategoryList, dataLoading, error } = action;
      return { ...state, MaincategoryList, dataLoading, error };
    default:
      return state;
  }
};
