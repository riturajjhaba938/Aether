const mongoose = require('mongoose');

const studySourceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf', 'notes'], required: true },
    url: { type: String }, // YouTube URL or PDF storage URL
    content: { type: String }, // Extracted transcript or text
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
