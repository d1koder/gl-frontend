import {PROPERTIES_LIST_REQUEST,PROPERTIES_LIST_REQUEST_SUCCESS, PROPERTIES_LIST_REQUEST_FAIL, PROPERTIES_SEARCH} from '../constants/propertyConstants'

export default function propertyReducer (state, action) {
	switch(action.type) {
		case PROPERTIES_LIST_REQUEST:
			return {
				...state,
				isLoading: true, 
				error: ''
			}
		case PROPERTIES_LIST_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false, 
				properties: action.payload
			}
		case PROPERTIES_LIST_REQUEST_FAIL:
			return {
				...state,
				isLoading: false, 
				error: action.payload
			}
		case PROPERTIES_SEARCH:
			console.log(action.payload);
			return {
				...state,
				isLoading: false,
				properties: action.payload
			}
		default: 
			return state
	}
}
