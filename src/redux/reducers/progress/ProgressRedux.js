const UPLOAD_PROGRESS_INIT = 'UPLOAD_PROGRESS_INIT';
const UPLOAD_PROGRESS_COMPLETE = 'UPLOAD_PROGRESS_COMPLETE';
const UPLOAD_PROGRESS_ERROR = 'UPLOAD_PROGRESS_ERROR';
const UPLOAD_PROGRESS_SEMI = 'UPLOAD_PROGRESS_SEMI';

export const GetProgressAction = formData => ({
  type: UPLOAD_PROGRESS_INIT,
  PostData: formData,
});
export const CompleteProgressAction = () => ({
  type: UPLOAD_PROGRESS_COMPLETE,
});
export const BeforeCompleteProgressAction = () => ({
  type: UPLOAD_PROGRESS_SEMI,
});

export const ProgressErrorAction = (data, visibleData) => ({
  type: UPLOAD_PROGRESS_ERROR,
  ProgressData: data,
  visible: visibleData,
});
const initialState = {
  progress: 0,
  visible: false,
  error: false,
  PostData: [],
  completetInit: false,
};

export const ProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PROGRESS_INIT:
      return {
        ...state,
        visible: true,
        PostData: action.PostData,
        error: false,
      };

    case UPLOAD_PROGRESS_COMPLETE:
      return { ...state, visible: false, error: false, completetInit: false };

    case UPLOAD_PROGRESS_ERROR:
      return { ...state, error: true };
    case UPLOAD_PROGRESS_SEMI:
      return { ...state, error: false, completetInit: true };

    default:
      return state;
  }
};
