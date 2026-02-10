import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Video, FileText, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6"
                    >
                        <Sparkles className="w-3 h-3" />
                        Hackathon Winner - Team Code Bros
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
                    >
                        Your Second Brain for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Complex Study.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm sm:text-lg text-gray-400 mb-6 sm:mb-10 leading-relaxed"
                    >
                        Synthesize YouTube lectures, PDFs, and your own notes into a unified,
                        AI-powered interactive experience. Stop searching, start understanding.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/login" className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform text-sm sm:text-base">
                            Get Started for Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="px-6 sm:px-8 py-3 sm:py-4 glass font-bold rounded-2xl hover:bg-white/10 transition-all text-sm sm:text-base">
                            Watch Demo
                        </button>
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <div className="mt-16 sm:mt-32 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {[
                        { icon: Video, title: "Video Deep-Link", desc: "Jump from an AI note directly to the video timestamp." },
                        { icon: FileText, title: "PDF Synthesis", desc: "AI compares your slides with lecture transcripts in real-time." },
                        { icon: Share2, title: "Knowledge Map", desc: "Visualize concept connections in a dynamic 3D graph." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-primary/50 transition-colors group"
                        >
                            <div className="p-3 bg-white/5 rounded-2xl w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
