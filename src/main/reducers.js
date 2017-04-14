import { combineReducers } from 'redux'
import spaces from './spacesReducer'
import apps from './appsReducer'

const reducers = combineReducers(
  {
    apps: apps,
    spaces: spaces
  }
)

export default reducers
