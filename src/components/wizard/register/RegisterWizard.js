import React from 'react';
import Input from "../../../ui/input/Input";

const Email = ({feedback, config, handleChange, id}) => {

    return (
        <Input
            id='email'
            feedback={feedback}
            className='col-12 '
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            message={config.validationMessage}
            invalid={!config.valid}
            shouldValidate={config.validation}
            touched={config.touched}
            changed={(event) => handleChange(event, id)}/>
    );
};

export default Email;