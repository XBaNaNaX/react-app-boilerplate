import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE,FETCHING_UNIT } from '../constants'
const initialState = {
  data: [],
  unit: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        unit: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case FETCHING_UNIT: 
      return {
        ...state,
        isFetching: false,
        unit: action.unit
      }  
    default:
      return state
  }
}