export const getBookings = async () => {
    let token = "Bearer " + localStorage.getItem("jwt")

    try {
        // const response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/bookings', 
        // http://localhost:3000/api/bookings
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/bookings', {
            headers: {
                'Authorization': token
            }
        })
        if (response.ok) {
            const bookings = await response.json()
            return bookings
        }
        throw response
    } catch (error) {
        console.log(error);
        if (error.status >= 400 && error.status < 500) {  throw new Error('Your token has expired, please log in again')}
        if (error.status >= 500) {
            throw new Error('Something may be wrong with our server')
        }
    }
}

export const createBooking = async (request) => {
    let token = "Bearer " + localStorage.getItem("jwt")

    try {
        // const response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/bookings', 
        const response = fetch(process.env.REACT_APP_API_ENDPOINT + '/bookings', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8;',
                'Authorization': token
            }),
            body: JSON.stringify(request)
        })
        if (response.ok) {
            const booking = await response.json()
            return booking
        }
        throw response
    } catch (error) {
        throw error
    }

}

export const updateBooking = async () => {

}

export const deleteBooking = async (id) => {
    let token = "Bearer " + localStorage.getItem("jwt")

    try {
        // const response = await fetch( process.env.REACT_APP_API_ENDPOINT  +`/bookings/${id}`, {
        const response = await fetch( process.env.REACT_APP_API_ENDPOINT +`/bookings/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': token
            })
        })
        if (response.ok){
            console.log("delete success")
        }
        throw response
    } catch (error) {
        if (error.status >= 400 && error.status < 500) {  throw new Error('Your token has expired, please log in again')}
        if (error.status >= 500) {
            throw new Error('Something may be wrong with our server')
        }
    }
}