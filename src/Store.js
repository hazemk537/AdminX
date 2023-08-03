import { combineReducers } from 'redux';
import { createStore } from 'redux';


//reducer receive dispatches 
const Reducer1 = (EditModelOpen = 0, action) => { //should return value whatever the if test
  if (action.type === 'EditModelOpen') 
    return !EditModelOpen;
  return EditModelOpen;
};

const Reducer2 = (toggleDisplay = 0, action) => {  //should return value whatever the if test
  if (action.type === 'toggleDisplay')
    return !toggleDisplay;
  return toggleDisplay;
};

const Reducer3 = (Hackredux = 0, action) => {  //should return value whatever the if test
  if (action.type === 'set')
    return 1;
  return 0;
};
//combine reducers
const rootReducer = combineReducers({
  EditModelOpen: Reducer1,
  toggleDisplay: Reducer2,
  Hackredux:Reducer3
});

const store = createStore(rootReducer);

export default store;
