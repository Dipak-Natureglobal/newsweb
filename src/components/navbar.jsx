import React, { useState, useEffect } from "react";
import logo from "../videos/singup.gif";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu, MenuItem, Avatar, Button } from '@mui/material';
import PropTypes from 'prop-types';

function Navbar(props) {
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Listen to auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/singin');
        } catch (err) {
            console.log(err);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const toggleMobileMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const toggleMenu = (menuType) => {
        props.setMenu(menuType);
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="bg-[#0d1114] text-white/70 px-4 py-3 fixed w-full z-[999]">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src={logo} height={80} width={80} alt="Logo" />

                    {user ? (
                        <div className="flex items-center">
                            <Button
                                onClick={handleMenuOpen}
                                startIcon={<Avatar src={user?.photoURL} alt={user?.displayName} />}
                                endIcon={<ArrowDropDownIcon className="text-white/70" />}
                                className="text-white/70 mx-5 p-2 font-semibold text-xs sm:text-sm"
                            >
                                <strong className="hidden lg:block xl:block text-[#fba64c]">{user?.displayName}</strong>
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={logout}>
                                    <LogoutIcon className="mr-2" />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link to="/singin">
                            <button className="flex items-center text-white/70 mx-5 border-white p-2 w-28 font-semibold text-xs sm:text-sm">
                                <PersonIcon className="text-white/70 mr-2" />
                                Sign in
                            </button>
                        </Link>
                    )}
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <button onClick={() => props.setMenu("Default")} className="font-semibold">Home</button>
                    <button onClick={() => props.setMenu("Science")} className="font-semibold">Science</button>
                    <button onClick={() => props.setMenu("Sports")} className="font-semibold">Sports</button>
                    <button onClick={() => props.setMenu("Movies")} className="font-semibold">Movies</button>
                    <button onClick={() => props.setMenu("WorkLife")} className="font-semibold">WorkLife</button>
                    <button onClick={() => props.setMenu("Travel")} className="font-semibold">Travel</button>
                    <button  onClick={() => props.setMenu("Medical")} className="font-semibold">Medical</button>
                    <button onClick={() => props.setMenu("Culture")} className="font-semibold">Culture</button>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white">
                        {menuOpen ? (
                            <CloseIcon className="text-white/70" />
                        ) : (
                            <MenuIcon className="text-white/70" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
                    <button onClick={() => toggleMenu("Default")} className="font-semibold">Home</button>
                    <button onClick={() => toggleMenu("Science")} className="font-semibold">Science</button>
                    <button onClick={() => toggleMenu("Sports")} className="font-semibold">Sports</button>
                    <button onClick={() => toggleMenu("Movies")} className="font-semibold">Movies</button>
                    <button onClick={() => toggleMenu("WorkLife")} className="font-semibold">WorkLife</button>
                    <button onClick={() => toggleMenu("Travel")} className="font-semibold">Travel</button>
                    <button  onClick={() => toggleMenu("Medical")} className="font-semibold">Medical</button>
                    <button onClick={() => toggleMenu("Culture")} className="font-semibold">Culture</button>
                </div>
            )}
        </div>
    );
}
Navbar.propTypes = {
    setMenu: PropTypes.string
};

export default Navbar;
