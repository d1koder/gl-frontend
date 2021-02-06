
import React,{useEffect, useReducer, useContext} from 'react'
import { searchProperties } from '../../services/propertyServices';
import { UserContext } from '../../utils/context/userContext';
import propertyReducer from '../../utils/reducers/propertyReducer';


const initialState = {
    isLoading: false,
    errors:'',
    properties: []
}

const SearchResults = ({match}) => {

    const {state: loggedInState} = useContext(UserContext)

    const {keyword} = match.params

    const [state, dispatch] = useReducer(propertyReducer, initialState)

    useEffect(() => {
        dispatch({
            type: "PROPERTIES_LIST_REQUEST"
          });
        searchProperties(keyword)
        .then(data=>{
            console.log(data);
            dispatch({
                type: 'PROPERTIES_SEARCH',
                payload: data
            })
        })
        .catch((error) => {
            console.log(error)
        })
        
    }, [loggedInState.jwt, keyword])

    return (
        <>
        {
            state.properties.map((propObj) => {
              return (
                <ul key={propObj.id}>
                    <li>{propObj.title}</li>
                </ul>
              )
            })
        }
        </>
    )
}

export default SearchResults






