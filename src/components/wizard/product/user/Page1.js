import React from 'react';
import Select from "react-select";
import FileUpload from "../../../../ui/forms/FileUpload";
import {useSelector} from "react-redux";

const Page1 = ({
                   values,
                   showSub,
                   setSelectedSub,
                   selectedSub,
                   setLoading,
                   setValues,
                   loading,
                   subOptions,
                   handleCategoryChange
               }) => {

    const {
        categories,
        category
    } = values

    const {user: currentUser} = useSelector((state) => state.auth);
    let dynamicFolder
    if (currentUser && currentUser.token) {
        dynamicFolder = `${currentUser.firstName} ${currentUser.surname}`
    }


    return (
        <>
            <div className="mb-3">
                <label className='label-title'>Category</label>
                <Select
                    name="category"
                    value={category}
                    getOptionLabel={category => category.name}
                    getOptionValue={category => category._id}
                    options={categories.length && categories}
                    onChange={handleCategoryChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />

            </div>

            {showSub && subOptions.length > 0 && <div className="mb-3">
                <label className='label-title'>Sub Categories</label>
                <Select
                    isMulti
                    name="subs"
                    value={selectedSub}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option._id}
                    options={subOptions.length && subOptions}
                    onChange={(opt) => setSelectedSub(opt)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>
            }
            <label className='label-title'>Images of your product</label>
            <FileUpload
                values={values}
                folder={dynamicFolder}
                loading={loading}
                setLoading={setLoading}
                setValues={setValues}/>

        </>
    );
};

export default Page1;