const API_BASE = 'http://localhost:5000/api/pantry/'; // Adjust if your base URL differs

const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Or sessionStorage
    console.log(token);
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

};

export const getPantryItems = async () => {
    const res = await fetch(API_BASE, {
        headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to fetch pantry items');
    return res.json();
};

export const addPantryItem = async (item) => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to add pantry item');
    return res.json();
};

export const deletePantryItem = async (id) => {
    const res = await fetch(`${API_BASE}${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to delete item');
};

export const updatePantryItem = async (id, item) => {
    const res = await fetch(`${API_BASE}${id}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to update item');
    return res.json();
};


// import axios from 'axios';
//
// const API = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });
//
// const getAuthHeader = () => {
//     const token = localStorage.getItem('token'); // Or sessionStorage
//     return {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//     };
// };
//
// // Set token in headers
// export const setAuthToken = (token) => {
//     if (token) {
//         API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete API.defaults.headers.common['Authorization'];
//     }
// };
//
// // Pantry CRUD
// export const getPantryItems = () => API.get('/pantry');
// export const addPantryItem = (data) => API.post('/pantry', data);
// export const updatePantryItem = (id, data) => API.put(`/pantry/${id}`, data);
// export const deletePantryItem = (id) => API.delete(`/pantry/${id}`);
//
// console.log(getPantryItems())