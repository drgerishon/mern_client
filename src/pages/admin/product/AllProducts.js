import React, {useEffect, useState} from 'react';
import ProductCard from "../../../components/cards/ProductCard";
import {useSelector} from "react-redux";
import {getProductsByCount, removeProduct} from "../../../redux/services/product.service";
import {withSwal} from "react-sweetalert2";
import {useNavigate} from "react-router-dom";


const AllProducts = ({swal}) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => state.auth);
    useEffect(() => {
        loadAllProductsByCount()

    }, [])
    const navigate = useNavigate()
    const loadAllProductsByCount = () => {
        setLoading(true)
        getProductsByCount(100)
            .then(r => {
                setProducts(r.data)
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })
    };



    const handleRemove = slug => {
        swal.fire({
            titleText: 'Are you sure? ',
            text: 'This operation cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return removeProduct(slug, user.token)
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error(response.statusText)
                        }
                        return response
                    })
                    .catch(error => {
                        swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {


            if (result.isConfirmed) {
                swal.fire({
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: '#3085d6',
                    text: `${result.value.data.title} Removed`,
                }).then(r => {
                    setLoading(false)
                    loadAllProductsByCount()
                })
            } else if (result.isDismissed) {
                swal.fire({text: 'Cancelled', icon: 'info', timer: 1500}).then(r => {
                    setLoading(false)
                })
            }
        })


    };


    return (
        <div className="row">
            <h5> {loading ? "loading..." : products.length > 0 ? 'Products' : 'No products'}</h5>
            {
                products.map(product => <div
                        className='col-lg-4 col-md-6 mb-3'
                        key={product._id}>
                        <ProductCard
                            product={product}
                            variant1='primary'
                            btnCaption1='Edit'
                            btnCaption2='Delete'
                            variant2='danger'
                            btn1Clicked={() => {
                                navigate(`/admin/product/${product.slug}`)
                            }}
                            btn2Clicked={() => handleRemove(product._id)}
                        />
                    </div>
                )
            }
        </div>


    );
};

export default withSwal(AllProducts);