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
import { Container, Row} from 'react-bootstrap'


const initialState = {
    isLoading: false,
    error: '',
    bookings: []
}

const Bookings = (props) => {

    const history = useHistory()

    const { state: loggedInState } = useContext(UserContext)

    const [state, dispatch] = useReducer(bookingReducer, initialState)

    useEffect(() => {
        console.log('Bookings useEffect');
        dispatch({
            type: "BOOKINGS_LIST_REQUEST"
        });
        getBookings()
            .then((data) => {
                console.log(data);
                dispatch({ type: 'BOOKINGS_LIST_REQUEST_SUCCESS', payload: data })
            })
            .catch((error) => {
                console.log(error)
                dispatch({ type: 'BOOKINGS_LIST_REQUEST_FAIL', payload: error })
            })
    }, [loggedInState.jwt, loggedInState.username])

    const columns = [
        {
            dataField: 'title',
            text: 'Title'
        }, {
            dataField: 'location',
            text: 'Location'
        },
        {
            dataField: 'start_date',
            text: 'Booking Start'
        }, {
            dataField: 'end_date',
            text: 'Booking End'
        },
        {
            dataField: 'total',
            text: 'Sum'
        },
        {
            dataField: "id",
            text: "Cancel Booking",
            editable: false,
            formatter: (_, row) => {
                return (
                    <button
                        className="btn btn-danger btn-xs"
                        onClick={() => handleDelete(row.id)}
                    >
                        Cancel
                    </button>
                );
            },
        }];

    const handleDelete = (id) => {
        deleteBooking(id).then(() => {
            dispatch({
                type: 'BOOKING_DELETE_SUCCESS',
                payload: id
            })
        })
        history.push('/bookings')
    }

    return (
        <>
            <h4>MyBookings</h4>
            {
                state.isLoading ? <h2>Loading...</h2>
                    :
                    state.error !== '' ? <h4>Oops😅, something went wrong</h4>
                        :
                        props.location.state === undefined ?
                            <Container style={{ paddingTop: '3vh' }}>
                                <Row>
                                    <BootstrapTable
                                        keyField='id'
                                        data={state.bookings}
                                        columns={columns}
                                        striped={true} hover={true}
                                        pagination={ paginationFactory() } 
                                    />
                                </Row>
                            </Container>
                            :
                            null
            }

        </>
    )
}

export default Bookings
