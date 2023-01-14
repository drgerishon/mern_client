import React, {useEffect, useState} from "react";
import {createSub, getSubs, removeSub} from "../../../redux/services/sub.service";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";
import CategoryForm from "../../../ui/forms/CategoryForm";
import LocalSearch from "../../../ui/forms/LocalSearch";
import {getCategories} from "../../../redux/services/categories";
import Auth from "../../../components/wrappers/Auth";
import {errorHelper} from "../../../common/Utility";

const SubCreate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState('')
    const {user} = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [subs, setSubs] = useState([])
    const [keyword, setKeyword] = useState('')


    useEffect(() => {
        loadCategories()
        loadSubs()
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

    function loadSubs() {
        getSubs()
            .then(r => {
                setSubs(r.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        createSub({name, parent: category}, user.token)
            .then(r => {

                setLoading(false)
                setName('')
                toast.success(`${r.data.name} added`)
                loadSubs()


            })
            .catch((e) => {
                 const err = errorHelper(e)
                toast.error(err.err)
                setLoading(false)

            })


    }


    async function handleRemove(slug) {

        if (window.confirm('Are you sure you want to delete this Sub category?')) {
            setLoading(true)
            removeSub(slug, user.token)
                .then(r => {
                    setLoading(false)
                    toast.success(`${r.data.name} deleted`)
                    loadSubs()

                })
                .catch(e => {
                    if (e.response.status === 400) {
                        toast.error(e.response.data)
                    }
                    setLoading(false)
                })

        }
    }

    function selectCats() {
        return <select className="form-select mb-3 mt-3" name='select' onChange={e => (setCategory(e.target.value))}>
            <option>Please select</option>
            {categories.length > 0 && categories.map(category => {
                return <option value={category._id} key={category._id}>{category.name}</option>
            })}
        </select>

    }

    function showSubs() {
        function searched(keyword) {
            return function (c) {
                return c.name.toLowerCase().includes(keyword);
            };
        }


        return subs.filter(searched(keyword)).map(sub => (
            <div key={sub._id} className='alert alert-secondary py-2 mt-3'>
                {sub.name}
                <span
                    className='btn bt-raised btn-sm btn-danger float-end ' onClick={() => handleRemove(sub.slug)}>
                    <Icon icon="ant-design:delete-outlined"/>
                </span>

                <Link to={`/admin/sub/${sub.slug}`}>
                    <span className='btn bt-raised btn-sm float-end mx-4'>
                        <Icon icon="ant-design:edit-outlined"
                              className='text-warning'/>
                    </span>
                </Link>
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
                                <h5 className="card-title  pb-0 fs-2 ">Manage Sub categories </h5>
                                <p className="small">Create, Read,Update,Filter/Search and Delete Sub Categories.</p>
                                <h5>Parent Category</h5>
                                {selectCats()}

                                <CategoryForm
                                    name={name}
                                    label={'Sub category name *'}
                                    loading={loading}
                                    handleSubmit={handleSubmit}
                                    setName={setName}/>
                                <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
                                {showSubs()}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </Auth>
    );
};

export default SubCreate;