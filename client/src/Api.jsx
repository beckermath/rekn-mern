import axios from 'axios';

export const getPeople = async() => {
    const res = await axios.get('http://localhost:3000/api/persons')
    return res.data;
}

export const createPerson = async(newPerson) => {
    const res = await axios.post(`http://localhost:3000/api/person/`, newPerson)
    return res.data;
}

export const deletePerson = async(personId) => {
    const res = await axios.delete(`http://localhost:3000/api/person/${personId}`)
    return res.data;
}