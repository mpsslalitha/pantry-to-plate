import { useEffect, useState } from 'react';
import { getPantryItems } from '../api/pantryApi';
import '../styles/GenerateRecipes.css';

export default function GenerateRecipes() {
    const [pantry, setPantry] = useState([]);
    const [selected, setSelected] = useState([]);
    const [customItem, setCustomItem] = useState('');
    const [customIngredients, setCustomIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        getPantryItems().then(setPantry);
    }, []);

    const toggle = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const addCustomIngredient = () => {
        if (customItem.trim()) {
            setCustomIngredients([...customIngredients, customItem.trim()]);
            setCustomItem('');
        }
    };

    const removeCustomIngredient = (index) => {
        const updated = [...customIngredients];
        updated.splice(index, 1);
        setCustomIngredients(updated);
    };

    const fetchRecipes = async () => {
        const names = pantry.filter(i => selected.includes(i._id)).map(i => i.name);
        const ingredients = [...names, ...customIngredients];

        try {
            const res = await fetch('/api/recipes/suggestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    selectedIngredients: ingredients,
                    diet,
                    cuisine,
                    maxTime,
                    limit
                }),
            });

            const data = await res.json();

            if (!Array.isArray(data)) {
                console.error('Unexpected response:', data);
                setRecipes([]);
                return;
            }

            setRecipes(data);
        } catch (error) {
            console.error('Fetch error:', error);
            setRecipes([]);
        }
    };

    return (
        <div className="recipe-page">
            <h2>Generate Recipes</h2>

            <div className="form-pantries-wrapper">

                <form className="filter-form" onSubmit={e => e.preventDefault()}>
                    <label>
                        Diet:
                        <select value={diet} onChange={e => setDiet(e.target.value)}>
                            <option value="">Any</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="keto">Keto</option>
                        </select>
                    </label>
                    <label>
                        Cuisine:
                        <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
                            <option value="">Any</option>
                            <option value="indian">Indian</option>
                            <option value="mexican">Mexican</option>
                            <option value="italian">Italian</option>
                            <option value="chinese">Chinese</option>
                        </select>
                    </label>
                    <label>
                        Max Ready Time (min):
                        <input type="number" value={maxTime} onChange={e => setMaxTime(e.target.value)} />
                    </label>
                    <label>
                        Number of Recipes:
                        <input type="number" value={limit} onChange={e => setLimit(e.target.value)} />
                    </label>
                </form>

                <div className="pantry-section">
                    <h3>Select Pantry Items</h3>
                    <div className="checkbox-grid">
                        {pantry.map(item => (
                            <label key={item._id}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(item._id)}
                                    onChange={() => toggle(item._id)}
                                />
                                {item.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="custom-input">
                    <input
                        type="text"
                        value={customItem}
                        onChange={e => setCustomItem(e.target.value)}
                        placeholder="Add custom ingredient (e.g. tofu)"
                    />
                    <button onClick={addCustomIngredient} type="button">Add</button>
                </div>

                <ul className="custom-list">
                    {customIngredients.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button onClick={() => removeCustomIngredient(index)}>x</button>
                        </li>
                    ))}
                </ul>

            </div>

            <button onClick={fetchRecipes} className="generate-button">Generate Recipes</button>

            <div className="recipe-grid">
                {Array.isArray(recipes) && recipes.map(r => (
                    <div key={r.id} className="recipe-card">
                        <img src={r.image} alt={r.title} />
                        <h4>{r.title}</h4>
                        <p>Used: {r.usedIngredientCount}, Missing: {r.missedIngredientCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}




// import { useEffect, useState } from 'react';
// import { getPantryItems } from '../api/pantryApi';
// import '../styles/GenerateRecipes.css';
//
// export default function GenerateRecipes() {
//     const [pantry, setPantry] = useState([]);
//     const [selected, setSelected] = useState([]);
//     const [customItem, setCustomItem] = useState('');
//     const [customIngredients, setCustomIngredients] = useState([]);
//     const [recipes, setRecipes] = useState([]);
//
//     const [diet, setDiet] = useState('');
//     const [cuisine, setCuisine] = useState('');
//     const [maxTime, setMaxTime] = useState('');
//     const [limit, setLimit] = useState(5);
//
//     useEffect(() => {
//         getPantryItems().then(setPantry);
//     }, []);
//
//     const toggle = (id) => {
//         setSelected(prev =>
//             prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
//         );
//     };
//
//     const addCustomIngredient = () => {
//         if (customItem.trim()) {
//             setCustomIngredients([...customIngredients, customItem.trim()]);
//             setCustomItem('');
//         }
//     };
//
//     const fetchRecipes = async () => {
//         const names = pantry.filter(i => selected.includes(i._id)).map(i => i.name);
//         const ingredients = [...names, ...customIngredients];
//
//         const res = await fetch('/api/recipes/suggestions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//             body: JSON.stringify({
//                 selectedIngredients: ingredients,
//                 diet,
//                 cuisine,
//                 maxTime,
//                 limit
//             }),
//         });
//
//         const data = await res.json();
//         setRecipes(data);
//     };
//
//     return (
//         <div className="recipe-page">
//             <h2>Generate Recipes</h2>
//             <div className="form-pantries-wrapper">
//             <form className="filter-form" onSubmit={e => e.preventDefault()}>
//                 <label>
//                     Diet:
//                     <select value={diet} onChange={e => setDiet(e.target.value)}>
//                         <option value="">Any</option>
//                         <option value="vegetarian">Vegetarian</option>
//                         <option value="vegan">Vegan</option>
//                         <option value="keto">Keto</option>
//                     </select>
//                 </label>
//                 <label>
//                     Cuisine:
//                     <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
//                         <option value="">Any</option>
//                         <option value="indian">Indian</option>
//                         <option value="mexican">Mexican</option>
//                         <option value="italian">Italian</option>
//                         <option value="chinese">Chinese</option>
//                     </select>
//                 </label>
//                 <label>
//                     Max Ready Time (min):
//                     <input type="number" value={maxTime} onChange={e => setMaxTime(e.target.value)} />
//                 </label>
//                 <label>
//                     Number of Recipes:
//                     <input type="number" value={limit} onChange={e => setLimit(e.target.value)} />
//                 </label>
//             </form>
//             <div className="pantry-section">
//             <h3>Select Pantry Items</h3>
//             <div className="checkbox-grid">
//                 {pantry.map(item => (
//                     <label key={item._id}>
//                         <input
//                             type="checkbox"
//                             checked={selected.includes(item._id)}
//                             onChange={() => toggle(item._id)}
//                         />
//                         {item.name}
//                     </label>
//                 ))}
//             </div>
//             </div>
//
//             {/*<div className="custom-input">*/}
//             {/*    <input*/}
//             {/*        type="text"*/}
//             {/*        value={customItem}*/}
//             {/*        onChange={e => setCustomItem(e.target.value)}*/}
//             {/*        placeholder="Add custom ingredient (e.g. tofu)"*/}
//             {/*    />*/}
//             {/*    <button onClick={addCustomIngredient} type="button">Add</button>*/}
//             {/*</div>*/}
//             <ul className="custom-list">
//                 {customIngredients.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>
//             </div>
//             <button onClick={fetchRecipes} className="generate-button">Generate Recipes</button>
//
//             <div className="recipe-grid">
//                 {recipes.map(r => (
//                     <div key={r.id} className="recipe-card">
//                         <img src={r.image} alt={r.title} />
//                         <h4>{r.title}</h4>
//                         <p>Used: {r.usedIngredientCount}, Missing: {r.missedIngredientCount}</p>
//                     </div>
//                 ))}
//             </div>
//
//         </div>
//     );
// }
