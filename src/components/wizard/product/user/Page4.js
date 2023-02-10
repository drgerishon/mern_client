import React from 'react';
import {MDBInput} from "mdb-react-ui-kit";

const Page2 = ({values, handleChange}) => {

    const {
        quantity,
        brand
    } = values
    return (
        <>
            <div className="mb-3">
                <label className='label-title mb-3'>Quantity</label>
                <MDBInput
                    type="number"
                    name='quantity'
                    label='Quantity'
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label className='label-title mb-3'>Brand if any</label>
                <MDBInput
                    type="test"
                    label='brand'
                    name='brand'
                    className="form-control"
                    value={brand}
                    onChange={handleChange}/>
            </div>
        </>
    );
};

export default Page2;