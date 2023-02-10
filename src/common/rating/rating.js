import React from 'react';
import {Rating} from 'react-simple-star-rating'
import './rating.css'

export const showAverageRating = (product) => {

    if (product && product.rating && product.rating.length > 0) {
        let total = []
        product.rating.map(r => {
            total.push(r.star)
        })
        const sumOfStars = total.reduce((prev, next) => prev + next, 0)
        const maximumRating = product.rating.length * 5

        const averageRating = (sumOfStars * 5) / maximumRating

        return <Rating
            initialValue={averageRating}
            readonly
            fillColor='#FF5722'
            allowFraction
            size={18}/>

    } else {
        return <span  className='rating'>No ratings yet</span>
    }

};

