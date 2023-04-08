import React from 'react';
import ProductListing from './ProductListing';

const BestSellers = () => {
    return (
        <ProductListing
            title="Best Sellers"
            sortField="sold"
            jumbotronTexts={['Best selling']}
        />
    );
};

export default BestSellers;
