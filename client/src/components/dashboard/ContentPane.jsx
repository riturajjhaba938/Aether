import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Maximize2, FileText, CheckCircle, HelpCircle, ArrowRight, X, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConceptGame from './ConceptGame';

const extractVideoId = (url) => {
    if (!url) return '';
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') return urlObj.pathname.slice(1);
        if (urlObj.hostname.includes('youtube.com')) {
            return urlObj.searchParams.get('v') || urlObj.pathname.split('/').filter(Boolean).pop();
        }
    } catch (e) { }

    // Fallback logic
    const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()?.split('?')[0] || url;
    console.log('[ContentPane] Extracted Video ID:', id, 'from:', url);
    return id;
};

const ContentPane = ({ source, viewMode, setViewMode, onClose }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showGame, setShowGame] = useState(false);

    // Handle external seek requests
    const seekTo = (seconds) => {
        playerRef.current?.seekTo(seconds, 'seconds');
        setPlaying(true);
    };

    if (!source) {
        return (
            <div className="h-full glass rounded-[32px] flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Play className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ready to Learn?</h3>
                <p className="text-gray-400 max-w-xs">Select a source from the sidebar or upload a new one to begin your Aetherial study session.</p>
            </div>
        );
    }

    // Safely access AI Data with fallbacks
    const aiData = source.aiData || {};
    const milestones = aiData.interactive_timeline || source.milestones || [];
    const quiz = aiData.quiz_bank || source.quiz || [];

    return (
        <div className="h-full flex flex-col gap-4 relative">
            <div className="flex-1 glass rounded-2xl sm:rounded-[32px] overflow-hidden relative group font-sans flex flex-col">
                {source.type === 'video' ? (
                    <div className="flex-1 bg-black relative min-h-0" style={{ minHeight: '300px' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            <ReactPlayer
                                ref={playerRef}
                                url={`https://www.youtube.com/watch?v=${extractVideoId(source.url)}`}
                                width="100%"
                                height="100%"
                                playing={playing}
                                controls={true}
                                onReady={() => setPlaying(true)}
                                onProgress={({ playedSeconds }) => setProgress(playedSeconds)}
                                onError={(e) => console.error('ReactPlayer Error:', e)}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            showinfo: 0,
                                            modestbranding: 1,
                                            origin: window.location.origin
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white/5 flex flex-col relative overflow-hidden">
                        <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-400">
                                <FileText className="w-5 h-5 text-blue-400" />
                                <span className="text-sm font-medium">PDF Document Viewer</span>
                            </div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Read Only</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-serif text-gray-300 leading-relaxed text-lg max-w-4xl mx-auto w-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {source.content ? (
                                <div className="whitespace-pre-wrap">{source.content}</div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
                                    <FileText className="w-16 h-16 mb-4" />
                                    <p>No text content available.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Quiz Overlay / Panel */}
                <AnimatePresence>
                    {showQuiz && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/50 backdrop-blur-md border-t border-white/10"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        Contextual Quiz
                                    </h3>
                                    <button onClick={() => setShowQuiz(false)} className="text-xs text-gray-400 hover:text-white">Close</button>
                                </div>

                                {quiz.length > 0 ? (
                                    <div className="space-y-6">
                                        {quiz.map((q, i) => (
                                            <div key={i} className="space-y-3">
                                                <p className="font-medium text-sm">{q.question}</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {q.options.map((opt, optIndex) => (
                                                        <button
                                                            key={optIndex}
                                                            onClick={() => setSelectedAnswer(`${i}-${optIndex}`)}
                                                            className={`p-3 rounded-xl text-left text-xs transition-all border ${selectedAnswer === `${i}-${optIndex}`
                                                                ? optIndex === q.answer
                                                                    ? 'bg-green-500/20 border-green-500/50 text-green-200'
                                                                    : 'bg-red-500/20 border-red-500/50 text-red-200'
                                                                : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                                {/* Contextual Link Button */}
                                                <div className="flex justify-end items-center gap-2">
                                                    {q.distractor_explanation && selectedAnswer?.startsWith(`${i}-`) && (
                                                        <span className="text-[10px] text-gray-400 italic mr-auto">{q.distractor_explanation.substring(0, 50)}...</span>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            seekTo(q.timestamp || 0);
                                                            setPlaying(true);
                                                        }}
                                                        className="text-[10px] flex items-center gap-1 text-primary hover:underline hover:text-primary/80 transition-colors"
                                                    >
                                                        <Play className="w-3 h-3" />
                                                        Jump to Explanation ({Math.floor((q.timestamp || 0) / 60)}:{((q.timestamp || 0) % 60).toString().padStart(2, '0')})
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400 text-sm py-4">No quiz generated yet.</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Control Bar */}
            <div className="glass p-2 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col gap-2 relative z-50">
                {/* Row 1: Title + Close */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={onClose}
                        className="p-1.5 sm:p-2 -ml-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                        title="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider flex-shrink-0">
                        {source.type}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm truncate flex-1">{source.title}</h4>

                    {/* Buttons inline on desktop */}
                    <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={() => setViewMode(viewMode === 'focus' ? 'split' : 'focus')}
                            className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold ${viewMode === 'focus' ? 'bg-primary text-background' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            <Maximize2 className="w-4 h-4" />
                            {viewMode === 'focus' ? 'Exit Zen' : 'Zen Mode'}
                        </button>
                        <button
                            onClick={() => setShowQuiz(!showQuiz)}
                            className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold ${showQuiz ? 'bg-primary text-background' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            <HelpCircle className="w-4 h-4" />
                            {showQuiz ? 'Hide Quiz' : 'Quiz'}
                        </button>
                        <button
                            onClick={() => setShowGame(true)}
                            className="p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20"
                        >
                            <Gamepad2 className="w-4 h-4" />
                            Play Game
                        </button>
                    </div>
                </div>

                {/* Row 2: Action buttons on mobile only */}
                <div className="flex sm:hidden items-center gap-2">
                    <button
                        onClick={() => setViewMode(viewMode === 'focus' ? 'split' : 'focus')}
                        className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-bold ${viewMode === 'focus' ? 'bg-primary text-background' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        <Maximize2 className="w-3.5 h-3.5" />
                        {viewMode === 'focus' ? 'Exit Zen' : 'Zen'}
                    </button>
                    <button
                        onClick={() => setShowQuiz(!showQuiz)}
                        className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-bold ${showQuiz ? 'bg-primary text-background' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        {showQuiz ? 'Hide Quiz' : 'Quiz'}
                    </button>
                    <button
                        onClick={() => setShowGame(true)}
                        className="flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20"
                    >
                        <Gamepad2 className="w-3.5 h-3.5" />
                        Game
                    </button>
                </div>

                {/* AI Milestones Timeline */}
                {milestones.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {milestones.map((m, i) => (
                            <button
                                key={i}
                                onClick={() => seekTo(m.timestamp)}
                                className="flex-shrink-0 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs transition-all flex items-center gap-2 group"
                                title={m.deep_dive || m.label}
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary transition-colors" />
                                {m.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Concept Matcher Game Overlay */}
            {showGame && (
                <ConceptGame source={source} onClose={() => setShowGame(false)} />
            )}
        </div>
    );
};

export default ContentPane;
