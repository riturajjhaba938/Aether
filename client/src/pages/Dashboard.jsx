import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Video, FileText, MessageSquare, BookOpen, Send, Mic, Play, Settings, X, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Added for redirect
import axios from 'axios'; // Added for API calls

import Sidebar from '../components/dashboard/Sidebar';
import ContentPane from '../components/dashboard/ContentPane';
import ChatPane from '../components/dashboard/ChatPane';
import KnowledgeGraph from '../components/dashboard/KnowledgeGraph';

const Dashboard = () => {
    const [activeSource, setActiveSource] = useState(null);
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSource, setNewSource] = useState({ title: '', url: '', type: 'video' });
    const [adding, setAdding] = useState(false);

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    // Fetch Sources on Mount
    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchSources = async () => {
            try {
                const { data } = await axios.get(`/api/sources/${userId}`);
                setSources(data);
                if (data.length > 0) setActiveSource(data[0]);
            } catch (error) {
                console.error("Failed to fetch sources:", error);
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
            setActiveSource(data); // Auto-select new source
            setShowAddModal(false);
            setNewSource({ title: '', url: '', type: 'video' });
        } catch (error) {
            console.error("Failed to add source:", error);
            alert("Failed to add source. Please check the URL.");
        } finally {
            setAdding(false);
        }
    };

    // Transform AI Data for Knowledge Graph
    const getGraphData = () => {
        if (!activeSource) return { nodes: [], links: [] };

        const aiNodes = activeSource.aiData?.knowledge_graph || [];
        const rootId = activeSource.title || 'Root';

        // Central Node
        const nodes = [{ id: rootId, group: 0, val: 20 }];
        const links = [];

        // AI Generated Nodes
        aiNodes.forEach((item, index) => {
            nodes.push({
                id: item.term,
                group: item.group || 1,
                val: item.relevance_score || 5
            });
            // Connect to Root
            links.push({
                source: rootId,
                target: item.term
            });
        });

        // Fallback Mock Data if empty
        if (nodes.length === 1) {
            return {
                nodes: [{ id: 'Root', group: 1 }, { id: 'Concept A', group: 2 }, { id: 'Concept B', group: 2 }],
                links: [{ source: 'Root', target: 'Concept A' }, { source: 'Root', target: 'Concept B' }]
            };
        }

        return { nodes, links };
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-primary">
            <Loader className="w-10 h-10 animate-spin" />
        </div>
    );

    return (
        <div className="h-screen pt-20 flex overflow-hidden relative">
            {/* Sidebar with Real Data & Add Handler */}
            <Sidebar
                sources={sources}
                activeSource={activeSource}
                setActiveSource={setActiveSource}
                onAddSource={() => setShowAddModal(true)}
            />

            {/* Main Study Arena */}
            <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
                {/* Left: Content Viewer (Video/PDF) */}
                <div className="flex-[1.5] flex flex-col gap-4 overflow-hidden">
                    <div className="flex-1 min-h-0">
                        <ContentPane source={activeSource} />
                    </div>
                    <div className="h-64 flex-shrink-0">
                        {/* Dynamic Knowledge Graph */}
                        <KnowledgeGraph data={getGraphData()} />
                    </div>
                </div>

                {/* Right: AI Assistant & Notes */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                    <ChatPane source={activeSource} />
                </div>
            </main>

            {/* Add Source Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
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
