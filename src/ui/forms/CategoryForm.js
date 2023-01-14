import React from 'react';
import {MDBBtn, MDBInput, MDBValidation, MDBValidationItem} from "mdb-react-ui-kit";

const CategoryForm = ({handleSubmit, loading,label, name, setName}) => {
    return (
        <form onSubmit={handleSubmit} className='row gy-3'>

            <div className='col-12'>
                <MDBInput
                    type="text"
                    autoFocus
                    label={label}
                    required
                    id='form1'
                    className="form-control"
                    disabled={loading}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className='col-12 mb-3'>
                <MDBBtn type='submit' disabled={!name || loading}>{loading ? 'Submitting' : 'Submit'} </MDBBtn>
            </div>

        </form>
    );
};

export default CategoryForm;