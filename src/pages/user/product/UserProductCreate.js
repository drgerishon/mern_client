import React, {useCallback, useEffect, useState} from 'react';
import FileUpload from "../../../ui/forms/FileUpload";
import Page1 from "../../../components/wizard/product/user/Page1";
import Page2 from "../../../components/wizard/product/user/Page2";
import {getCategories, getCategorySubs} from "../../../redux/services/categories";
import {MDBBtn, MDBSpinner} from "mdb-react-ui-kit";
import Page3 from "../../../components/wizard/product/user/Page3";
import Page4 from "../../../components/wizard/product/user/Page4";
import {createProduct} from "../../../redux/services/product.service";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const UserProductCreate = () => {
    const initialState = {
        title: '',
        description: '',
        price: '',
        shipping: '',
        category: [],
        subs: [],
        type: '',
        species: '',
        categories: [],
        quantity: '',
        images: [],
        brand: ''
    }
    const {user} = useSelector((state) => state.auth);
    const [values, setValues] = useState(initialState)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [subOptions, setSubOption] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [selectedSub, setSelectedSub] = useState([])


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


    const handleCategoryChange = cat => {
        setSelectedSub([])
        setValues({...values, category: cat})
        getCategorySubs(cat._id).then(r => {
            setSubOption(r.data)
        })
        setShowSub(true)

    };

    const handleChange = event => {
        setValues({...values, [event.target.name]: event.target.value})
    };




    function displayPage() {
        if (page === 0) {
            return <Page1
                values={values}
                handleCategoryChange={handleCategoryChange}
                subOptions={subOptions}
                loading={loading}
                setValues={setValues}
                setLoading={setLoading}
                setSelectedSub={setSelectedSub}
                selectedSub={selectedSub}
                showSub={showSub}/>
        }
        if (page === 1) {
            return <Page2 values={values} handleChange={handleChange}/>
        }
        if (page === 2) {
            return <Page3 values={values} handleChange={handleChange}/>
        }
        if (page === 3) {
            return <Page4 values={values} handleChange={handleChange}/>
        }
    }

    const FormTitles = [
        {name: "Category, Sub category and Images", id: 'cat-subs-images'},
        {name: "Title, description and species", id: 'title-description and species'},
        {name: "Shipping and price", id: 'shipping-price'},
        {name: "Quantity and brand", id: 'quantity-brand'},
    ];


    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = {
            title: values.title,
            description: values.description,
            price: values.price,
            shipping: values.shipping,
            category: values.category._id,
            subs: values.subs,
            type: values.type,
            species: values.species,
            categories: values.categories,
            quantity: values.quantity,
            images: values.images,
            brand: values.brand

        }


        createProduct(formData, user.token)
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

    function toggleActive() {

    }

    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="card mb-3">
                    <div className='card-header'>
                        <h5 className="card-title">Provide all relevant details about your product</h5>
                        {page === 0 && <p>{FormTitles[0].name}</p>}
                        {page === 1 && <p>{FormTitles[1].name}</p>}
                        {page === 2 && <p>{FormTitles[2].name}</p>}
                        {page === 3 && <p>{FormTitles[3].name}</p>}
                    </div>
                    <div className="card-body">
                        <div className="pt-4 pb-2">
                            <form>
                                {displayPage()}
                            </form>
                        </div>
                    </div>

                    <div className='card-footer'>
                        <div className="d-flex align-items-center justify-content-between">
                            <MDBBtn
                                onClick={() => {
                                    setPage((currPage) => currPage - 1);
                                }}
                                type='button'
                                className={page === 0 ? ' hidden' : 'btn btn-secondary'}
                                disabled={loading}>
                                Previous
                            </MDBBtn>

                            <MDBBtn
                                type='button'
                                className=' btn btn-primary  '
                                disabled={loading}
                                onClick={(e) => {
                                    if (page === FormTitles.length - 1) {
                                        handleSubmit(e)
                                    } else {
                                        setPage((currPage) => currPage + 1);
                                        toggleActive()
                                    }
                                }}>

                                {page === FormTitles.length - 1 ? <>
                                    {loading ? <>
                                            <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                            Loading...
                                        </> :
                                        'Submit'}

                                </> : "Next"}


                            </MDBBtn>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProductCreate;