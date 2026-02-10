import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Zap, RotateCcw, HelpCircle, Timer, Star, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

const ConceptGame = ({ source, onClose }) => {
    const [gameState, setGameState] = useState('rules'); // rules, playing, results
    const [score, setScore] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedDef, setSelectedDef] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [wrongPair, setWrongPair] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);

    // Build game data from AI knowledge graph
    const gameRounds = useMemo(() => {
        const kg = source?.aiData?.knowledge_graph || [];
        if (kg.length < 3) {
            // Fallback demo data
            return [[
                { term: 'Concept 1', definition: 'Definition for concept 1' },
                { term: 'Concept 2', definition: 'Definition for concept 2' },
                { term: 'Concept 3', definition: 'Definition for concept 3' },
                { term: 'Concept 4', definition: 'Definition for concept 4' },
            ]];
        }

        // Shuffle and split into rounds of 4
        const shuffled = [...kg].sort(() => Math.random() - 0.5);
        const rounds = [];
        for (let i = 0; i < shuffled.length; i += 4) {
            const round = shuffled.slice(i, i + 4);
            if (round.length >= 3) {
                rounds.push(round.map(item => ({
                    term: item.term,
                    definition: item.definition || `A key concept related to ${source?.title || 'this topic'}`
                })));
            }
        }
        return rounds.length > 0 ? rounds : [[
            { term: 'No Data', definition: 'AI synthesis needed for game data' }
        ]];
    }, [source]);

    const currentPairs = gameRounds[currentRound] || [];
    const totalRounds = gameRounds.length;

    // Shuffled definitions for display
    const shuffledDefs = useMemo(() => {
        return [...currentPairs].sort(() => Math.random() - 0.5);
    }, [currentRound, currentPairs]);

    // Timer
    useEffect(() => {
        if (gameState !== 'playing') return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [gameState]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setCurrentRound(0);
        setMatchedPairs([]);
        setSelectedTerm(null);
        setSelectedDef(null);
        setWrongPair(null);
        setTimeLeft(0);
        setStreak(0);
        setBestStreak(0);
    };

    const handleTermClick = (term) => {
        if (matchedPairs.includes(term)) return;
        setSelectedTerm(term);
        setWrongPair(null);

        if (selectedDef) {
            checkMatch(term, selectedDef);
        }
    };

    const handleDefClick = (def) => {
        if (matchedPairs.some(t => currentPairs.find(p => p.term === t)?.definition === def)) return;
        setSelectedDef(def);
        setWrongPair(null);

        if (selectedTerm) {
            checkMatch(selectedTerm, def);
        }
    };

    const checkMatch = (term, def) => {
        const pair = currentPairs.find(p => p.term === term);
        if (pair && pair.definition === def) {
            // Correct match!
            const newMatched = [...matchedPairs, term];
            setMatchedPairs(newMatched);
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak > bestStreak) setBestStreak(newStreak);
            setScore(prev => prev + (10 * newStreak)); // Streak bonus points
            setSelectedTerm(null);
            setSelectedDef(null);

            // Check if round complete
            if (newMatched.length === currentPairs.length) {
                setTimeout(() => {
                    if (currentRound + 1 < totalRounds) {
                        setCurrentRound(prev => prev + 1);
                        setMatchedPairs([]);
                    } else {
                        setGameState('results');
                    }
                }, 600);
            }
        } else {
            // Wrong match
            setWrongPair({ term, def });
            setStreak(0);
            setTimeout(() => {
                setWrongPair(null);
                setSelectedTerm(null);
                setSelectedDef(null);
            }, 800);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-xl">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Concept Matcher</h2>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                    {source?.title || 'Study Game'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Rules Screen */}
                    {gameState === 'rules' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass rounded-2xl p-5 sm:p-8"
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                                    <Zap className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">How to Play</h3>
                                <p className="text-sm text-gray-400">
                                    Match concepts from your study material with their definitions!
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                {[
                                    { icon: '🎯', title: 'Match Pairs', desc: 'Tap a concept on the left, then tap its matching definition on the right.' },
                                    { icon: '🔥', title: 'Build Streaks', desc: 'Consecutive correct matches multiply your score! 10 × streak bonus per match.' },
                                    { icon: '⚡', title: 'Beat the Clock', desc: 'Your time is tracked — try to finish faster each round.' },
                                    { icon: '🏆', title: 'Clear All Rounds', desc: `${totalRounds} round${totalRounds > 1 ? 's' : ''} with ${currentPairs.length} pairs each. Match them all to win!` },
                                ].map((rule, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                                        <span className="text-lg">{rule.icon}</span>
                                        <div>
                                            <p className="text-sm font-bold">{rule.title}</p>
                                            <p className="text-xs text-gray-400">{rule.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={startGame}
                                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-sm"
                            >
                                Start Game <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}

                    {/* Playing Screen */}
                    {gameState === 'playing' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* Stats Bar */}
                            <div className="flex items-center justify-between glass rounded-xl px-4 py-2 mb-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 text-primary" />
                                    <span className="font-bold">{score}</span>
                                    <span className="text-gray-500">pts</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                                    <span className="font-bold">{streak}x</span>
                                    <span className="text-gray-500">streak</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Timer className="w-3.5 h-3.5 text-secondary" />
                                    <span className="font-bold">{formatTime(timeLeft)}</span>
                                </div>
                                <div className="text-gray-500">
                                    Round {currentRound + 1}/{totalRounds}
                                </div>
                            </div>

                            {/* Progress dots */}
                            <div className="flex gap-1 mb-4">
                                {currentPairs.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 h-1 rounded-full transition-colors ${i < matchedPairs.length ? 'bg-primary' : 'bg-white/10'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Game Grid */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                {/* Terms Column */}
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-wider text-primary font-bold mb-1 px-1">Concepts</p>
                                    {currentPairs.map((pair) => {
                                        const isMatched = matchedPairs.includes(pair.term);
                                        const isSelected = selectedTerm === pair.term;
                                        const isWrong = wrongPair?.term === pair.term;

                                        return (
                                            <motion.button
                                                key={pair.term}
                                                onClick={() => handleTermClick(pair.term)}
                                                disabled={isMatched}
                                                animate={isWrong ? { x: [0, -4, 4, -4, 0] } : {}}
                                                className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${isMatched
                                                        ? 'bg-primary/20 text-primary border border-primary/30 opacity-60'
                                                        : isWrong
                                                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                            : isSelected
                                                                ? 'bg-primary/30 text-white border border-primary/50 scale-[1.02]'
                                                                : 'glass hover:bg-white/10 border border-transparent'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {isMatched && <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                                                    {isWrong && <XCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                                                    <span className="truncate">{pair.term}</span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Definitions Column */}
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-wider text-secondary font-bold mb-1 px-1">Definitions</p>
                                    {shuffledDefs.map((pair) => {
                                        const isMatched = matchedPairs.includes(pair.term);
                                        const isSelected = selectedDef === pair.definition;
                                        const isWrong = wrongPair?.def === pair.definition;

                                        return (
                                            <motion.button
                                                key={pair.definition}
                                                onClick={() => handleDefClick(pair.definition)}
                                                disabled={isMatched}
                                                animate={isWrong ? { x: [0, 4, -4, 4, 0] } : {}}
                                                className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm transition-all ${isMatched
                                                        ? 'bg-secondary/20 text-secondary border border-secondary/30 opacity-60'
                                                        : isWrong
                                                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                            : isSelected
                                                                ? 'bg-secondary/30 text-white border border-secondary/50 scale-[1.02]'
                                                                : 'glass hover:bg-white/10 border border-transparent'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    {isMatched && <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />}
                                                    {isWrong && <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />}
                                                    <span className="line-clamp-3">{pair.definition}</span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Results Screen */}
                    {gameState === 'results' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass rounded-2xl p-5 sm:p-8 text-center"
                        >
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                                <Trophy className="w-10 h-10 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Game Complete! 🎉</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Great job mastering concepts from "{source?.title}"
                            </p>

                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="glass rounded-xl p-3">
                                    <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                                    <p className="text-xl font-bold">{score}</p>
                                    <p className="text-[10px] text-gray-400">Total Score</p>
                                </div>
                                <div className="glass rounded-xl p-3">
                                    <Timer className="w-5 h-5 text-secondary mx-auto mb-1" />
                                    <p className="text-xl font-bold">{formatTime(timeLeft)}</p>
                                    <p className="text-[10px] text-gray-400">Time</p>
                                </div>
                                <div className="glass rounded-xl p-3">
                                    <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                                    <p className="text-xl font-bold">{bestStreak}x</p>
                                    <p className="text-[10px] text-gray-400">Best Streak</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={startGame}
                                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-sm"
                                >
                                    <RotateCcw className="w-4 h-4" /> Play Again
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 glass hover:bg-white/10 font-bold rounded-xl text-sm transition-all"
                                >
                                    Back to Study
                                </button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConceptGame;
