import React, { useEffect, useReducer, useContext } from 'react'
import { Route } from "react-router-dom";
import Detail from "../_shared/detail";
import List from '../_shared/list'

import propertyReducer from '../../../utils/reducers/propertyReducer'
import {getProperties} from '../../../services/propertyServices'
import {UserContext} from '../../../utils/context/userContext'


const initialState = {
    isLoading: false,
    error: '',
    properties: []
}

const Corporate = (props) => {

    const {state: loggedInState} = useContext(UserContext)

    const [state, dispatch] = useReducer(propertyReducer, initialState)

    useEffect(() => {
        dispatch({
            type: "PROPERTIES_LIST_REQUEST"
          });
        getProperties(2)
        .then((data) => {
            dispatch({ type: 'PROPERTIES_LIST_REQUEST_SUCCESS', payload: data })
        })
        .catch((error)=>{
            console.log(error)
            dispatch({ type: 'PROPERTIES_LIST_REQUEST_FAIL', payload: error })
        })
    }, [loggedInState.jwt])

    return (
        <>
            {   
                state.isLoading ? <h2>Loading...</h2>
                :
                state.error !== '' ? <h4>Oops😅, something went wrong</h4>
                :
                props.location.state === undefined ?
                <List state={state}/>
                :
                null
            }
            <Route path="/properties/corporate/detail" render={(props) => <Detail {...props} />} />
        </>
    )
}

export default Corporate
