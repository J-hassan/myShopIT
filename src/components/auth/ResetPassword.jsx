import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import MetaData from "../layout/MetaData";


const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const params = useParams();

    useEffect(() => {
        // Check if user is authenticated, and redirect to home if so
        if (isAuthenticated === true) {
            navigate("/");
        }

        // Handle error and success messages
        if (error) {
            toast.error(error?.data?.message || "An Error Occurred");
        }

        if (isSuccess) {
            toast.success("Password Reset Successfully");
            navigate("/login")
        }
    }, [isAuthenticated, error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Password Not Matched")
        }

        const data = {
            password,
            confirmPassword
        }

        resetPassword({ token: params?.token, body: data });
    };

    return (
        <>
            <MetaData title={"Reset Password"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">New Password</h2>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm_password_field" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                name="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button id="new_password_button" type="submit" className="btn w-100 py-2">
                            {isLoading ? <span className='spinner-border spinner-border-sm'></span> : "Set Password"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
