import React, { useRef, useState, useEffect } from 'react';
// Native iframe approach for maximum stability
import { Play, Maximize2, FileText, CheckCircle, HelpCircle, ArrowRight, X, Gamepad2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConceptGame from './ConceptGame';

const extractVideoId = (url) => {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') return urlObj.pathname.slice(1);
        if (urlObj.hostname.includes('youtube.com')) {
            return urlObj.searchParams.get('v') || urlObj.pathname.split('/').filter(Boolean).pop();
        }
    } catch (e) { }

    // Fallback logic
    const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()?.split('?')[0] || url;
    return id;
};

const formatNotesWithCitations = (text, onSeek) => {
    if (!text) return null;
    // Match [M:SS] or [MM:SS] or (M:SS) or M:SS
    const parts = text.split(/(\[?\d{1,2}:\d{2}\]?)/g);
    return parts.map((part, i) => {
        const match = part.match(/\[?(\d{1,2}):(\d{2})\]?/);
        if (match) {
            const minutes = parseInt(match[1], 10);
            const seconds = parseInt(match[2], 10);
            const totalSeconds = minutes * 60 + seconds;
            return (
                <button
                    key={i}
                    onClick={() => onSeek(totalSeconds)}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-primary/20 text-primary hover:bg-primary hover:text-black rounded text-[0.9em] font-bold transition-all mx-0.5"
                >
                    <Play size={10} fill="currentColor" /> {match[1]}:{match[2]}
                </button>
            );
        }
        return part;
    });
};

const ContentPane = ({ source, viewMode, setViewMode, onClose, onDelete }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoError, setVideoError] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showGame, setShowGame] = useState(false);


    // Reset error when source changes
    useEffect(() => {
        setVideoError(false);
        setPlaying(false);
    }, [source]);

    // Handle external seek requests using native postMessage to the iframe
    const seekTo = (seconds) => {
        const frame = document.getElementById('aether-player');
        if (frame) {
            frame.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'seekTo',
                args: [seconds, true]
            }), '*');
            // Force play in case it was paused
            frame.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'playVideo'
            }), '*');
            setPlaying(true);
        }
    };

    if (!source) {
        return (
            <div className="h-full glass rounded-[32px] flex flex-col items-center justify-center text-center p-10 relative overflow-hidden">
                <div className="absolute inset-0 scanline opacity-20" />
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 relative animate-pulse-slow">
                    <Brain className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Synthesizing Aether...</h3>
                <p className="text-gray-400 max-w-sm mb-8">Preparing your interactive study environment. Connecting neurons, mapping concepts, and generating insights.</p>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>
        );
    }

    // Safely access AI Data with fallbacks
    const aiData = source.aiData || {};
    const milestones = aiData.interactive_timeline || source.milestones || [];
    const quiz = aiData.quiz_bank || source.quiz || [];
    const videoId = extractVideoId(source.url);

    return (
        <div className="h-full flex flex-col gap-4 relative">
            <div className="flex-1 glass rounded-2xl sm:rounded-[32px] overflow-hidden relative group font-sans flex flex-col">
                {source.type === 'video' ? (
                    <div className="flex-1 bg-black relative min-h-0" style={{ minHeight: '300px' }}>
                        {videoError ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-red-900/20">
                                <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
                                <h3 className="text-lg font-bold text-red-400">Video Playback Failed</h3>
                                <p className="text-sm text-gray-400 max-w-xs">Could not load video. The URL might be invalid or restricted.</p>
                                <p className="text-xs text-gray-500 mt-2 font-mono">{source.url || 'No URL provided'}</p>
                            </div>
                        ) : (
                            <div className="absolute inset-0 z-10">
                                <iframe
                                    id="aether-player"
                                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&autoplay=1&mute=1&modestbranding=1&rel=0`}
                                    className="w-full h-full border-none"
                                    title={source.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}
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
                            {source.content || aiData.summary ? (
                                <div className="whitespace-pre-wrap">{formatNotesWithCitations(source.content || aiData.summary, seekTo)}</div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
                                    <FileText className="w-16 h-16 mb-4" />
                                    <p>No text content available.</p>
                                    <p className="text-xs mt-2 text-gray-600">{source.title}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Quiz Overlay / Panel - Now an absolute overlay to prevent layout shifts */}
                <AnimatePresence>
                    {showQuiz && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="absolute bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-primary/20 max-h-[80%] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20"
                        >
                            <div className="p-4 sm:p-6 pb-20 sm:pb-6"> {/* Bottom padding for mobile visibility */}
                                <div className="flex items-center justify-between mb-4 sticky top-0 bg-black/10 backdrop-blur-sm -mx-4 -mt-4 p-4 z-10 border-b border-white/5">
                                    <h3 className="font-bold flex items-center gap-2 text-sm sm:text-base">
                                        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        Contextual Quiz
                                    </h3>
                                    <button
                                        onClick={() => setShowQuiz(false)}
                                        className="p-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-gray-400 hover:text-white transition-colors border border-white/10"
                                    >
                                        Close
                                    </button>
                                </div>

                                {quiz.length > 0 ? (
                                    <div className="space-y-8">
                                        {quiz.map((q, i) => (
                                            <div key={i} className="space-y-3 pb-4 border-b border-white/5 last:border-0">
                                                <div className="flex gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-[10px] font-bold">
                                                        {i + 1}
                                                    </span>
                                                    <p className="font-medium text-sm leading-relaxed">{q.question}</p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-9">
                                                    {q.options.map((opt, optIndex) => (
                                                        <button
                                                            key={optIndex}
                                                            onClick={() => setSelectedAnswer(`${i}-${optIndex}`)}
                                                            className={`p-3 rounded-xl text-left text-[11px] transition-all border ${selectedAnswer === `${i}-${optIndex}`
                                                                ? optIndex === q.answer
                                                                    ? 'bg-green-500/20 border-green-500/50 text-green-200'
                                                                    : 'bg-red-500/20 border-red-500/50 text-red-200'
                                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30'
                                                                }`}
                                                        >
                                                            <div className="flex justify-between items-center gap-2">
                                                                <span>{opt}</span>
                                                                {selectedAnswer === `${i}-${optIndex}` && (
                                                                    optIndex === q.answer
                                                                        ? <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                                                        : <X size={14} className="text-red-400 flex-shrink-0" />
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Contextual Link Button & Feedback */}
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pl-9 mt-2">
                                                    <div className="flex-1">
                                                        {selectedAnswer?.startsWith(`${i}-`) && (
                                                            <motion.p
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className={`text-[10px] italic ${selectedAnswer.endsWith(`-${q.answer}`) ? 'text-green-400/70' : 'text-gray-400'}`}
                                                            >
                                                                {selectedAnswer.endsWith(`-${q.answer}`)
                                                                    ? "Correct! Great job."
                                                                    : q.distractor_explanation || "Not quite right. Try again or check the explanation."}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    {(q.timestamp !== undefined && q.timestamp !== null) && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                seekTo(q.timestamp || 0);
                                                                setPlaying(true);
                                                            }}
                                                            className="text-[10px] flex items-center gap-1.5 px-3 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/40 transition-all font-bold shadow-lg shadow-primary/10 whitespace-nowrap"
                                                        >
                                                            <Play className="w-3 h-3 fill-current" />
                                                            Jump to Explanation ({Math.floor((q.timestamp || 0) / 60)}:{((q.timestamp || 0) % 60).toString().padStart(2, '0')})
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400 text-sm py-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                        No quiz generated for this source yet.
                                    </div>
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
                        className="p-1.5 sm:p-2 -ml-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors flex-shrink-0"
                        title="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="p-1.5 sm:p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                            title="Delete Source"
                        >
                            <AlertCircle className="w-4 h-4" />
                        </button>
                    )}

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
                                className="flex-shrink-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs transition-all flex items-center gap-2 group animate-pulse-slow"
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
