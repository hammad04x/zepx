import React, { useState, useRef, useEffect, useContext } from 'react';
import "../../assets/css/navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from "../../context/CartContext";

const port = process.env.REACT_APP_URL;

function Navbar() {
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { cartItems, updateQuantity, deleteCart } = useContext(CartContext);

    // Get login state from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${port}/getcategory`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    // Handle successful login (should be set from Login component)
    const handleLogin = (success) => {
        if (success) {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
        } else {
            alert("Login failed! Please check credentials.");
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsCategoryDropdownOpen(false);
    };

    const toggleCategoryDropdown = (e) => {
        e.stopPropagation();
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    };

    const closeDropdowns = () => {
        setIsDropdownOpen(false);
        setIsCategoryDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdowns();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user_id"); // Clear user info
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className='nav'>
            <div className='Container'>
                <div className='navbar'>
                    <div className='navbar-section'>
                        <div className='navbar-logo-section'>
                            <ul>
                                <li className='navbar-hamburger' onClick={toggleDropdown}>
                                    <i className="fa-solid fa-bars"></i>
                                    {isDropdownOpen && (
                                        <div className='navbar-hamburger-section' ref={dropdownRef}>
                                            <div className='navbar-hamburger-dropdown'>
                                                <ul onClick={(e) => e.stopPropagation()}>
                                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                                    <li><NavLink to={"/about-us"}>About</NavLink></li>
                                                    <li onClick={toggleCategoryDropdown}>Categories <i className="fa-solid fa-angle-down"></i></li>
                                                    {isCategoryDropdownOpen && (
                                                        <ul>
                                                            {categories.map((category) => (
                                                                <NavLink to={`/product/products/${category.category_id}`}>
                                                                    <li key={category.category_id} value={category.category_id}>
                                                                        <p>{category.name}</p>
                                                                    </li>
                                                                </NavLink>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    <li><NavLink to={"/contact-us"}>Contact</NavLink></li>
                                                </ul>
                                            </div>
                                            <div className='navbar-hamburger-dropdown-cancel'>
                                                <i className="fa-solid fa-xmark" onClick={toggleDropdown}></i>
                                            </div>
                                        </div>
                                    )}
                                </li>
                                <li className='navbar-logo'>
                                    <img src={require("../../assets/images/logo.png")} alt='logo' />
                                </li>
                            </ul>
                        </div>
                        <div className='navbar-link'>
                            <ul>
                                <li><NavLink to={"/"}>Home</NavLink></li>
                                <li><NavLink to={"/about-us"}>About</NavLink></li>
                                <li className='navbar-link-category'><NavLink to={`/product/products`}>Products</NavLink></li>
                                <li><NavLink to={"/contact-us"}>Contact</NavLink></li>
                            </ul>
                        </div>
                        <div className='navbar-user'>
                            <ul>
                                {!isLoggedIn ? (
                                    <>
                                        <NavLink to={"/signup"}>
                                            <li className='navbar-signup'>Signup</li>
                                        </NavLink>
                                        <li>|</li>
                                        <NavLink to={"/login"}>
                                            <li className='navbar-login'>Login</li>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to={"/user"}>
                                            <li className='navbar-profile'>
                                                <i className="fa-solid fa-user" ></i>
                                            </li>
                                        </NavLink>
                                        {/* <NavLink to={"/cart"}>
                                            <li>
                                                <i class="fa-solid fa-cart-shopping"></i>
                                            </li>
                                        </NavLink> */}
                                    </>
                                )}
                                <NavLink to={"/cart"}>
                                    <li className='navbar-cart'>
                                        <i class="fa-solid fa-cart-shopping"></i>
                                        {/* <img src={require("../../assets/images/cart.png")} ></img> */}
                                        <span class="nav-cart-icon nav-sprite"></span>
                                        <p> {cartItems.length}</p>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;