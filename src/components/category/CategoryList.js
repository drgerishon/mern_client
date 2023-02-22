import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getCategories} from '../../redux/services/categories';
import ShopCategory from '../nav/mega/Mega';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories()
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const showCats = () => {
        return categories.map((category) => {
            return (
                <div className="col-md-4 mb-3" key={category._id}>
                    <div className="card card-hoverable">
                        <div className="card-body">
                            <Link to={`/category/${category.slug}`} className="card-link">
                                <h5 className="card-title">{category.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <section className='section-bg'>
            <div className="container my-5">
                <h2 className="text-center mb-4">Shop by Category</h2>
                <div className="row">
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : (
                        showCats()
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;
