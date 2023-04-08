import React from 'react';
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubsList from "../components/subs/SubsList";
import Hero from "../components/home/Hero";

const Home = () => {
    return (
        <>

            <Hero/>
            <NewArrivals/>
            <BestSellers/>

            {/*<CategoryList/>*/}


            {/*<SubsList/>*/}
        </>
    );
};

export default Home;