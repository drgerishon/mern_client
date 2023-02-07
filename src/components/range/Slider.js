import React, {useEffect, useState,} from "react";

import "./multiRangeSlider.css";
import {minMax} from "../redux/services/product.service";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";


const MultiRangeSlider = ({value, min, max, handleChange}) => {
    const defaultVal = [min, max]

    const [price2, setPrice2] = useState([0, 0])
    console.log('p2', price2)

    const handleChange2 = (e) => {
        e.preventDefault();


    }


    return (
        <>
            <RangeSlider min={min} max={max} value={value} defaultValue={defaultVal} onInput={handleChange}/>
            <div className='slider-wrapper'>
                <div className='first'><span>Lowest :</span>{value[0]}</div>
                <span className='middle '>-</span>
                <div className='last '><span>Highest:</span>{value[1]}</div>
            </div>

        </>

    )
}
export default MultiRangeSlider;
