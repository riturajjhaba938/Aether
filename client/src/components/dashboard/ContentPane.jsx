import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Maximize2, FileText, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContentPane = ({ source }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

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
            <div className="flex-1 glass rounded-[32px] overflow-hidden relative group font-sans flex flex-col">
                {source.type === 'video' ? (
                    <div className="flex-1 bg-black relative min-h-0">
                        <ReactPlayer
                            ref={playerRef}
                            url={source.url}
                            width="100%"
                            height="100%"
                            playing={playing}
                            controls
                            onProgress={({ playedSeconds }) => setProgress(playedSeconds)}
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 0, modestbranding: 1 }
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex-1 bg-white/5 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="text-sm font-mono">PDF Viewer Implementation Pending</p>
                            <p className="text-xs text-gray-500 mt-2">{source.title}</p>
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
            <div className="glass p-4 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                            {source.type}
                        </div>
                        <h4 className="font-bold text-sm truncate max-w-[200px]">{source.title}</h4>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowQuiz(!showQuiz)}
                            className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold ${showQuiz ? 'bg-primary text-background' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            <HelpCircle className="w-4 h-4" />
                            {showQuiz ? 'Hide Quiz' : 'Quiz'}
                        </button>
                        <div className="text-xs font-mono text-gray-400">
                            {Math.floor(progress / 60)}:{Math.floor(progress % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
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
        </div>
    );
};

export default ContentPane;
