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

function Navbar() {
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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="bg-[#0d1114] text-white/70 px-4 py-3">
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
                    <button className="font-semibold">Home</button>
                    <button className="font-semibold">News</button>
                    <button className="font-semibold">Sports</button>
                    <button className="font-semibold">Reel</button>
                    <button className="font-semibold">WorkLife</button>
                    <button className="font-semibold">Travel</button>
                    <button className="font-semibold">Future</button>
                    <button className="font-semibold">Culture</button>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white">
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
                    <button className="font-semibold" onClick={toggleMenu}>Home</button>
                    <button className="font-semibold" onClick={toggleMenu}>News</button>
                    <button className="font-semibold" onClick={toggleMenu}>Sports</button>
                    <button className="font-semibold" onClick={toggleMenu}>Reel</button>
                    <button className="font-semibold" onClick={toggleMenu}>WorkLife</button>
                    <button className="font-semibold" onClick={toggleMenu}>Travel</button>
                    <button className="font-semibold" onClick={toggleMenu}>Future</button>
                    <button className="font-semibold" onClick={toggleMenu}>Culture</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;
