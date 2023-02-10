import React from 'react';
import Resizer from "react-image-file-resizer";
import {useSelector} from "react-redux";
import axios from "axios";
import {Icon} from '@iconify/react';
import './FileUpload.css'

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;

const FileUpload = ({values, setValues, setLoading, loading, folder}) => {
    const {user} = useSelector((state) => state.auth);


    function fileUploadAndResize(e) {
        e.preventDefault()
        let allUploadedFiles = values.images
        let files = e.target.files
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (uri) => {
                        axios.post(`${API_URL}/upload-images`, {image: uri, folder}, {
                            headers: {
                                'Authorization': `Bearer ${user && user.token}`,
                            }
                        }).then(r => {
                            console.log(r)
                            setLoading(false)
                            allUploadedFiles.push(r.data)
                            setValues({...values, images: allUploadedFiles})

                        }).catch(e => {
                            setLoading(false)

                            console.log(e)
                        });
                    },
                    "base64")
            }

        }

    }

    function removeImage(id) {
        setLoading(true)
        axios.post(`${API_URL}/remove-image`, {public_id: id}, {
            headers: {
                'Authorization': `Bearer ${user && user.token}`,
            }
        }).then((r) => {
                setLoading(false)

                const {images} = values

                let filteredImages = images.filter((image) => {
                    return image.public_id !== id
                })

                setValues({...values, images: filteredImages})


            }
        ).catch(e => {
            console.log(e)
            setLoading(false)
        })


    }

    return (
        <>

            <div className="row py-2">
                {
                    values.images && values.images.map(img => {
                        return <div className="col-3"
                                    key={img.public_id}>
                            <div className='position-relative d-inline myImage'>
                                <Icon icon="bi:x" onClick={() => removeImage(img.public_id)}
                                      className='myBadge'/>
                                <img
                                    className="rounded-4 "
                                    src={img.url} alt="Avatar"
                                />
                            </div>
                        </div>
                    })
                }

            </div>
            <div className="mb-3">
                {!loading ?
                    <label className='btn btn-secondary'>Images upload
                        <input
                            className="form-control"
                            type="file"
                            multiple
                            hidden
                            accept='image/*'
                            onChange={fileUploadAndResize}
                        />
                    </label>
                    : <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
            </div>

        </>

    )
        ;
};

export default FileUpload;