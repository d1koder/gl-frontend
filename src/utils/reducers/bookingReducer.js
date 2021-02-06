import {BOOKINGS_LIST_REQUEST,BOOKINGS_LIST_REQUEST_SUCCESS, BOOKINGS_LIST_REQUEST_FAIL, BOOKING_CREATE_SUCCESS, BOOKING_DELETE_SUCCESS} from '../constants/bookingConstants'

export default function bookingReducer (state, action) {
	switch(action.type) {
		case BOOKINGS_LIST_REQUEST:
			return {
				...state,
				isLoading: true, 
				error: ''
			}
		case BOOKINGS_LIST_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false, 
				bookings: action.payload
			}
		case BOOKINGS_LIST_REQUEST_FAIL:
			return {
				...state,
				isLoading: false, 
				error: action.payload
			}
		case BOOKING_CREATE_SUCCESS:
			return {
				...state,
				bookings: [action.payload, ...state.bookings]
			}
		case BOOKING_DELETE_SUCCESS:
			console.log('BOOKING Delete');
			const updatedBookings = state.bookings.filter((booking) => {
				return booking.id !== action.payload
			})
			return {
				...state,
				bookings: updatedBookings
			}
		default: 
			return state
	}
}
