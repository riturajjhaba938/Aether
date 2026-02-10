import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Video, FileText, Play, X, Loader } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSource, setNewSource] = useState({ title: '', url: '', type: 'video' });
    const [adding, setAdding] = useState(false);

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    // Redirect if not logged in
    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchSources = async () => {
            try {
                const { data } = await axios.get(`/api/sources/${userId}`);
                setSources(data);
            } catch (err) {
                console.error("Error fetching library", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSources();
    }, [userId, navigate]);

    // Handle Add Source
    const handleAddSource = async (e) => {
        e.preventDefault();
        setAdding(true);
        try {
            const { data } = await axios.post('/api/sources', {
                ...newSource,
                userId
            });
            setSources([...sources, data]);
            setShowAddModal(false);
            setNewSource({ title: '', url: '', type: 'video' });
        } catch (error) {
            console.error("Failed to add source:", error);
            alert("Failed to add source. Please check the URL.");
        } finally {
            setAdding(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-background text-primary">
            <Loader className="w-10 h-10 animate-spin" />
        </div>
    );

    return (
        <div className="pt-20 sm:pt-24 px-3 sm:px-8 min-h-screen bg-background">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Your Aether Library</h1>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">Select a source to launch your study workspace.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-primary text-black font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-primary/80 transition-all hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                    <Plus size={18} /> Add New Source
                </button>
            </div>

            {sources.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Play className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No Sources Yet</h3>
                    <p className="text-gray-400 max-w-sm">Click "Add New Source" to paste a YouTube URL and let Aether synthesize your first study session.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {sources.map((source) => (
                        <motion.div
                            key={source._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass border border-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:border-primary/50 transition-all group cursor-pointer"
                            onClick={() => navigate(`/workspace/${source._id}`)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                {source.type === 'video'
                                    ? <Video className="text-primary" />
                                    : <FileText className="text-blue-400" />
                                }
                                <span className="text-xs text-white/40 uppercase tracking-widest">{source.type}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{source.title}</h3>
                            {source.aiData?.summary && (
                                <p className="text-xs text-gray-400 mb-4 line-clamp-2">{source.aiData.summary}</p>
                            )}
                            <button
                                className="w-full flex items-center justify-center gap-2 bg-white/5 py-2.5 rounded-xl group-hover:bg-primary group-hover:text-black transition-all font-bold text-sm"
                            >
                                <Play size={16} /> Launch Aether
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add Source Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-primary" />
                                    Add New Source
                                </h3>
                                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddSource} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none text-white"
                                        placeholder="e.g., Intro to Neural Networks"
                                        value={newSource.title}
                                        onChange={e => setNewSource({ ...newSource, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">YouTube URL</label>
                                    <input
                                        type="url"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none text-white"
                                        placeholder="https://youtube.com/watch?v=..."
                                        value={newSource.url}
                                        onChange={e => setNewSource({ ...newSource, url: e.target.value })}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={adding}
                                    className="w-full bg-primary text-black font-bold py-3 rounded-xl mt-2 hover:bg-primary/90 transition-colors disabled:opacity-50 flex justify-center gap-2"
                                >
                                    {adding ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Analyzing with AI...
                                        </>
                                    ) : (
                                        'Add to Library'
                                    )}
                                </button>
                                <p className="text-[10px] text-gray-500 text-center">
                                    Aether will automatically generate a summary, quizzes, and a knowledge graph.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
