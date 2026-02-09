import React, { useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

const KnowledgeGraph = ({ data }) => {
    const graphData = useMemo(() => {
        if (!data) return { nodes: [], links: [] };
        // Example data structure: 
        // nodes: [{ id: 'Quantum Physics', group: 1 }, { id: 'Schrodinger', group: 1 }]
        // links: [{ source: 'Quantum Physics', target: 'Schrodinger' }]
        return data;
    }, [data]);

    return (
        <div className="w-full h-full glass rounded-[32px] overflow-hidden relative">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                    Aetherial Neuron-Map
                </h3>
            </div>

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
