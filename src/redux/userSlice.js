
const initialState = JSON.parse(localStorage.getItem('activeUser'))

export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case 'loggedInInfo': { 
        return action.payload
      }
    default:
      return state
  }
}

