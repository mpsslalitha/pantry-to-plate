// import { useEffect, useState } from 'react';
// import {
//     fetchPantryItems,
//     deletePantryItem,
//     setAuthToken
// } from '../api/pantryApi.js';
// import PantryItemForm from '../components/Pantry/PantryItemForm';
// import PantryItemCard from '../components/Pantry/PantryItemCard';
// import '../styles/Pantry.css';
//
// const PantryPage = () => {
//     const [pantry, setPantry] = useState([]);
//
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setAuthToken(token);
//         loadItems();
//     }, []);
//
//     const loadItems = async () => {
//         try {
//             const res = await fetchPantryItems();
//             setPantry(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };
//
//     const handleDelete = async (id) => {
//         await deletePantryItem(id);
//         loadItems();
//     };
//
//     return (
//         <div className="pantry-container">
//             <h2>Your Pantry</h2>
//             <PantryItemForm onAdd={loadItems} />
//             <div className="pantry-grid">
//                 {pantry.map((item) => (
//                     <PantryItemCard key={item._id} item={item} onDelete={handleDelete} />
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default PantryPage;


import { useEffect, useState } from 'react';
import PantryItemForm from '../components/Pantry/PantryItemForm.jsx';
import { getPantryItems, deletePantryItem } from '../api/pantryApi.js';
import '../styles/Pantry.css';

const PantryPage = () => {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchItems = async () => {
        const data = await getPantryItems();
        setItems(data);
    };

    const handleDelete = async (id) => {
        await deletePantryItem(id);
        await fetchItems();
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditItem(null);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="pantry-page">
            <div className="pantry-header">
                <h2>Your Pantry</h2>

                <br/>
                <button className="add-btn" onClick={() => {
                    setEditItem(null);
                    setShowForm(true);
                }}>
                    Add Item
                </button>
            </div>

            {/* Modal for Form */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="modal-close" onClick={handleCloseForm}>×</button>
                        <PantryItemForm
                            onAdd={fetchItems}
                            initialData={editItem}
                            onClose={handleCloseForm}
                        />
                    </div>
                </div>
            )}

            <div className="pantry-list">
                {items.map(item => (
                    <div key={item._id} className="pantry-card">
                        <h3>{item.name}</h3>
                        <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
                        <p><strong>Expires:</strong> {item.expirationDate?.slice(0, 10)}</p>
                        <p><strong>Location:</strong> {item.location}</p>
                        <div className="pantry-buttons">
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PantryPage;
