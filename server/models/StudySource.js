const mongoose = require('mongoose');

const studySourceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf', 'notes'], required: true },
    url: { type: String }, // YouTube URL or PDF storage URL
    content: { type: String }, // Extracted transcript or text
    summary: { type: String }, // AI-generated summary
    milestones: [{
        timestamp: { type: Number },
        label: { type: String }
    }],
    quiz: [{
        question: { type: String },
        options: [{ type: String }],
        answer: { type: Number }, // Index of correct option
        timestamp: { type: Number } // Video timestamp for context
    }],
    aiData: {
        summary: { type: String },
        knowledge_graph: [{
            term: { type: String },
            definition: { type: String },
            relevance_score: { type: Number },
            group: { type: Number } // Added for force-graph
        }],
        interactive_timeline: [{
            timestamp: { type: Number },
            label: { type: String },
            deep_dive: { type: String }
        }],
        quiz_bank: [{
            question: { type: String },
            options: [{ type: String }],
            answer: { type: Number }, // Index of correct option
            distractor_explanation: { type: String },
            timestamp: { type: Number }, // Video timestamp link
            citation: { type: String } // Verbatim text snippet from document
        }],
        the_gravity_shift: { type: String }
    },
    chunks: [{
        text: { type: String },
        metadata: {
            timestamp: { type: Number }, // for video
            page: { type: Number },      // for pdf
        },
        embedding: { type: [Number] } // Vector embedding
    }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudySource', studySourceSchema);
