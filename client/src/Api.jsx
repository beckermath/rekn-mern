import axios from 'axios';

//people

export const getPeople = async() => {
    const res = await axios.get('http://localhost:3000/api/persons');
    return res.data;
}

export const createPerson = async(newPerson) => {
    const res = await axios.post(`http://localhost:3000/api/person/`, newPerson);
    return res.data;
}

export const deletePerson = async(personId) => {
    const res = await axios.delete(`http://localhost:3000/api/person/${personId}`);
    return res.data;
}

//expenses

export const getExpenses = async() => {
    const res = await axios.get('http://localhost:3000/api/expenses');
    return res.data;
}

export const createExpense =  async(newExpense) => {
    const res = await axios.post(`http://localhost:3000/api/expense/`, newExpense);
    return res.data;
}

export const deleteExpense = async(expenseId) => {
    const res = await axios.delete(`http://localhost:3000/api/expense/${expenseId}`);
    return res.data;
}