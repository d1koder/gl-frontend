import React, { useEffect, useReducer, useContext } from 'react'
import bookingReducer from '../../utils/reducers/bookingReducer'
import { getBookings } from '../../services/bookingServices'
import { UserContext } from '../../utils/context/userContext'
import { useHistory } from 'react-router-dom'
import { deleteBooking } from '../../services/bookingServices'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Container, Row, Button, Col } from 'react-bootstrap'
import Checkout from '../../common/Checkout/index'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//

const initialState = {
    isLoading: false,
    error: '',
    bookings: []
}

const contentStyle = { background: '#fff' };
const overlayStyle = { background: 'rgba(255,255,255,0.5)' };

const Bookings = (props) => {


    const history = useHistory()

    const { state: loggedInState, dispatch: expirationDispatch } = useContext(UserContext)

    const [state, dispatch] = useReducer(bookingReducer, initialState)


    useEffect(() => {
        console.log('BookingsDidMount');
        dispatch({
            type: "BOOKINGS_LIST_REQUEST"
        });
        getBookings()
            .then((data) => {
                console.log(data);
                dispatch({ type: 'BOOKINGS_LIST_REQUEST_SUCCESS', payload: data })
            })
            .catch((error) => {
                console.log(error);
                toast.warning(error.message)
                dispatch({ type: 'BOOKINGS_LIST_REQUEST_FAIL', payload: error.message })
                expirationDispatch({ type: 'USER_LOGOUT', payload: error.message })
            })
    }, [loggedInState.jwt, loggedInState.username, expirationDispatch])

    const columns = [
        {
            dataField: 'title',
            text: 'Title',
            headerStyle: { width: '10%', textAlign: 'center', backgroundColor: '#215E95', color: 'white' }

        }, {
            dataField: 'location',
            text: 'Location',
            headerStyle: { width: '20%', textAlign: 'center', backgroundColor: '#215E95', color: 'white' }

        },
        {
            dataField: 'start_date',
            text: 'Booking Start',
            sort: true,
            headerStyle: { width: '25%', textAlign: 'center', backgroundColor: '#215E95', color: 'white' }

        }, {
            dataField: 'end_date',
            text: 'Booking End',
            sort: true,
            headerStyle: { width: '25%', textAlign: 'center', backgroundColor: '#215E95', color: 'white' }

        },
        {
            dataField: 'total',
            text: 'Sub Total',
            sort: true,
            headerStyle: { width: '10%', textAlign: 'center', backgroundColor: '#215E95', color: 'white' }

        },
        {
            dataField: "id",
            text: "Cancel",
            editable: false,
            formatter: (_, row) => {
                return (
                    <button
                        className="btn btn-primary btn-xs"
                        onClick={() => handleDelete(row.id)}
                    >
                        Confirm?
                    </button>
                );
            },
            headerStyle: { width: '10%', textAlign: 'center', backgroundColor: '#215E95', color: 'white' }

        }];

    const handleDelete = (id) => {
        deleteBooking(id).then(() => {
            dispatch({
                type: 'BOOKING_DELETE_SUCCESS',
                payload: id
            })
        })
            .catch((error) => {
                console.log(error);
                toast.warning(error.message)
                dispatch({ type: 'BOOKINGS_LIST_REQUEST_FAIL', payload: error.message })
                expirationDispatch({ type: 'USER_LOGOUT', payload: error.message })
            })
        history.push('/bookings')
    }

    const sum = () => {
      const eachNum = state.bookings.map((obj) => parseInt(obj.total))
      return eachNum.reduce((prev,curr)=> prev + curr, 0)
    }

    return (
        <>
            {
                state.isLoading ? <h2>Loading...</h2>
                    :
                    state.error !== '' ? <Container style={{ paddingTop: '3vh' }}><h4>Oops😅, something went wrong</h4></Container>
                        :
                        props.location.state === undefined ?
                            <Container style={{ paddingTop: '3vh' }}>
                                <Row>
                                    <BootstrapTable
                                        keyField='id'
                                        data={state.bookings}
                                        columns={columns}
                                        hover={true}
                                        pagination={paginationFactory()}
                                    />
                                </Row>
                                <Row>
                                    <Col md={{ span: 3, offset: 10 }}>
                                        <h5>Total: ${sum()}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 2, offset: 10 }}>
                                        <Popup trigger={<Button variant="dark">PAY NOW?</Button>}
                                            modal {...{ contentStyle, overlayStyle }}>
                                            <Checkout />
                                        </Popup>
                                    </Col>
                                </Row>
                            </Container>
                            :
                            null
            }

        </>
    )
}

export default Bookings
