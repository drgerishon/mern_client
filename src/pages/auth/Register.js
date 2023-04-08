import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import Progress from "../../components/progress/progress";
import useForm from "../../hooks/useForm";
import {createUserFormInitialValues} from "../../common/initialValues/createUserForm";
import Form from "../../components/Form";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import {MDBBtn} from "mdb-react-ui-kit";
import {preSignup} from "../../redux/slices/auth";
import useHandleSubmit from "../../hooks/useFormSubmit";
import {registerUserFormInitialValues} from "../../common/initialValues/registerUserForm";


const Register = () => {
//step 1
    const steps = useMemo(() => [
        ['phoneNumber', 'email',],
        ['password', 'confirmPassword',],
        ['firstName', 'middleName', 'surname'],
        ['dob', 'gender', 'terms'],

    ], []);

    const {isLoggedIn} = useSelector((state) => state.auth);

    const [form, setForm] = useState(registerUserFormInitialValues.registerForm);
    const [currentStepValid, setCurrentStepValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const [passwordVisible, togglePasswordVisibility] = useTogglePasswordVisibility(form, setForm);
    const handleFormChange = useForm(setForm, setFormIsValid);
    const dispatch = useDispatch()
    //step 2
    const [currentStep, setCurrentStep] = useState(0);

    const validateCurrentStep = useCallback(() => {
        const currentFormFields = steps[currentStep];
        const currentStepIsValid = currentFormFields.every(
            (fieldId) => form[fieldId].valid
        );
        setCurrentStepValid(currentStepIsValid);
    }, [currentStep, form, steps]);

    useEffect(() => {
        validateCurrentStep();
    }, [currentStep, validateCurrentStep]);

    const handleFormChangeWithValidation = (event, id) => {
        handleFormChange(event, id);
        validateCurrentStep();
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const resetForm = () => {
        setForm({...createUserFormInitialValues.userForm});
        setFormIsValid(false);
    };


    const customAction = async (formData) => {
        return await dispatch(preSignup(formData)).unwrap();
    };


    const {handleSubmit, loading, successful, showForm} = useHandleSubmit(
        customAction,
        form,
        resetForm
    );


    const signupForm = () => {
        return (
            <form className='row g-3' onSubmit={handleSubmit}>
                <div className='col-12 '>
                    <Progress page={currentStep}/>
                </div>

                <Form
                    form={form}
                    handleChange={handleFormChangeWithValidation}
                    togglePasswordVisibility={togglePasswordVisibility}
                    passwordVisible={passwordVisible}
                    formSteps={steps}
                    step={currentStep}
                />

                <div className="d-flex justify-content-between mb-3">
                    <MDBBtn
                        type="button"
                        disabled={currentStep === 0}
                        onClick={prevStep}
                    >
                        Previous
                    </MDBBtn>
                    <MDBBtn
                        type="button"
                        disabled={!currentStepValid || (currentStep === steps.length - 1 && loading)}
                        onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                    >
                        {loading ? <div className="spinner-border spinner-border-sm"
                                        role="status"/> : currentStep === steps.length - 1 ? "Submit" : "Next"}
                    </MDBBtn>

                </div>

            </form>
        );
    };

    if (isLoggedIn) {
        return <Navigate replace to="/user/history"/>
    } else {

        return (
            <>

                {showForm && (
                    <>
                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">{successful ? 'Almost done!' : 'Account opening'}</h5>
                            <p className="text-center ">
                                {successful ?
                                    'Check your email and follow the instructions to complete registration process'
                                    :
                                    'Provide your details to open an account'
                                }
                            </p>

                        </div>
                        {signupForm()}
                    </>
                )}

                <div className='card-footer'>
                    <p className="small mb-3">Already have an account?
                        <Link to="/auth/login"> {' '} Log in</Link>
                    </p>
                    <p className="mb-0 text-muted" style={{fontSize: '10px'}}>For further support, you may
                        visit the Help Center
                        or contact our customer service
                        team.
                    </p>

                </div>
            </>

        );
    }
}

export default Register;