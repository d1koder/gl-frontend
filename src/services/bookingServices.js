export const getBookings = async () => {
    let token = "Bearer " + localStorage.getItem("jwt")

    try {
        const response = await fetch('http://localhost:3000/api/bookings', {
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
        throw error
    }
}

export const createBooking = async (request) => {
    let token = "Bearer " + localStorage.getItem("jwt")

    try {
        const response = fetch('http://localhost:3000/api/bookings', {
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
        fetch(`http://localhost:3000/api/bookings/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': token
            })
        })
    } catch (error) {
        throw error
    }
}