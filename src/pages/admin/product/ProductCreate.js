import React, {useCallback, useEffect, useState} from 'react';
import {createProduct} from "../../../redux/services/product.service";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ProductCreateForm from "../../../ui/forms/ProductCreateForm";
import {getCategories, getCategorySubs} from "../../../redux/services/categories";

import FileUpload from "../../../ui/forms/FileUpload";


const initialState = {
    title: '',
    description: '',
    price: '',
    shipping: '',
    category: '',
    subs: [],
    type: '',
    species: '',
    categories: [],
    quantity: '',
    images: [],
    brand: ''
}
const ProductCreate = () => {
    const [values, setValues] = useState(initialState)
    const {user} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)
    const [subOptions, setSubOption] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [selectedSub, setSelectedSub] = useState([])
    //test

    const loadCategories = useCallback(() => {
        getCategories()
            .then(r => {
                setValues(values => ({...values, categories: r.data}))
            })
            .catch(e => {
                console.log(e)
            })
    }, [setValues])

    useEffect(() => {
        loadCategories()
    }, [loadCategories])


    useEffect(() => {
        let myArr = []
        selectedSub.map(({_id}) => myArr.push(_id))
        setValues((values) => ({...values, subs: myArr}))
    }, [selectedSub.length, selectedSub])


    const handleChange = event => {
        setValues({...values, [event.target.name]: event.target.value})
    };


    const handleCategoryChange = event => {
        event.preventDefault()
        setSelectedSub([])
        setValues({...values, category: event.target.value})
        getCategorySubs(event.target.value).then(r => {
            setSubOption(r.data)
        })
        setShowSub(true)

    };
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)

        createProduct(values, user.token)
            .then(r => {
                setValues({
                    ...values, title: '',
                    description: '',
                    price: '',
                    shipping: '',
                    category: '',
                    subs: [],
                    type: '',
                    species: '',
                    categories: [],
                    quantity: '',
                    images: [],
                    brand: ''
                })
                toast.success(`${r.data.title} is created `, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                loadCategories()
                setLoading(false)

            }).catch(e => {
            // if (e.response.status === 400) {
            //     toast.error(e.response.data)
            // }
            console.log(e.response)

            toast.error(e.response.data.error, {
                position: toast.POSITION.BOTTOM_CENTER
            });

            setLoading(false)
        })

    }

    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="pt-4 pb-2">
                            <h5 className="card-title  pb-0 fs-2 ">Product create</h5>
                            <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                                loading={loading}/>
                            <ProductCreateForm
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                values={values}
                                loading={loading}
                                handleCategoryChange={handleCategoryChange}
                                subOptions={subOptions}
                                setSubOptions={setSubOption}
                                showSub={showSub}
                                setValues={setValues}
                                selectedSub={selectedSub}
                                setSelectedSub={setSelectedSub}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;