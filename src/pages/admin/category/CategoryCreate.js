// import AdminNav from "../../../components/nav/AdminNav";
import React, {useEffect, useState} from "react";
import {createCategory, getCategories, removeCategory} from "../../../services/categories";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";
import CategoryForm from "../../../ui/forms/CategoryForm";
import LocalSearch from "../../../ui/forms/LocalSearch";
import Auth from "../../../components/wrappers/Auth";
import './Category.css'
import {errorHelper} from "../../../common/Utility";
// import Swal from "sweetalert2";
import {withSwal} from "react-sweetalert2";

const CategoryCreate = ({swal}) => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState('')
    const {user} = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([])
    //search
    // step1
    const [keyword, setKeyword] = useState('')


    useEffect(() => {
        loadCategories()
    }, [])

    function loadCategories() {
        getCategories()
            .then(r => {
                setCategories(r.data)

            })
            .catch(e => {
                console.log(e)
            })
    }


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        createCategory({name}, user.token)
            .then(r => {
                setLoading(false)
                setName('')
                loadCategories()
                toast.success(`${r.data.name} is created`)


            })
            .catch((error) => {
                const err = errorHelper(error)
                toast.error(err.err)
                setLoading(false)
            })
    }


    function handleRemove(slug) {

        swal.fire({
            titleText: 'Are you sure? ',
            text: 'All sub categories associated with it will also be deleted!.You won\'t be able to revert this! ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return removeCategory(slug, user.token)
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
                    text: `${result.value.data.name} Removed`,
                }).then(r => {
                    setLoading(false)
                    loadCategories()
                })
            } else if (result.isDismissed) {
                swal.fire({text: 'Changes are not saved', icon: 'info', timer: 1500}).then(r => {
                    setLoading(false)
                })
            }
        })
    }

    function showCategories() {

//step4
        function searched(keyword) {
            return function (c) {
                return c.name.toLowerCase().includes(keyword);
            };
        }

        // step 5
        return categories.filter(searched(keyword)).map(category => (
            <div key={category._id} className='alert alert-secondary py-2  d-flex align-items-center mt-2 '>
                <div className='fs-6'>{category.name}</div>
                <div className='ms-auto d-flex  align-items-center'>
                    <Link to={`/admin/category/${category.slug}`}>
                        <span className='btn btn-info btn-sm float-end ' style={{marginRight: '20px'}}>
                            <Icon icon="ant-design:edit-outlined" className='text-white' fontSize={16}/>
                        </span>
                    </Link>

                    <span className='btn  btn-sm btn-danger ' onClick={() => handleRemove(category.slug)}
                    >
                        <Icon icon="ant-design:delete-outlined" fontSize={16}/>
                    </span>


                </div>
            </div>
        ))
    }

    return (
        <Auth>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="pt-4 pb-2">
                                <h5 className="card-title  pb-0 fs-2 ">Manage categories </h5>

                                <p className="small">Create, Read,Update,Filter/Search and Delete Categories.</p>
                                <CategoryForm
                                    name={name}
                                    label='Enter category name'
                                    loading={loading}
                                    handleSubmit={handleSubmit}
                                    setName={setName}/>
                                <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
                                {showCategories()}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </Auth>
    );
};

export default withSwal(CategoryCreate);