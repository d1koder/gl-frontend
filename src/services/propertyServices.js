export const getProperties = async (category_id) => {
    let token = "Bearer " + localStorage.getItem("jwt")

    try {
        const response = await fetch('http://localhost:3000/api/properties', {
            headers: {
                'Authorization': token
            }
        })
        if (response.ok) {
            const data = await response.json()
            const properties = data.filter((property) => {
                return property.category_id === category_id
            })
            return properties
        }
        throw response
    } catch (error) {
        throw error 
    }
}

export const searchProperties = async (keyword) => {
    let token = "Bearer " + localStorage.getItem("jwt")

    try {
        const response = await fetch(`http://localhost:3000/api/properties?keyword=${keyword}`, {
            headers: {
                'Authorization': token
            }
        })
        if (response.ok){
        const searchedProperties = await response.json()
        return searchedProperties
        }
        throw response
    } catch (error) {
        throw error
    }
}

export const createProperty = async () => {
    
}

export const updateProperty = async () => {

}

export const deleteProperty = async () => {

}

