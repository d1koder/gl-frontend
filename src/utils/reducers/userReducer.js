import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from '../constants/userConstants'

export default function userReducer(state, action) {
	switch (action.type) {
		case USER_LOGIN_SUCCESS:
			console.log(action.payload);
			localStorage.setItem("username", action.payload.username);
			localStorage.setItem("jwt", action.payload.jwt);
			localStorage.setItem("user_id", action.payload.user_id);
			return {
				...state,
				isLoggedIn: true,
				username: action.payload.username,
				jwt: action.payload.jwt,
				user_id: action.payload.user_id
			}
		case USER_LOGIN_FAIL:
			console.log("USER_LOGIN_FAIL");
			console.log(action.payload)
			return {
				...state,
				isLoggedIn: false,
				error: action.payload
			}
		case USER_LOGOUT:
			console.log("USER_LOGOUT");
			localStorage.clear();
			return {
				...state,
				isLoggedIn: false,
				username: null,
				jwt: null
			  }
		case USER_SIGNUP_SUCCESS:
			console.log("USER_SIGNUP_SUCCESS");
			console.log(action.payload);
			localStorage.setItem("username", action.payload.username);
			localStorage.setItem("jwt", action.payload.jwt);
			localStorage.setItem("user_id", action.payload.user_id);
			return {
				...state,
				isLoggedIn: true,
				username: action.payload.username,
				jwt: action.payload.jwt,
				user_id: action.payload.user_id
			}
		case USER_SIGNUP_FAIL:
			console.log("USER_SIGNUP_FAIL");
			console.log(action.payload)
			return {
				...state,
				isLoggedIn: false,
				error: action.payload
			}
		default:
			return state
	}
}
