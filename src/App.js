import React, { useReducer } from 'react';
import { Container } from "react-bootstrap";
import { Switch, Redirect, Route } from 'react-router-dom';
import Header from "./common/Header";
import Home from "./pages/Home";
import PropertiesScreen from './pages/Properties/PropertiesScreen';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Bookings from './pages/Bookings'
import Footer from './common/Footer';
import SearchResults from './pages/SearchResults'

import { UserContext } from './utils/context/userContext'
import userReducer from './utils/reducers/userReducer'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  isLoggedIn: localStorage.getItem("jwt")? true : false,
  username: localStorage.getItem("username") || null,
  jwt: localStorage.getItem("jwt") || null,
  user_id: localStorage.getItem("user_id") || null,
  error: null
};

const App = () => {

  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <>
    <ToastContainer />
    <UserContext.Provider value={{ state, dispatch }}>
      <Header state={state.isLoggedIn}/>  
        <main className='py-3'>
          <Container>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/search/:keyword' component={SearchResults} />
              <Route path='/properties' component={PropertiesScreen} />
              <Route path='/bookings' render={(props) => <Bookings {...props}/>} />
              <Route path='/login' render={(props) => <Login {...props}/> } />
              <Route path='/sign_up' render={(props) => <SignUp {...props}/>} />
              <Redirect to='/' />
            </Switch>
          </Container>
        </main>
      <Footer />
    </UserContext.Provider>
    </>
  );
}

export default App;
