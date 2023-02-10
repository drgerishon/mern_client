import React from 'react';


const Page2 = ({values, handleChange}) => {

    const {
        price,
       shipping
    } = values
    return (
        <>
            <div className="mb-3 label-title">
                <label>Price</label>
                <input
                    type="number"
                    name='price'
                    className="form-control"
                    value={price}
                    onChange={handleChange}/>
            </div>


            <div className="mb-3 label-title">
                <label>Shipping</label>
                <select className="form-select "
                        name='shipping' onChange={handleChange} value={shipping}>
                    <option>Please select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

        </>
    );
};

export default Page2;