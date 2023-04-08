import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import {getSub} from "../../services/sub.service";


const SubHome = () => {
    const {slug} = useParams()

    const [sub, setSub] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSub(slug).then(r => {
            setSub(r.data.sub)
            setProducts(r.data.products)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [slug])

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col">
                    {loading ?
                        <h4 className='p-3  text-center  fw-bold my-5' style={{background: '#f3f5fa'}}>
                            <p>loading</p>
                        </h4> :
                        <h4 className='p-3 text-center  fw-bold my-5' style={{background: '#f3f5fa'}}>
                            {products.length} products in {sub.name} sub cat
                        </h4>

                    }

                </div>
            </div>
            <div className="container">
                <div className="row">
                    {products.map(product => <div
                            className='col-lg-4 col-md-6 mb-3'
                            key={product._id}>
                            <ProductCard
                                product={product}
                                loading={loading}
                            />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SubHome;