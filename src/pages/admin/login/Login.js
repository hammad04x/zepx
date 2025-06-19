import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../assets/css/admin/login/login.css"; // Keep your existing CSS file
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

     const port = process.env.REACT_APP_URL;


    const [fetchdata, setfetchdata] = useState([]);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();



    const handlechange = (e) => {
        const { name, value } = e.target;

        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await axios.get(`${port}/admins`);
                setfetchdata(res.data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };
        fetchAdmin();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${port}/checkadmins`, {
                identifier: loginInfo.identifier,
                password: loginInfo.password
            });

            if (response.data.status === "inactive") {
                alert("Your account is inactive. Contact support.");
                return;
            }

            if (response.data.admin_id) {
                localStorage.setItem("admin_id", response.data.admin_id);
                localStorage.setItem("isLoggedIn", "true");

                alert("Login successfully");
                navigate("/admin/dashboard");
            } else {
                alert("Invalid login response");
            }
        } catch (error) {
            console.error(error);

            if (error.response) {
                alert(error.response.data.error); // Show exact backend message
            } else {
                alert("Invalid username or password");
            }
        }
    };






    return (
        <>
            <div className="all-login">
                <div className='aa'>
                    <div className="loginn wrap">
                        <h1 className="h1" id="login">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="email"
                                name="identifier"
                                placeholder="identifier"
                                value={loginInfo.identifier}
                                onChange={handlechange}
                                
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={loginInfo.password}
                                onChange={handlechange}
                                required
                            />
                            <button className="button type1" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;