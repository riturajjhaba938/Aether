import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Video, FileText, Play, X, Loader, Brain, BookOpen, Network, Sparkles, CheckCircle, Zap, Upload, File } from 'lucide-react';
import axios from 'axios';

// Synthesis step messages that cycle during loading
const SYNTHESIS_STEPS = [
    { icon: Video, label: 'Fetching content...', tip: 'Reading your source material' },
    { icon: Brain, label: 'AI is analyzing...', tip: 'Understanding key topics and concepts' },
    { icon: BookOpen, label: 'Generating summary...', tip: 'Condensing content into key points' },
    { icon: Network, label: 'Building Neuron Map...', tip: 'Mapping connections between concepts' },
    { icon: Sparkles, label: 'Creating quiz questions...', tip: 'Crafting personalized practice problems' },
    { icon: Zap, label: 'Finalizing your study session...', tip: 'Almost there! Polishing everything up' },
];

const FUN_FACTS = [
    '🧠 Your brain can process images in just 13 milliseconds',
    '📚 The average person forgets 70% of new info within 24 hours without review',
    '🎯 Active recall is 150% more effective than passive reading',
    '⚡ Spaced repetition can boost retention by up to 200%',
    '🌊 Your brain uses 20% of your body\'s total energy',
    '🔗 Making connections between concepts strengthens memory pathways',
    '🎮 Gamified learning increases engagement by 60%',
    '💡 Teaching others is the best way to learn — the Feynman technique',
];

const Dashboard = () => {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // Unified state for both Video and PDF
    const [newSource, setNewSource] = useState({ title: '', url: '', type: 'video' });
    const [selectedFile, setSelectedFile] = useState(null);

    const [adding, setAdding] = useState(false);
    const [synthStep, setSynthStep] = useState(0);
    const [funFact, setFunFact] = useState('');

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

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

    // Cycle through synthesis steps during loading
    useEffect(() => {
        if (!adding) {
            setSynthStep(0);
            return;
        }

        // Set initial fun fact
        setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);

        const stepInterval = setInterval(() => {
            setSynthStep(prev => {
                const next = prev + 1;
                if (next >= SYNTHESIS_STEPS.length) return SYNTHESIS_STEPS.length - 1; // Stay on last
                return next;
            });
        }, 4000); // Advance every 4 seconds

        const factInterval = setInterval(() => {
            setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
        }, 8000); // Change fact every 8 seconds

        return () => {
            clearInterval(stepInterval);
            clearInterval(factInterval);
        };
    }, [adding]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            // Auto-fill title if empty
            if (!newSource.title) {
                setNewSource(prev => ({ ...prev, title: file.name.replace('.pdf', '') }));
            }
        }
    };

    const handleAddSource = async (e) => {
        e.preventDefault();
        setAdding(true);
        setSynthStep(0);

        try {
            let responseData;

            if (newSource.type === 'video') {
                // JSON upload for Video
                const { data } = await axios.post('/api/sources', {
                    ...newSource,
                    userId
                });
                responseData = data;
            } else {
                // FormData upload for PDF
                if (!selectedFile) {
                    alert("Please select a PDF file.");
                    setAdding(false);
                    return;
                }

                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('userId', userId);
                formData.append('type', 'pdf');
                formData.append('title', newSource.title);

                const { data } = await axios.post('/api/sources', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                responseData = data;
            }

            setSources([...sources, responseData]);
            setShowAddModal(false);
            setNewSource({ title: '', url: '', type: 'video' });
            setSelectedFile(null);
        } catch (error) {
            console.error("Failed to add source:", error);
            alert(`Failed to add source: ${error.response?.data?.message || error.message}`);
        } finally {
            setAdding(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-background text-primary">
            <Loader className="w-10 h-10 animate-spin" />
        </div>
    );

    const currentStep = SYNTHESIS_STEPS[synthStep];
    const StepIcon = currentStep?.icon || Loader;

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
                    <p className="text-gray-400 max-w-sm">Click "Add New Source" to add a video or PDF and let Aether synthesize your first study session.</p>
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
                            {/* Normal form state */}
                            {!adding ? (
                                <>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Plus className="w-5 h-5 text-primary" />
                                            Add New Source
                                        </h3>
                                        <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Type Selector Tabs */}
                                    <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                                        <button
                                            onClick={() => setNewSource({ ...newSource, type: 'video' })}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${newSource.type === 'video' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <Video size={16} /> YouTube Video
                                        </button>
                                        <button
                                            onClick={() => setNewSource({ ...newSource, type: 'pdf' })}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${newSource.type === 'pdf' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <FileText size={16} /> PDF Document
                                        </button>
                                    </div>

                                    <form onSubmit={handleAddSource} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none text-white"
                                                placeholder={newSource.type === 'video' ? "e.g., Intro to Neural Networks" : "e.g., Research Paper Name"}
                                                value={newSource.title}
                                                onChange={e => setNewSource({ ...newSource, title: e.target.value })}
                                                required
                                            />
                                        </div>

                                        {newSource.type === 'video' ? (
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
                                        ) : (
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Upload PDF</label>
                                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-colors group cursor-pointer relative">
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={handleFileChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        required
                                                    />
                                                    {selectedFile ? (
                                                        <div className="flex flex-col items-center text-blue-400">
                                                            <FileText size={32} className="mb-2" />
                                                            <span className="text-sm font-bold">{selectedFile.name}</span>
                                                            <span className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center text-gray-500 group-hover:text-gray-300">
                                                            <Upload size={32} className="mb-2" />
                                                            <span className="text-sm font-bold">Click to Upload PDF</span>
                                                            <span className="text-xs">Max 10MB</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-black font-bold py-3 rounded-xl mt-2 hover:bg-primary/90 transition-colors flex justify-center gap-2"
                                        >
                                            {newSource.type === 'video' ? 'Add Video to Library' : 'Analyze PDF'}
                                        </button>
                                        <p className="text-[10px] text-gray-500 text-center">
                                            Aether will automatically generate a summary, quizzes, and a knowledge graph.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                /* Animated Synthesis Loading Experience */
                                <div className="py-4">
                                    {/* Animated brain icon */}
                                    <div className="flex justify-center mb-6">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center relative"
                                        >
                                            <StepIcon className="w-8 h-8 text-primary" />
                                            {/* Orbiting dot */}
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute -inset-2"
                                            >
                                                <div className="w-2.5 h-2.5 rounded-full bg-secondary absolute top-0 left-1/2 -translate-x-1/2" />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Current step label */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={synthStep}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-center mb-6"
                                        >
                                            <h3 className="text-sm font-bold mb-1">{currentStep.label}</h3>
                                            <p className="text-[11px] text-gray-500">{currentStep.tip}</p>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Progress Steps */}
                                    <div className="space-y-2 mb-6">
                                        {SYNTHESIS_STEPS.map((step, i) => {
                                            const Icon = step.icon;
                                            const isDone = i < synthStep;
                                            const isCurrent = i === synthStep;

                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all ${isDone ? 'bg-primary/10 text-primary' :
                                                            isCurrent ? 'bg-white/10 text-white' :
                                                                'text-gray-600'
                                                        }`}
                                                >
                                                    {isDone ? (
                                                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                                    ) : isCurrent ? (
                                                        <Loader className="w-4 h-4 animate-spin flex-shrink-0" />
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border border-gray-700 flex-shrink-0" />
                                                    )}
                                                    <span className={isDone ? 'line-through opacity-60' : ''}>{step.label.replace('...', '')}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Fun Fact */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={funFact}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="bg-white/5 border border-white/5 rounded-xl p-3 text-center"
                                        >
                                            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Did you know?</p>
                                            <p className="text-xs text-gray-300">{funFact}</p>
                                        </motion.div>
                                    </AnimatePresence>

                                    <p className="text-[10px] text-gray-600 text-center mt-4">
                                        This usually takes 15-30 seconds. Please don't close this window.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
