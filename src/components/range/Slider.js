import React, {useEffect, useState,} from "react";

import "./multiRangeSlider.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";


const MultiRangeSlider = ({value, min, max, handleChange}) => {
    const defaultVal = [min, max]
    return (
        <>
            <RangeSlider
                id='range-slider-yellow'
                min={min} max={max}
                value={value} defaultValue={defaultVal}
                onInput={handleChange}/>
            <div className='slider-wrapper'>
                <div className='first'><span>Min :</span>{value[0]}</div>
                <span className='middle '>-</span>
                <div className='last '><span>Max:</span>{value[1]}</div>
            </div>

        </>

    )
}
export default MultiRangeSlider;
