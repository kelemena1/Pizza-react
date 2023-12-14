import { useNavigate } from 'react-router-dom';

export function InstrumentCreatePage() {
const navigate = useNavigate();

return (
    <div className='p-5 content bg-whitesmoke text-center'>
        <h2>Új hangszer</h2>
        <form
        onSubmit={(e) => {
            e.persist();
            e.preventDefault();
            fetch("https://kodbazis.hu/api/instruments", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    name: e.target.elements.name.value,
                    price: e.target.elements.price.value,
                    quantity: e.target.elements.quantity.value,
                    imageURL: e.target.elements.imageURL.value,
                }),
            })
            .then(() => {
                navigate("/");
            })
            .catch(console.log);
        }}
            >
            <div className='form-group row pb-3'>
                <label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
                    <div>
                        <input type="text" id="name" name="name" className="form-control" autoComplete='name' />
                    </div>
            </div>
            <div className='form-group row pb-3'>
                <label htmlFor="price" className='col-sm-3 col-form-label'> Ár: </label>
                    <div>
                        <input type="number" id="price" name="price" className="form-control" autoComplete='price' />
                    </div>
            </div>
            <div className='form-group row pb-3'>
                <label htmlFor="quantity" className='col-sm-3 col-form-label'> Darabszám: </label>
                    <div>
                        <input type="number" id="quantity" name="quantity" className="form-control" autoComplete='quantity' />
                    </div>
            </div>
            <div className='form-group row pb-3'>
                <label htmlFor="imageURL" className='col-sm-3 col-form-label'> Kép URL: </label>
                    <div>
                        <input type="text" id="imageURL" name="imageURL" className="form-control" autoComplete='imageURL' />
                    </div>
            </div>
            <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        
    </div>
);
}