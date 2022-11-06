export const DELETE_SELECTED_IMAGE = 'DELETE_SELECTED_IMAGE';
export const COPY_LIST_IMAGES = 'COPY_LIST_IMAGES';
export const CLEAR_LIST_IMAGES = 'CLEAR_LIST_IMAGES';

export const deleteImageList = ({ index, imageUri }) => ({
  type: DELETE_SELECTED_IMAGE,
  index,
  imageUri,
});

export const copyImageList = ({ dataList }) => ({
  type: COPY_LIST_IMAGES,
  dataList,
});

export const clearList = () => ({
  type: CLEAR_LIST_IMAGES,
});

const initialState = {
  imageList: [],
};

export const photoSelectReducer = (state = initialState, action) => {
  let { index, dataList } = { ...action };
  switch (action.type) {
    case COPY_LIST_IMAGES:
      return { ...state, imageList: [...dataList] };
    case CLEAR_LIST_IMAGES:
      return { ...state, imageList: [] };
    case DELETE_SELECTED_IMAGE:
      const { imageList = [] } = { ...state };
      const newImageList = imageList.filter(
        (_, listIndex) => listIndex !== index
      );
      return { ...state, imageList: newImageList };
    default:
      return state;
  }
};
