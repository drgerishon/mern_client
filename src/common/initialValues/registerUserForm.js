export const registerUserFormInitialValues = {
    registerForm: {
        phoneNumber: {
            elementType: 'input',
            elementConfig: {
                type: 'tel',
                label: 'Phone Number',
                id: 'phoneNumber',
                name: 'phoneNumber',
                pattern: '[0-9]{10}',
            },

            value: '',
            validation: {
                required: true,
                isPhoneNumber: true
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'First Name',
                id: 'firstName',
                name: 'firstName',
            },

            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        middleName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Middle Name',
                id: 'middleName',
                name: 'middleName',
            },

            value: '',
            validation: {
                required: false,
            },
            validationMessage: [],
            valid: true,
            touched: false
        },
        surname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Surname',
                name: 'surname',
                id: 'surname',
            },

            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'Email',
                id: 'email',
                name: 'email',
            },

            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        password: {
            elementType: 'password',
            elementConfig: {
                label: 'Password',
                id: 'password',
                name: 'password',
            },

            value: '',
            validation: {
                required: true,
                isPassword: true
            },
            validationMessage: [],
            valid: false,
            touched: false,
            visible: false,
        },
        confirmPassword: {
            elementType: 'password',
            elementConfig: {
                label: 'Confirm Password',
                id: 'confirmPassword',
                name: 'confirmPassword',
            },

            value: '',
            validation: {
                required: true,
                isEqual: 'password',
                passwordValue: '',
            },
            validationMessage: [],
            valid: false,
            touched: false,
            visible: false,
        },

        dob: {
            elementType: 'date',
            elementConfig: {
                format: 'dd/MM/yyyy',
                clearIcon: null,
                dayPlaceholder: 'DD',
                monthPlaceholder: 'MM',
                yearPlaceholder: 'YYYY',
                id: 'dob',
                label: 'Date of Birth',
                name: 'dob'
            },

            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        gender: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: '', label: 'Select gender'},
                    {value: 'male', label: 'Male'},
                    {value: 'female', label: 'Female'},
                ], label: 'Gender',
                id: 'gender',
                name: 'gender',
            },
            selectedOption: '',

            value: {value: '', label: 'Select gender'},
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false

        },
        terms: {
            elementType: 'checkbox',
            elementConfig: {
                type: 'checkbox',
                name: 'terms',
                required: true,
                label: 'Agree to terms and conditions'
            },
            value: false,
            validation: {
                required: true,

            },
            validationMessage: [],
            valid: false,
            touched: false
        },
    },
    formIsValid: false
}