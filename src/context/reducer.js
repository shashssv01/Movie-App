import { 
  LOG_IN, 
  SHOW_LOADER
} from './actions';

const initialState = {
  isLoggedIn: null,
  showLoader: false
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOG_IN: {
      return { ...state, isLoggedIn: payload };
    }
    case SHOW_LOADER: {
      return { ...state, showLoader: payload };
    }
    default:
      throw new Error();
  }
};

export { reducer, initialState };