import { useState } from "react";
import Input from "../components/Input";

const Login = (props) => {

    const { setCurrentPage } = props;

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const formDataValidation = (data) => {
        const { email, password } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const errors = {};

        //email check
        if (!emailRegex.test(email)) {
            errors.email = "Enter a valid email address";
        }

        //password check
        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        } else if (!/[A-Z]/.test(password)) {
            errors.password = "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            errors.password = "Password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(password)) {
            errors.password = "Password must contain at least one number.";
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.password = "Password must contain at least one special character.";
        }
        else if (/\s/.test(password)) {
            errors.password = "Password must not contain spaces.";
        }

        setFormErrors(errors);

        if (Object.keys(formErrors).length === 0) return true;
        else return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (formDataValidation(loginData)) {
            try {
                //LOGIN API CALL
            }
            catch(error){
                if(error.response && error.response.data.message){
                    console.log(error.response.data.message);
                }
                else {
                    console.log('Something went wrong. Please try again.')
                }
            }
        }
    }

    const handleRedirect = () => {
        setCurrentPage("signup")
    }

    return (
        <div className="flex flex-col lg:px-12">
            <header className="mb-8">
                <h2 className="font-bold text-2xl">Welcome Back</h2>
                <span className="text-xs">Please enter your login details</span>
            </header>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col gap-6 w-full mb-10">
                    <div>
                        <Input
                            value={loginData.email}
                            placeholder="john@example.com"
                            name="email"
                            handleInputChange={handleInputChange}
                            label="Email"
                        />
                        {formErrors.email &&
                            <span className="text-xs text-red-600">{formErrors.email}</span>}
                    </div>
                    <div>
                        <Input
                            value={loginData.password}
                            placeholder="Minimum 8 characters"
                            name="password"
                            handleInputChange={handleInputChange}
                            label="Password"
                        />
                        {formErrors.password &&
                            <span className="text-xs text-red-600">{formErrors.password}</span>}
                    </div>

                </div>
                <button type="submit" className="bg-orange-400 text-white py-2 px-4 rounded-md w-full">
                    Log In
                </button>
            </form >
            <div className="text-xs">Do not have an account ? <span className="cursor-pointer underline font-bold text-primary" onClick={handleRedirect}>Sign Up</span></div>
        </div >
    );
}

export default Login;