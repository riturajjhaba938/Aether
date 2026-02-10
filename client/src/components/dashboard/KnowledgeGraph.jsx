import React, { useMemo, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import { Info, X } from 'lucide-react';

const KnowledgeGraph = ({ data }) => {
    const [showInfo, setShowInfo] = useState(false);

    const graphData = useMemo(() => {
        if (!data) return { nodes: [], links: [] };
        return data;
    }, [data]);

    return (
        <div className="w-full h-full glass rounded-2xl sm:rounded-[32px] overflow-hidden relative">
            {/* Title Bar */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                    Aetherial Neuron-Map
                </h3>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    title="What is this?"
                >
                    <Info className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Info Overlay */}
            {showInfo && (
                <div className="absolute inset-0 z-20 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="max-w-sm glass rounded-2xl p-5 relative">
                        <button
                            onClick={() => setShowInfo(false)}
                            className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                            <h4 className="text-sm font-bold">Aetherial Neuron-Map</h4>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed mb-3">
                            This is an interactive 3D visualization of <strong>concepts and their connections</strong> from your study material. Just like neurons in your brain, each node represents a key concept, and the links show how they're related.
                        </p>

                        <div className="space-y-2 text-[11px]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-gray-400"><strong className="text-primary">Blue nodes</strong> — Primary concepts (main topics)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-secondary flex-shrink-0" />
                                <span className="text-gray-400"><strong className="text-secondary">Purple nodes</strong> — Related sub-concepts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-white/20 flex-shrink-0" />
                                <span className="text-gray-400"><strong className="text-white">Lines</strong> — Relationships between concepts</span>
                            </div>
                        </div>

                        <div className="mt-3 p-2.5 bg-white/5 rounded-xl text-[10px] text-gray-500">
                            💡 <strong>Tip:</strong> Click and drag to rotate the graph. Hover over a node to see its name. The bigger the node, the more important the concept.
                        </div>
                    </div>
                </div>
            )}

            <ForceGraph3D
                graphData={graphData}
                backgroundColor="#02061700"
                nodeLabel="id"
                nodeColor={node => node.group === 1 ? '#38BDF8' : '#A78BFA'}
                linkColor={() => '#ffffff22'}
                height={400}
                showNavInfo={false}
            />
        </div>
    );
};

export default KnowledgeGraph;
