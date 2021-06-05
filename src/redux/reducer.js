import { combineReducers } from 'redux'

import memberReducer from './members/memberSlice'
import userReducer from './userSlice'

const rootReducer = combineReducers({
  members: memberReducer,
  user: userReducer
})

export default rootReducer