import React, {useEffect, useRef, useState} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {createProduct} from "../../../functions/product";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories, getCategorySubs} from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";


const initialState = {
    title: 'Tomatoes',
    description: 'Lorem ipsum dolor sit  eleifend mi, at hendrerit nunc augue gravida lorem.',
    price: '600',
    shipping: 'Yes',
    category: '',
    subs: [],
    categories: [],
    quantity: '100',
    images: [],
    colors: ["Black", "Brown", "Silver", "Blue", "White"],
    brands: ["Apple", "Microsoft", "Samsung", "Redmi","Infinix", "Lenovo"],
    color: 'Black',
    brand: ''
}
const ProductCreate = () => {
    const [values, setValues] = useState(initialState)
    const {user} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState('')
    const [subOptions, setSubOption] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [selectedSub, setSelectedSub] = useState([])
    //test


    //end test

    useEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        let myArr = []
        selectedSub.map(({_id}) => myArr.push(_id))
        setValues({...values, subs: myArr})
    }, [selectedSub.length])


    function loadCategories() {
        getCategories()
            .then(r => {
                setValues({...values, categories: r.data})

            })
            .catch(e => {
                console.log(e)
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        createProduct(values, user.token)
            .then(r => {

                window.alert(`${r.data.title} is created successfully`)
                window.location.reload()

                setLoading(false)

            }).catch(e => {
            // if (e.response.status === 400) {
            //     toast.error(e.response.data)
            // }
            console.log(e.response)
            toast.error(e.response.data.error)
            setLoading(false)
        })
    }


    function handleChange(event) {
        setValues({...values, [event.target.name]: event.target.value})

    }


    function handleCategoryChange(event) {
        event.preventDefault()
        setSelectedSub([])
        setValues({...values, category: event.target.value})
        getCategorySubs(event.target.value).then(r => {
            setSubOption(r.data)
        })
        setShowSub(true)

    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-8 mx-auto">
                    <h4>Product Create</h4>
                    <hr/>
                    <FileUpload
                        values={values}
                        setValues={setValues}
                        setLoading={setLoading} 
                        loading={loading}/>
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
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
    );
};

export default ProductCreate;