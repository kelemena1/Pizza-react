import { useNavigate } from 'react-router-dom';

export function PizzaCreatePage() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://pizza.kando-dev.eu/Pizza', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: e.target.elements.name.value,
                    isGlutenFree: e.target.elements.isGlutenFree.checked ? 1 : 0,
                    kepURL: e.target.elements.imageURL.value,

                }),
            });

            if (!response.ok) {
                throw new Error(`Sikertelen POST kérés, státuszkód: ${response.status}`);
            }

            navigate('/PizzaList');
        } catch (error) {
            console.error('Hiba történt a POST kérés során:', error);
        }
    };

    return (
        <div className='p-5 content bg-whitesmoke text-center'>
            <h2>Új pizza</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group row pb-3'>
                    <label htmlFor='name' className='col-sm-3 col-form-label'>
                        Név:
                    </label>
                    <div>
                        <input type='text' id='name' name='name' className='form-control' autoComplete='name' />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <div className='col-sm-3'>Gluténmentes:</div>
                    
                        <input  type='checkbox' id='isGlutenFree' name='isGlutenFree' />
                    
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor='imageURL' className='col-sm-3 col-form-label'>
                        Kép URL:
                    </label>
                    <div>
                        <input type='text' id='imageURL' name='imageURL' className='form-control' autoComplete='imageURL' />
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>
                    Küldés
                </button>
            </form>
        </div>
    );
}

export default PizzaCreatePage;
