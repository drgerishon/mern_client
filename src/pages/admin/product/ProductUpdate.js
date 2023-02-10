// import React, {useCallback, useEffect, useState} from 'react';
// import {useSelector} from "react-redux";
//
// import {useNavigate, useParams} from "react-router-dom";
//
// import ProductUpdateForm from "../../../ui/forms/ProductUpdateForm";
// import FileUpload from "../../../ui/forms/FileUpload";
// import {toast} from "react-toastify";
// import {getProduct, updateProduct} from "../../../redux/services/product.service";
// import {getCategories, getCategorySubs} from "../../../redux/services/categories";
//
// const initialState = {
//     description: '',
//     price: '',
//     shipping: '',
//     category: '',
//     subs: [],
//     type: '',
//     species: '',
//     categories: [],
//     quantity: '',
//     images: [],
//     brand: ''
// }
//
// const ProductUpdate = (props) => {
//     const {user} = useSelector((state) => state.auth)
//     const [values, setValues] = useState(initialState)
//     const [subOptions, setSubOptions] = useState([])
//     const [categories, setCategories] = useState([])
//     const [arrayOfSubs, setArrayOfSubs] = useState([])
//     const [loading, setLoading] = useState('')
//     const [selectedCategory, setSelectedCategory] = useState('')
//
//
//     let {slug} = useParams();
//     let navigate = useNavigate()
//
//
//     useEffect(() => {
//         loadProduct()
//         loadCategories()
//     }, [loadProduct, loadCategories])
//
//
//     useEffect(() => {
//         let myArr = []
//         arrayOfSubs.map(({_id}) => myArr.push(_id))
//         setValues((values) => ({...values, subs: myArr}))
//     }, [arrayOfSubs.length, arrayOfSubs])
//
//
//     const loadProduct = useCallback(() => {
//         getProduct(slug)
//             .then(r => {
//                 setValues((values => ({...values, ...r.data})))
//                 getCategorySubs(r.data.category._id)
//                     .then((res) => {
//                         setSubOptions(res.data)
//                     }).catch(e => {
//                     console.log(e)
//                 })
//
//                 let myArray = []
//                 r.data.subs.map(sub => (
//                     myArray.push(sub)
//                 ))
//                 setArrayOfSubs((prevState => myArray))
//
//             })
//             .catch(e => {
//                 console.log(e)
//             })
//     }, [slug])
//
//
//     const loadCategories = useCallback(() => {
//         getCategories()
//             .then(r => {
//                 setCategories(r.data)
//             })
//             .catch(e => {
//                 console.log(e)
//             })
//     }, [])
//
//
//     function handleSubmit(e) {
//         e.preventDefault()
//         setLoading(true)
//
//         console.log(selectedCategory)
//         let myArr = []
//         arrayOfSubs.map(({_id}) => myArr.push(_id))
//         values.subs = myArr
//         values.category = selectedCategory ? selectedCategory : values.category
//
//         updateProduct(slug, values, user.token)
//             .then(r => {
//                 setLoading(false)
//                 toast.success(`${r.data.title} is updated`, {
//                     position: toast.POSITION.BOTTOM_CENTER
//                 });
//                 navigate("/admin/products");
//
//
//             }).catch(e => {
//             setLoading(false)
//             console.log(e.response)
//             toast.error(e.response.data.error)
//
//         })
//
//     }
//
//     function handleChange(event) {
//         setValues({...values, [event.target.name]: event.target.value})
//     }
//
//
//     function handleCategoryChange(event) {
//         event.preventDefault()
//         setSelectedCategory(event.target.value)
//         getCategorySubs(event.target.value).then(r => {
//             setSubOptions(r.data)
//         })
//         if (values.category._id === event.target.value) {
//             loadProduct()
//         }
//         setArrayOfSubs([])
//
//
//     }
//
//
//     return (
//         <div className="row">
//             <div className="col-lg-8">
//                 <div className="card mb-3">
//                     <div className="card-body">
//                         <div className="pt-4 pb-2">
//                             <h5 className="card-title  pb-0 fs-2 ">Product create</h5>
//                             <FileUpload
//                                 values={values}
//                                 setValues={setValues}
//                                 setLoading={setLoading} loading={loading}/>
//                             <ProductUpdateForm
//                                 values={values}
//                                 setValues={setValues}
//                                 handleChange={handleChange}
//                                 handleSubmit={handleSubmit}
//                                 categories={categories}
//                                 subOptions={subOptions}
//                                 arrayOfSubs={arrayOfSubs}
//                                 setArrayOfSubs={setArrayOfSubs}
//                                 handleCategoryChange={handleCategoryChange}
//                                 selectedCategory={selectedCategory}
//
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProductUpdate;


import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import ProductUpdateForm from "../../../ui/forms/ProductUpdateForm";
import FileUpload from "../../../ui/forms/FileUpload";
import {toast} from "react-toastify";
import {getProduct, updateProduct} from "../../../redux/services/product.service";
import {getCategories, getCategorySubs} from "../../../redux/services/categories";

const initialState = {
    description: '',
    price: '',
    shipping: '',
    category: '',
    title: '',
    subs: [],
    type: '',
    species: '',
    categories: [],
    quantity: '',
    images: [],
    brand: ''
}


const ProductUpdate = () => {
    const {user} = useSelector((state) => state.auth)
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [categories, setCategories] = useState([])
    const [arrayOfSubs, setArrayOfSubs] = useState([])
    const [loading, setLoading] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    let {slug} = useParams();
    let navigate = useNavigate()


    const loadProduct = useCallback(() => {
        getProduct(slug)
            .then(r => {
                setValues((values => ({...values, ...r.data})))
                getCategorySubs(r.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data)
                    }).catch(e => {
                    console.log(e)
                })

                let myArray = []
                r.data.subs.map(sub => (
                    myArray.push(sub)
                ))
                setArrayOfSubs((prevState => myArray))

            })
            .catch(e => {
                console.log(e)
            })
    }, [slug])


    const loadCategories = useCallback(() => {
        getCategories()
            .then(r => {
                setCategories(r.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])


    useEffect(() => {
        loadCategories()
        loadProduct()
    }, [loadCategories, loadProduct])


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        let myArr = []
        arrayOfSubs.map(({_id}) => myArr.push(_id))
        values.subs = myArr
        values.category = selectedCategory ? selectedCategory : values.category

        updateProduct(slug, values, user.token)
            .then(r => {
                setLoading(false)
                toast.success(`${r.data.title} is updated`, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                loadProduct()
                // navigate("/admin/products");

            }).catch(e => {
            setLoading(false)
            console.log(e.response)
            toast.error(e.response.data.error)

        })

    }

    function handleChange(event) {
        setValues({...values, [event.target.name]: event.target.value})
    }


    function handleCategoryChange(event) {
        event.preventDefault()
        setSelectedCategory(event.target.value)
        getCategorySubs(event.target.value).then(r => {
            setSubOptions(r.data)
        })
        if (values.category._id === event.target.value) {
            loadProduct()
        }
        setArrayOfSubs([])


    }


    return (
        <div className="row">
            <div className="col-lg-8 mt-0">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="pt-0 pb-2">
                            <h5 className="card-title  pb-0 fs-2 ">{values.title}</h5>
                            <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading} loading={loading}/>
                            <ProductUpdateForm
                                values={values}
                                setValues={setValues}
                                loading={loading}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                categories={categories}
                                subOptions={subOptions}
                                arrayOfSubs={arrayOfSubs}
                                setArrayOfSubs={setArrayOfSubs}
                                handleCategoryChange={handleCategoryChange}
                                selectedCategory={selectedCategory}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductUpdate;