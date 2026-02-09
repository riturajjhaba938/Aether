const StudySource = require('../models/StudySource');
const { YoutubeTranscript } = require('youtube-transcript');
const pdf = require('pdf-parse');

const { generateAetherContent } = require('./aiController');

exports.addSource = async (req, res) => {
    try {
        const { title, type, url, userId } = req.body;
        let content = '';

        if (type === 'video') {
            // Extract YouTube Transcript
            const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
            try {
                const transcript = await YoutubeTranscript.fetchTranscript(videoId);
                content = transcript.map(t => t.text).join(' ');
            } catch (err) {
                console.error("Transcript Error:", err);
                content = "Transcript unavailable. AI analysis will be limited.";
            }
        } else if (type === 'pdf') {
            // PDF logic placeholder
            content = req.body.content || 'PDF Content Placeholder';
        }

        // --- NEW: AI Synthesis Pass ---
        const aiAnalysis = await generateAetherContent(content);

        const source = await StudySource.create({
            userId,
            title,
            type,
            url,
            content,
            aiData: aiAnalysis
        });

        res.status(201).json(source);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSources = async (req, res) => {
    try {
        const sources = await StudySource.find({ userId: req.params.userId });
        res.json(sources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
