import React from 'react';
import ProductListing from './ProductListing';

const NewArrivals = () => {
    return (
        <ProductListing
            sectionClass='section-bg'
            title="New Arrivals"
            sortField="createdAt"
            jumbotronTexts={[
                'New arrivals',
                'Fresh from the farm',
                'Latest harvest',
                'Just in',
            ]}
        />
    );
};

export default NewArrivals;
