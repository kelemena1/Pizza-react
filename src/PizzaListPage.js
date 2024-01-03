import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function PizzaListPage() {
    const [pizzas, setPizzas] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setFetchPending(true);
        fetch('https://pizza.kando-dev.eu/Pizza')
            .then((res) => res.json())
            .then((pizzak) => setPizzas(pizzak))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, [count]);

    const handleRemoveFromMenu = async (pizzaId) => {
        const confirmation = window.confirm('Biztosan le akarod venni ezt a pizzát az étlapról?');
    
        if (confirmation) {
            try {
                const response = await fetch(`https://pizza.kando-dev.eu/Pizza/${pizzaId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Sikertelen törlés, státuszkód: ${response.status}`);
                }

                await response.json();

                setPizzas((prevPizzas) => prevPizzas.filter((pizza) => pizza.id !== pizzaId));
                
            } catch (error) {
                console.error('Törlési hiba:', error);
            } finally 
            {
                await setCount((prevCount) => prevCount + 1);
                navigate('/');
                
                
            }
        }
    };

    const handleModifyPizza = (pizzaId) => {
        console.log(pizzaId);
        navigate(`/mod-pizza/${pizzaId}`);
    };

    return (
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isFetchPending ? (<div className='spinner-border'></div>) : (
                <div>
                    <h2>Pizzák</h2>
                    {pizzas.map((pizza) => (
                        <div key={pizza.id} className='card col-sm-3 d-inline-block m-1 p-2'>
                            <h6 className='text-muted'>{pizza.name}</h6>
                            <div>{pizza.isGlutenFree ? 'Gluténmentes' : 'Nem gluténmentes'}</div>
                            <NavLink key={pizza.id} to={`/pizza/${pizza.id}`}>
                                <div className='card-body'>
                                    <img
                                        className='img-fluid'
                                        style={{ maxHeight: 200 }}
                                        alt="Pizza képe"
                                        src={pizza.kepURL ? pizza.kepURL : "https://via.placeholder.com/400x800"}
                                    />
                                </div>
                            </NavLink>
                            <div>
                                <button
                                    onClick={() => handleRemoveFromMenu(pizza.id)}
                                    className='btn btn-danger'
                                >
                                    Levétel az étlapról
                                </button>
                               
                                <button
                                    onClick={() => handleModifyPizza(pizza.id)}
                                    className='btn btn-primary'
                                >
                                    Módosítás
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PizzaListPage;
