import React, {useCallback, useEffect, useState} from "react";
import {getCategory, updateCategory} from "../../../redux/services/categories";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import CategoryForm from "../../../ui/forms/CategoryForm";
import Auth from "../../../components/wrappers/Auth";
import {errorHelper} from "../../../common/Utility";


const CategoryUpdate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState('')
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    let {slug} = useParams();
    useEffect(() => {
        getCategory(slug)
            .then(r => {

                setName(r.data.category.name)
            })
            .catch(e => {
                console.log(e)
            })

    }, [slug])


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        updateCategory(slug, {name}, user.token)
            .then(r => {
                console.log(r)
                setLoading(false)
                setName('')
                toast.success(`${r.data.name} is updated`)
                navigate("/admin/category");


            })
            .catch((e) => {
                 const err = errorHelper(e)
                toast.error(err.err)
                setLoading(false)

            })

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
                                    label='Category name'
                                    loading={loading}
                                    handleSubmit={handleSubmit}
                                    setName={setName}/>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </Auth>


    );
};

export default CategoryUpdate;