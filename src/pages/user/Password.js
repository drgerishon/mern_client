import React, {useState} from 'react';
import UserNav from "../../components/nav/UserNav";

const Password = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState()

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        //API TO NODE JS


    }

    function passwordUpdateForm() {
        return <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Your Password</label>
                <input
                    type="password"
                    className="form-control"
                    disabled={loading}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>

            <button type="submit" disabled={!password || loading || password.length < 8}
                    className="btn btn-primary">Submit
            </button>
        </form>
    }

    return (
        <div className={'container-fluid'}>
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>

                <div className="col">
                    <h4>Password Update</h4>
                    {passwordUpdateForm()}
                </div>
            </div>

        </div>
    );
};

export default Password;