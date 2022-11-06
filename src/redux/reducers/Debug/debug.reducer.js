export const TOGGLE_DEBUG_MODE = 'TOGGLE_DEBUG_MODE';

export const toggleDebugMode = () => ({
  type: TOGGLE_DEBUG_MODE,
});

const initialState = {
  debugState: false,
};

export const DebugModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DEBUG_MODE:
      return { ...state, debugState: !state.debugState };
    default:
      return state;
  }
};
