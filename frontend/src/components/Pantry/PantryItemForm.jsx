// import { useState } from 'react';
// import { addPantryItem } from '../../api/pantryApi.js';
//
// const PantryItemForm = ({ onAdd }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         quantity: '',
//         unit: 'pieces',
//         category: 'produce',
//         location: 'refrigerator',
//         expirationDate: '',
//         purchaseDate: '',
//         brand: '',
//         status: 'fresh',
//         notes: ''
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         const payload = {
//             ...formData,
//             quantity: Number(formData.quantity),
//             purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate) : null,
//             expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : null,
//         };
//
//         await addPantryItem(payload);
//
//         setFormData({
//             name: '',
//             quantity: '',
//             unit: 'pieces',
//             category: 'produce',
//             location: 'refrigerator',
//             expirationDate: '',
//             purchaseDate: '',
//             brand: '',
//             status: 'fresh',
//             notes: ''
//         });
//
//         onAdd();
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className="pantry-form">
//             <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required />
//             <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required type="number" />
//             <input name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit (e.g. kg, pieces)" />
//
//             <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand (optional)" />
//             <input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} />
//             <input name="expirationDate" type="date" value={formData.expirationDate} onChange={handleChange} />
//
//             <select name="category" value={formData.category} onChange={handleChange}>
//                 <option value="produce">Produce</option>
//                 <option value="meat">Meat</option>
//                 <option value="dairy">Dairy</option>
//                 <option value="seafood">Seafood</option>
//                 <option value="pantry">Pantry</option>
//                 <option value="frozen">Frozen</option>
//                 <option value="bakery">Bakery</option>
//                 <option value="beverages">Beverages</option>
//                 <option value="snacks">Snacks</option>
//                 <option value="condiments">Condiments</option>
//                 <option value="spices">Spices</option>
//                 <option value="other">Other</option>
//             </select>
//
//             <select name="location" value={formData.location} onChange={handleChange}>
//                 <option value="refrigerator">Refrigerator</option>
//                 <option value="pantry">Pantry</option>
//                 <option value="freezer">Freezer</option>
//                 <option value="counter">Counter</option>
//                 <option value="cabinet">Cabinet</option>
//                 <option value="wine_rack">Wine Rack</option>
//                 <option value="root_cellar">Root Cellar</option>
//                 <option value="other">Other</option>
//             </select>
//
//             <select name="status" value={formData.status} onChange={handleChange}>
//                 <option value="fresh">Fresh</option>
//                 <option value="expiring_soon">Expiring Soon</option>
//                 <option value="expired">Expired</option>
//                 <option value="used_up">Used Up</option>
//                 <option value="spoiled">Spoiled</option>
//             </select>
//
//             <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" />
//
//             <button type="submit">Add Item</button>
//         </form>
//     );
// };
//
// export default PantryItemForm;

import { useState, useEffect } from 'react';
import { addPantryItem, updatePantryItem } from '../../api/pantryApi.js';

const PantryItemForm = ({ onAdd, onClose, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        unit: 'pieces',
        category: 'produce',
        location: 'refrigerator',
        expirationDate: '',
        purchaseDate: '',
        brand: '',
        status: 'fresh',
        notes: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                quantity: String(initialData.quantity),
                expirationDate: initialData.expirationDate?.slice(0, 10) || '',
                purchaseDate: initialData.purchaseDate?.slice(0, 10) || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            quantity: Number(formData.quantity),
            purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate) : null,
            expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : null,
        };

        if (initialData?._id) {
            await updatePantryItem(initialData._id, payload);
        } else {
            await addPantryItem(payload);
        }

        onAdd();
        onClose();

        // Reset form only if it was a new item
        if (!initialData) {
            setFormData({
                name: '',
                quantity: '',
                unit: 'pieces',
                category: 'produce',
                location: 'refrigerator',
                expirationDate: '',
                purchaseDate: '',
                brand: '',
                status: 'fresh',
                notes: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pantry-form">

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required />
            <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required type="number" />
            <input name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit (e.g. kg, pieces)" />

            <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand (optional)" />
            <input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} />
            <input name="expirationDate" type="date" value={formData.expirationDate} onChange={handleChange} />

            <select name="category" value={formData.category} onChange={handleChange}>
                <option value="produce">Produce</option>
                <option value="meat">Meat</option>
                <option value="dairy">Dairy</option>
                <option value="seafood">Seafood</option>
                <option value="pantry">Pantry</option>
                <option value="frozen">Frozen</option>
                <option value="bakery">Bakery</option>
                <option value="beverages">Beverages</option>
                <option value="snacks">Snacks</option>
                <option value="condiments">Condiments</option>
                <option value="spices">Spices</option>
                <option value="other">Other</option>
            </select>

            <select name="location" value={formData.location} onChange={handleChange}>
                <option value="refrigerator">Refrigerator</option>
                <option value="pantry">Pantry</option>
                <option value="freezer">Freezer</option>
                <option value="counter">Counter</option>
                <option value="cabinet">Cabinet</option>
                <option value="wine_rack">Wine Rack</option>
                <option value="root_cellar">Root Cellar</option>
                <option value="other">Other</option>
            </select>

            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="fresh">Fresh</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="expired">Expired</option>
                <option value="used_up">Used Up</option>
                <option value="spoiled">Spoiled</option>
            </select>

            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" />

            <button type="submit">{initialData ? 'Update Item' : 'Add Item'}</button>
        </form>
    );
};

export default PantryItemForm;
