import React, {useEffect, useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import CategoryForm from "../../../ui/forms/CategoryForm";
import {getSub, updateSub} from "../../../services/sub.service";
import {getCategories} from "../../../services/categories";
import Auth from "../../../components/wrappers/Auth";


const SubUpdate = () => {
    const [name, setName] = useState('')
    const [parent, setParent] = useState('')
    const [loading, setLoading] = useState('')
    const {user} = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([])

    let {slug} = useParams();
    const navigate = useNavigate();


    const loadSub = useCallback(() => {
        getSub(slug)
            .then(r => {
                setName(r.data.sub.name)
                setParent(r.data.parent)
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
        }
        , [])

    useEffect(() => {
        loadSub()
        loadCategories()
    }, [loadSub, loadCategories])


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        updateSub(slug, {name, parent}, user.token)
            .then(r => {
                setLoading(false)
                setName('')
                setParent('')
                toast.success(`${r.data.name} is updated`)
                navigate("/admin/sub");


            })
            .catch((e) => {
                if (e.response.status === 400) {
                    toast.error(e.response.data)
                }
                setLoading(false)

            })


    }

    function selectCats() {
        return <select
            className="form-select mb-3 mt-3"
            name='select'
            value={parent ? parent._id : ''}
            onChange={e => (setParent(e.target.value))}>
            {categories.length > 0 && categories.map(category => {
                return <option
                    value={category._id} key={category._id}
                >{category.name}
                </option>
            })}
        </select>

    }

    return (
        <Auth>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="pt-4 pb-2">
                                <h5 className="card-title  pb-0 fs-2 ">Update {name}</h5>
                                <h5>Parent Category</h5>
                                {selectCats()}
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

    )
};

export default SubUpdate;