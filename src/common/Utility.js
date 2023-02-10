import {log} from "@craco/craco/dist/lib/logger";
import {setMessage} from "../redux/slices/message";
import {useDispatch} from "react-redux";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, field, p) => {

    let isValid = true;
    if (!field.validation || !field.validation.required) {
        return true;
    }

    if (field.validation.required === true) {
        let errors = [];
        if (value.trim() === '' || value === false) {
            errors.push("This field is mandatory");
        }

        if (errors.length > 0) {
            field.validationMessage = errors
            return false;
        }
        isValid = (value.trim() !== '') && isValid;
    }
    if (field.validation.required === false) {
        isValid = true;
    }

    if (field.validation.minLength) {
        isValid = value.length >= field.validation.minLength && isValid
    }
    if (field.validation.maxLength) {
        isValid = value.length <= field.validation.maxLength && isValid
    }
    if (field.validation.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (field.validation.isPassword) {
        let errors = [];
        if (value.length < 8) {
            errors.push("Your password must be at least 8 characters");
        }
        if (value.search(/[A-Z]/) < 0) {
            errors.push("Your password must contain at least one Uppercase");
        }
        if (value.search(/[a-z]/) < 0) {
            errors.push("Your password must contain at least one lowercase.");
        }
        if (value.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit.");
        }
        if (value.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) < 0) {
            errors.push("Your password must contain at least one special character.");
        }

        if (errors.length > 0) {
            field.validationMessage = errors.join("\n")
            return false;
        }
        const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        isValid = pattern.test(value) && isValid
    }

    if (field.validation.isEqual) {
        let errors = [];
        if (value.trim() !== p.trim()) {
            errors.push("Password does not match");
        }
        if (errors.length > 0) {
            field.validationMessage = errors
            return false;
        }
        isValid = value.trim() === p.trim() && isValid
    }
    if (field.validation.isTerms) {
        console.log('term in validation', value)

        let errors = [];
        if (value === false) {
            errors.push("You must accept our terms to continue");
        }
        if (errors.length > 0) {
            field.validationMessage = errors
            return false;
        }
        isValid = value === true && isValid
    }
    if (field.validation.isDate === true) {
        let errors = [];
        if (value === null || value === false) {
            errors.push("This field is mandatory");
        }

        if (errors.length > 0) {
            field.validationMessage = errors
            return false;
        }
        isValid = (value !== null) && isValid;
    }

    if (field.validation.isPhoneNumber) {
        let errors = [];
        const pattern = /^(?:\+254|0)[17]\d{8}$/;
        if (!pattern.test(value)) {
            errors.push("");
        }
        if (errors.length > 0) {
            field.validationMessage = errors
            return false;
        }
        isValid = pattern.test(value) && isValid;
    }

    // if (rules.isNumeric) {
    //     const pattern = /^\d+$/;
    //     isValid = pattern.test(value) && isValid
    // }
    return isValid;
}

export const errorHelper = (error) => {
    const err =
        (error.response &&
            error.response.data &&
            error.response.data.error) ||
        error.message ||
        error.toString();
    return {
        err
    };
};