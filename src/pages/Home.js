import React from 'react';
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubsList from "../components/subs/SubsList";

const Home = () => {

    return (
        <div className={'container-fluid'}>
            <Jumbotron text={['New arrivals', "Quality Products", 'Discounted Prices', "24/7 Support"]}/>
            <h2 className='text-center  p-2 my-3 ' style={{background: '#f3f5fa'}}>
                New Arrivals
            </h2>
            <NewArrivals/>
            <br/>

            <h2 className='text-center  p-2 my-3 ' style={{background: '#f3f5fa'}}>
                Best Sellers
            </h2>
            <BestSellers/>

            <h2 className='text-center  p-2 my-3 ' style={{background: '#f3f5fa'}}>
                <h2>Categories</h2>
            </h2>
            <CategoryList/>

            <h2 className='text-center  p-2 my-3 ' style={{background: '#f3f5fa'}}>
                <h2>Sub Categories</h2>
            </h2>
            <SubsList/>
        </div>
    );
};

export default Home;