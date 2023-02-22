import React from 'react';
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubsList from "../components/subs/SubsList";

const Home = () => {
    return (
        <>
            <Jumbotron text={['New arrivals', "Quality Products", 'Discounted Prices', "24/7 Support"]}/>

            <NewArrivals/>


            {/*<BestSellers/>*/}


            <CategoryList/>


            <SubsList/>
        </>
    );
};

export default Home;