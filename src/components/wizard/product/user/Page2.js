import React from 'react';
import {MDBInput} from "mdb-react-ui-kit";

const Page2 = ({values, handleChange}) => {

    const {
        title,
        description,
        type
    } = values
    return (
        <>
            <div className="mb-3">
                <label className=' label-title'>Title of the product</label>
                <input
                    type="text"
                    name='title'
                    className="form-control"
                    value={title}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className=' label-title'>Describe your product</label>
                <textarea rows={5}
                          name='description'
                          className="form-control"
                          value={description}
                          onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label className=' label-title'>Type or Species of the product if any </label>
                <input
                    type="text"
                    name='type'
                    className="form-control"
                    value={type}
                    onChange={handleChange}/>
            </div>
        </>
    );
};

export default Page2;