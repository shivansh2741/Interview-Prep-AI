import { useContext, useState } from "react";
import Input from "../components/Input";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from '../utils/apiPaths';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import SpinnerLoader from "../components/Loader/SpinnerLoader";

const Login = (props) => {

    const { setCurrentPage } = props;

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState();
    const [loadingData, setLoadingData] = useState(false);
    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoadingData(true);
        const { email, password } = loginData;
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });

            const token = response.data.token;

            if (token) {
                updateUser(response.data)
                navigate('/dashboard');
            }
            return response.data;
        }
        catch (error) {
            if (error.response && error.response.data.message) {
                setFormErrors('Incorrect email Id or password.');
            }
            else {
                setFormErrors('Something went wrong. Please try again.');
            }
        }
        finally {
            setLoadingData(false);
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
                    {formErrors &&
                        <span className="text-2xs font-semibold text-red-600 bg-red-100 px-4 py-2">{`* ${formErrors}`}</span>}
                    <div>
                        <Input
                            value={loginData.email}
                            placeholder="john@example.com"
                            name="email"
                            handleInputChange={handleInputChange}
                            label="Email"
                        />
                    </div>
                    <div>
                        <Input
                            value={loginData.password}
                            placeholder="Minimum 8 characters"
                            name="password"
                            handleInputChange={handleInputChange}
                            label="Password"
                        />
                    </div>

                </div>
                <button type="submit" className="bg-orange-400 text-white py-2 px-4 rounded-md w-full">
                    {loadingData ? <SpinnerLoader /> : "Login"}
                </button>
            </form >
            <div className="text-xs">Do not have an account ? <span className="cursor-pointer underline font-bold text-primary" onClick={handleRedirect}>Sign Up</span></div>
        </div >
    );
}

export default Login;