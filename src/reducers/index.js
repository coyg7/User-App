import { combineReducers } from 'redux';
import users from './users';
import { routerReducer } from 'react-router-redux';
// export function reducers(state, action) {

//   //no action passed so lets show the default state
//   return state;
// }

export const reducers = combineReducers({
  routing: routerReducer,
  users: users
});

/**
 * Reducer class call
 * @param {*} state 
 * @param {*} action 
 * @param {*} reducerClass 
 */
export function reducerCall(state, action, reducerClass) {
  //get the action class method
  const [, method] = action.type.split('.');

  //get all class methods
  const methods = Object.getOwnPropertyNames(reducerClass).filter(name => {
    if ('length' !== name && name !== 'name' && 'prtotype' !== name) {
      return name;
    }
  });

  //check if the static methods exist
  if (methods.find(x => x === method)) {
    //clone the state
    const new_state = cloneObject(state);
    //return the static method
    return reducerClass[method](new_state, action);
  } else {
    return state;
  }
}

//clone an object
function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}