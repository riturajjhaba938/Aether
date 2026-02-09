import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors">
                        <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        AETHER<span className="text-secondary">.</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all">
                        <User className="w-4 h-4" />
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
