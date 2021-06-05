import axios from "axios"

const initialState = []

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    case 'member/fetched': { 
        return action.payload
      }
    case 'member/add': { 
      return [...state, action.payload]
    }
    case 'member/edit': { 
        return state.map(item => {
            if (item.id!== action.payload.id) return item
            else return action.payload
        })
      }
    case 'member/delete': {
      return state.filter((user) => user.id !== action.payload)
    }
    default:
      return state
  }
}

// Thunk function
export async function fetchUsers(dispatch, getState) {
  const response = await axios.get("https://reqres.in/api/users?page=2")
  dispatch({ type: 'member/fetched', payload: response.data.data })
}
