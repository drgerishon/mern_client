import React from 'react';
import {Rating} from 'react-simple-star-rating'

const Star = ({starClick, numberOfStar,checked}) => {
    return (
        <>
            <div className="form-check">
                <input className="form-check-input"
                       onChange={starClick}
                       type="checkbox"
                       checked={checked}
                       value={numberOfStar}
                       id={numberOfStar}/>
                <label className="form-check-label" htmlFor={numberOfStar}>
                    <Rating initialValue={numberOfStar}
                    readonly
                    size={25}/>
                </label>
            </div>

        </>
    );
};

export default Star;