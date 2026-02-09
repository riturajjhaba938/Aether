import React from 'react';
import { Play, Maximize2, ShieldAlert } from 'lucide-react';

const ContentPane = ({ source }) => {
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

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex-1 glass rounded-[32px] overflow-hidden relative group">
                {source.type === 'video' ? (
                    <div className="w-full h-full bg-black flex items-center justify-center text-gray-500">
                        {/* Real YouTube Embed would go here */}
                        <div className="text-center">
                            <Video className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="text-sm font-mono">VIDEO_PLAYER_REPLACEMENT: {source.title}</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-500">
                        {/* PDF Viewer would go here */}
                        <div className="text-center">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="text-sm font-mono">PDF_VIEWER_REPLACEMENT: {source.title}</p>
                        </div>
                    </div>
                )}

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg hover:bg-black/70">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="glass p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                        {source.type}
                    </div>
                    <h4 className="font-bold text-sm">{source.title}</h4>
                </div>
                <div className="flex gap-2">
                    {/* Timeline markers would go here */}
                </div>
            </div>
        </div>
    );
};

export default ContentPane;
