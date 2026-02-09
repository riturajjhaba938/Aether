import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Video, FileText, MessageSquare, BookOpen, Send, Mic, Play, Settings } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import ContentPane from '../components/dashboard/ContentPane';
import ChatPane from '../components/dashboard/ChatPane';
import KnowledgeGraph from '../components/dashboard/KnowledgeGraph';

const Dashboard = () => {
    const [activeSource, setActiveSource] = useState(null);
    const [sources, setSources] = useState([
        { id: 1, type: 'video', title: 'Quantum Physics Lecture', url: 'https://youtube.com/...' },
        { id: 2, type: 'pdf', title: 'Calculus III Notes', url: '/path/to/pdf' }
    ]);

    return (
        <div className="h-screen pt-20 flex overflow-hidden">
            {/* Sidebar for Source Management */}
            <Sidebar
                sources={sources}
                activeSource={activeSource}
                setActiveSource={setActiveSource}
                onAddSource={() => console.log('Add Source')}
            />

            {/* Main Study Arena */}
            <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
                {/* Left: Content Viewer (Video/PDF) */}
                <div className="flex-[1.5] flex flex-col gap-4 overflow-hidden">
                    <div className="flex-1 min-h-0">
                        <ContentPane source={activeSource} />
                    </div>
                    <div className="h-64 flex-shrink-0">
                        <KnowledgeGraph data={{
                            nodes: [{ id: 'Root', group: 1 }, { id: 'Child 1', group: 2 }, { id: 'Child 2', group: 2 }],
                            links: [{ source: 'Root', target: 'Child 1' }, { source: 'Root', target: 'Child 2' }]
                        }} />
                    </div>
                </div>

                {/* Right: AI Assistant & Notes */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                    <ChatPane source={activeSource} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
