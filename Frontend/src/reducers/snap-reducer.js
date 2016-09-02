import { ActionTypes } from '../actions';

const SnapsReducer = (state = { all: [], snap: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SNAPS:
      return { all: action.payload, snap: state.snap };
    case ActionTypes.FETCH_SNAP:
      return { all: state.all, snap: action.payload };
    default:
      return state;
  }
};

export default SnapsReducer;
