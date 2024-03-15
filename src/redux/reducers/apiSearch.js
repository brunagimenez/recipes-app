import { SAVE_MEALS, SAVE_DRINKS } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};
const apiSearch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_MEALS: {
    return {
      meals: action.payload,
      drinks: [],
    };
  }
  case SAVE_DRINKS: {
    return {
      meals: [],
      drinks: action.payload,
    };
  }
  default: return state;
  }
};

export default apiSearch;
