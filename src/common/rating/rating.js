import React from 'react';
import {Rating} from 'react-simple-star-rating'

export const showAverageRating = (product) => {

    if (product && product.rating && product.rating.length > 0) {
        let total = []
        product.rating.map(r => {
            total.push(r.star)
        })
        const sumOfStars = total.reduce((prev, next) => prev + next, 0)
        const maximumRating = product.rating.length * 5

        const averageRating = (sumOfStars * 5) / maximumRating

        return <span className='d-flex align-items-center '>
            <Rating
                initialValue={averageRating}
                readonly
                allowFraction
                size={25}/>
            ({product.rating.length})
        </span>
    } else {
        return 'No rating yet'
    }

};

