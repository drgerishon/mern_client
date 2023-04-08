import Select from 'react-select'

import DatePicker from 'react-date-picker';
import {Icon} from '@iconify/react';

const UserForm = ({
                      values,
                      handleChange,
                      roles,
                      handleGenderChange,
                      loading,
                      handleSubmit,
                      handleRoleChange,
                      handleDateChange,
                      togglePasswordVisibility,
                      serverErrors = [],


                  }) => {

    const {
        phoneNumber,
        firstName,
        middleName,
        surname,
        drivingLicense,
        idNo,
        email,
        password,
        confirmPassword,
        passwordVisible,
        dob,
        gender,
    } = values

    const roleOptions = roles.map((role) => ({
        value: role._id,
        label: role.name,

    }));


    const genderOptions = [
        {value: 'male', label: 'Male'},
        {value: 'female', label: 'Female'},
        {value: 'intersex', label: 'Intersex'},
        {value: 'undisclosed', label: 'Undisclosed'},
    ];
    const selectedRole = roles.find(role => role._id === values.role);


    const displayServerError = (fieldName) => {


        if (serverErrors && Array.isArray(serverErrors)) {
            const errorKeywords = {
                email: 'email',
                phoneNumber: 'phone',
                firstName: 'first',
                surname: 'surname',
                dob: 'date of birth',
                password: 'password',
                confirmPassword: 'confirm',
                role: 'role',
                gender: 'gender',
            };
            const keyword = errorKeywords[fieldName];
            const error = serverErrors.find((error) => error.toLowerCase().includes(keyword.toLowerCase()));
            return error ? error.trim() : null;
        }
        return null;
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control ${displayServerError('email') ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    value={values.email}
                />
                <div className="invalid-feedback">{displayServerError('email')}</div>
            </div>
            <div className="mb-3">
                <label>Phone</label>
                <input
                    type="text"
                    name="phoneNumber"
                    className={`form-control ${displayServerError('phoneNumber') ? 'is-invalid' : ''}`}
                    value={phoneNumber}
                    onChange={handleChange}
                />
                <div className="invalid-feedback">{displayServerError('phoneNumber')}</div>
            </div>
            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    name="firstName"
                    className={`form-control ${displayServerError('firstName') ? 'is-invalid' : ''}`}
                    value={firstName}
                    onChange={handleChange}
                />
                <div className="invalid-feedback">{displayServerError('firstName')}</div>
            </div>
            <div className="mb-3">
                <label>Middle Name</label>
                <input
                    type="text"
                    name='middleName'
                    className="form-control"
                    value={middleName}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Surname</label>
                <input
                    type="text"
                    name="surname"
                    className={`form-control ${displayServerError('surname') ? 'is-invalid' : ''}`}
                    value={surname}
                    onChange={handleChange}
                />
                <div className="invalid-feedback">{displayServerError('surname')}</div>
            </div>
            <div className="mb-3">
                <label htmlFor="dob">Date of Birth</label>
                <DatePicker
                    id="dob"
                    className={`form-control ${displayServerError('dob') ? 'is-invalid' : ''}`}
                    onChange={(date) => handleDateChange('dob', date)}
                    value={dob}
                />
                <div className="invalid-feedback">{displayServerError('dob')}</div>

            </div>
            <div className="mb-3">
                <label>Password</label>
                <div className="input-group">
                    <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        className={`form-control ${displayServerError('password') ? 'is-invalid' : ''}`}

                        value={password}
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">{displayServerError('password')}</div>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? (
                            <Icon icon="ph:eye-slash-thin"/>
                        ) : (
                            <Icon icon="ph:eye"/>
                        )}
                    </button>
                </div>
                <div className="invalid-feedback">{displayServerError('password')}</div>

            </div>
            <div className="mb-3">
                <label>Confirm Password</label>
                <div className="input-group">
                    <input
                        type={values.passwordVisible ? "text" : "password"}
                        name="confirmPassword"
                        className={`form-control ${displayServerError('confirmPassword') ? 'is-invalid' : ''}`}
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">{displayServerError('confirmPassword')}</div>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                    >
                        {values.passwordVisible ? (
                            <Icon icon="ph:eye-slash-thin"/>
                        ) : (
                            <Icon icon="ph:eye"/>
                        )}
                    </button>
                </div>
            </div>
            <div className={`mb-3 ${displayServerError('role') ? 'is-invalid' : ''}`}>
                <label>Role</label>
                <Select
                    name="role"
                    value={roleOptions.find((option) => option.value === values.role)}
                    onChange={handleRoleChange}
                    options={roleOptions}
                    classNamePrefix="select"
                />
                <div className="invalid-feedback" style={{marginTop: '0.25rem'}}>
                    {displayServerError('role')}
                </div>
            </div>

            {selectedRole && selectedRole.code === 4000 && (
                <>
                    <div className="mb-3">
                        <label>Driving Licence</label>
                        <input
                            type="text"
                            name="drivingLicense"
                            className="form-control"
                            value={drivingLicense}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>ID Number</label>
                        <input
                            type="text"
                            name="idNo"
                            className="form-control"
                            value={idNo}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )}

            <div className={`mb-3 ${displayServerError('gender') ? 'is-invalid' : ''}`}>
                <label>Gender</label>
                <Select
                    name="gender"
                    value={genderOptions.find((option) => option.value === gender)}
                    options={genderOptions}
                    onChange={handleGenderChange}
                    classNamePrefix="select"
                />
                <div className="invalid-feedback" style={{marginTop: '0.25rem'}}>
                    {displayServerError('gender')}
                </div>
            </div>


            <div className="mb-3">
                <button type="submit" className="btn btn-outline-info">{loading ?
                    <div className="spinner-border small" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : 'Save'}</button>
            </div>

        </form>
    );
};

export default UserForm;
