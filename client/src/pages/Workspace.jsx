import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, MessageSquare, X } from 'lucide-react';
import axios from 'axios';
import ContentPane from '../components/dashboard/ContentPane';
import ChatPane from '../components/dashboard/ChatPane';
import KnowledgeGraph from '../components/dashboard/KnowledgeGraph';

const Workspace = () => {
    const { sourceId } = useParams();
    const navigate = useNavigate();
    const [source, setSource] = useState(null);
    const [viewMode, setViewMode] = useState('split');
    const [showChat, setShowChat] = useState(true);

    useEffect(() => {
        const loadSource = async () => {
            try {
                const { data } = await axios.get(`/sources/single/${sourceId}`);
                setSource(data);
            } catch (err) {
                console.error("Failed to load source:", err);
                navigate('/dashboard');
            }
        };
        loadSource();
    }, [sourceId, navigate]);

    const getGraphData = () => {
        if (!source?.aiData?.knowledge_graph?.length) {
            return {
                nodes: [{ id: 'Root', group: 1 }, { id: 'Concept A', group: 2 }, { id: 'Concept B', group: 2 }],
                links: [{ source: 'Root', target: 'Concept A' }, { source: 'Root', target: 'Concept B' }]
            };
        }
        const rootId = source.title || 'Root';
        const nodes = [{ id: rootId, group: 0, val: 20 }];
        const links = [];
        source.aiData.knowledge_graph.forEach((item) => {
            nodes.push({ id: item.term, group: item.group || 1, val: item.relevance_score || 5 });
            links.push({ source: rootId, target: item.term });
        });
        return { nodes, links };
    };

    if (!source) return (
        <div className="h-screen flex items-center justify-center bg-background text-primary">
            <Loader className="w-10 h-10 animate-spin" />
        </div>
    );

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this source? This action cannot be undone.")) return;

        try {
            await axios.delete(`/sources/${sourceId}`);
            navigate('/dashboard');
        } catch (err) {
            console.error("Failed to delete source:", err);
            alert("Failed to delete source. Please try again.");
        }
    };

    const isFocusMode = viewMode === 'focus';

    return (
        <div className="h-screen pt-16 sm:pt-20 flex flex-col overflow-hidden">
            {/* Back Button */}
            <div className="px-3 sm:px-4 pt-2 pb-1 flex-shrink-0">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Library</span>
                    <span className="sm:hidden">Back</span>
                </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-2 sm:gap-4 p-2 sm:p-4 overflow-auto md:overflow-hidden relative">
                {/* Main Interactive Area */}
                <div className={`${isFocusMode ? 'absolute inset-2 sm:inset-4 z-40' : 'flex-[2] min-h-[300px]'} flex flex-col gap-2 sm:gap-4 overflow-hidden transition-all duration-300`}>
                    <div className="flex-1 min-h-0" style={{ minHeight: '250px' }}>
                        <ContentPane
                            source={source}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            onClose={() => navigate('/dashboard')}
                            onDelete={handleDelete}
                        />
                    </div>
                    {/* Knowledge Graph - hidden in Focus Mode and on small screens */}
                    {!isFocusMode && (
                        <div className="h-48 sm:h-64 flex-shrink-0 hidden sm:block">
                            <KnowledgeGraph data={getGraphData()} />
                        </div>
                    )}
                </div>

                {/* Sidebar: AI Chat */}
                {/* Chat: always visible below on mobile, sidebar on desktop, floating in Zen */}
                {!isFocusMode && (
                    <div className="flex-1 min-h-[250px] md:min-h-0">
                        <ChatPane source={source} />
                    </div>
                )}

                {/* Zen mode: floating chat panel */}
                {isFocusMode && showChat && (
                    <div className="absolute right-2 sm:right-8 bottom-2 sm:bottom-8 w-[calc(100%-1rem)] sm:w-96 h-[60vh] sm:h-[500px] z-50 glass shadow-2xl rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden">
                        <button
                            onClick={() => setShowChat(false)}
                            className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                            title="Close AI Assistant"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <ChatPane source={source} />
                    </div>
                )}

                {/* Floating re-open button in Zen mode only */}
                {isFocusMode && !showChat && (
                    <button
                        onClick={() => setShowChat(true)}
                        className="absolute right-4 bottom-4 z-50 p-4 rounded-full bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 shadow-xl transition-all hover:scale-110"
                        title="Open AI Assistant"
                    >
                        <MessageSquare className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Workspace;
