import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, BookOpen, LogOut, ArrowLeft, Shield } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sourceCount, setSourceCount] = useState(0);

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        // Fetch source count for stats
        const fetchStats = async () => {
            try {
                const { data } = await axios.get(`/api/sources/${userId}`);
                setSourceCount(data.length);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };

        setUser({
            name: userName || 'Aether User',
            email: localStorage.getItem('userEmail') || 'Not available',
            joinDate: 'Member since 2026',
        });

        fetchStats();
    }, [userId, userName, navigate]);

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pt-20 sm:pt-24 px-3 sm:px-4 pb-8 bg-background">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Library
                </button>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl overflow-hidden"
                >
                    {/* Banner */}
                    <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/10 relative">
                        <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-8">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black text-2xl sm:text-3xl font-bold border-4 border-background shadow-xl">
                                {getInitials(user.name)}
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="pt-14 sm:pt-16 px-4 sm:px-8 pb-6 sm:pb-8">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
                                <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" />
                                    {user.email}
                                </p>
                                <p className="text-gray-500 text-xs mt-1 flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {user.joinDate}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                <Shield className="w-3 h-3" />
                                Free Tier
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    {[
                        { label: 'Sources', value: sourceCount, icon: BookOpen },
                        { label: 'Quizzes Taken', value: 0, icon: BookOpen },
                        { label: 'Study Hours', value: '0h', icon: Calendar },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (i + 1) }}
                            className="glass rounded-2xl p-5 text-center"
                        >
                            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 glass rounded-2xl p-6"
                >
                    <h3 className="text-sm font-bold text-red-400 mb-3">Account</h3>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out of Aether
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
