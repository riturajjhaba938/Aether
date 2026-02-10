import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, LayoutDashboard, User, LogOut, Settings, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('userName');
        if (token && name) {
            setIsLoggedIn(true);
            setUserName(name);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setShowDropdown(false);
        setMobileMenuOpen(false);
        navigate('/login');
    };

    const closeMobile = () => setMobileMenuOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass px-4 sm:px-6 py-3 rounded-2xl">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-1.5 sm:p-2 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors">
                        <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold tracking-tight">
                        AETHER<span className="text-secondary">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {isLoggedIn && (
                        <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                    )}

                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black text-xs font-bold">
                                    {getInitials(userName)}
                                </div>
                                <span className="text-sm font-medium">{userName}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-56 glass border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="text-sm font-bold">{userName}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">Aether Member</p>
                                    </div>
                                    <div className="p-1.5">
                                        <Link to="/profile" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-colors">
                                            <User className="w-4 h-4 text-primary" /> My Profile
                                        </Link>
                                        <Link to="/dashboard" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-colors">
                                            <Settings className="w-4 h-4 text-gray-400" /> Settings
                                        </Link>
                                    </div>
                                    <div className="p-1.5 border-t border-white/10">
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all">
                            <User className="w-4 h-4" /> Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-2 glass rounded-2xl p-4 mx-1 space-y-2">
                    {isLoggedIn && (
                        <>
                            <div className="flex items-center gap-3 px-3 py-3 border-b border-white/10 mb-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black text-sm font-bold">
                                    {getInitials(userName)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{userName}</p>
                                    <p className="text-[10px] text-gray-400">Aether Member</p>
                                </div>
                            </div>
                            <Link to="/dashboard" onClick={closeMobile} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">
                                <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
                            </Link>
                            <Link to="/profile" onClick={closeMobile} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">
                                <User className="w-4 h-4 text-primary" /> My Profile
                            </Link>
                            <Link to="/dashboard" onClick={closeMobile} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">
                                <Settings className="w-4 h-4 text-gray-400" /> Settings
                            </Link>
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Link to="/login" onClick={closeMobile} className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-black font-bold rounded-xl text-sm">
                            <User className="w-4 h-4" /> Sign In
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
