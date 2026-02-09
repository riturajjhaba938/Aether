import React from 'react';
import { Plus, Video, FileText, MoreVertical } from 'lucide-react';

const Sidebar = ({ sources, activeSource, setActiveSource, onAddSource }) => {
    return (
        <aside className="w-64 border-r border-white/10 p-4 flex flex-col bg-background/50 backdrop-blur-md">
            <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-lg font-bold">Your Sources</h2>
                <button
                    onClick={onAddSource}
                    className="p-1.5 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
                {sources.map(source => (
                    <button
                        key={source.id}
                        onClick={() => setActiveSource(source)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeSource?.id === source.id
                                ? 'bg-primary text-background font-bold shadow-lg shadow-primary/20 scale-[1.02]'
                                : 'hover:bg-white/5 text-gray-400 hover:text-white'
                            }`}
                    >
                        {source.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        <span className="truncate text-sm">{source.title}</span>
                    </button>
                ))}
            </div>

            <div className="mt-auto p-4 glass rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">Study Bro #1</p>
                    <p className="text-[10px] text-gray-500 truncate">Premium Plan</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
