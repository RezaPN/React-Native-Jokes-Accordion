import {STORE_CHILDREN} from '../../action';

const initialState = {
  result: null,
  loading: false,
  error: null,
};

export function storeChildren(state = initialState, action) {
  switch (action.type) {
    case STORE_CHILDREN:
      return {
        ...initialState,
        result: action.result,
        error: null,
      };
    default:
      return state;
  }
}
