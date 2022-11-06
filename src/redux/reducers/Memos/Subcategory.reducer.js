export const GET_SUBCATEGORY = 'GET_SUBCATEGORY';
const SET_SUBCATEGORY = 'SET_SUBCATEGORY';

export const GetSubCategoryAction = (usertoken, category_id) => ({
  type: GET_SUBCATEGORY,
  usertoken: usertoken,
  category_id: category_id,
});

export const SetcategoryAction = (data) => ({
  type: SET_SUBCATEGORY,
  subcategoryList: data.subcategoryList,
  dataLoading: data.dataLoading,
  error: data.error,
});

const initialState = {
  subcategoryList: [],
  dataLoading: true,
  error: false,
};

export const SubCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBCATEGORY:
      const { subcategoryList, dataLoading, error } = action;
      return { ...state, subcategoryList, dataLoading, error };
    case GET_SUBCATEGORY:
      return { ...state, dataLoading: true };

    default:
      return state;
  }
};
