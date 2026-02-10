const StudySource = require('../models/StudySource');
const { YoutubeTranscript } = require('youtube-transcript');
const pdf = require('pdf-parse');

const { generateAetherContent } = require('./aiController');

exports.addSource = async (req, res) => {
    try {
        const { title, type, url, userId } = req.body;
        let content = '';

        if (type === 'video') {
            // Robust YouTube Video ID Extraction
            let videoId = null;
            try {
                const urlObj = new URL(url);
                if (urlObj.hostname === 'youtu.be') {
                    // Short URL: https://youtu.be/VIDEO_ID?si=...
                    videoId = urlObj.pathname.slice(1);
                } else if (urlObj.hostname.includes('youtube.com')) {
                    // Standard: ?v=VIDEO_ID or /embed/VIDEO_ID or /shorts/VIDEO_ID
                    videoId = urlObj.searchParams.get('v')
                        || urlObj.pathname.split('/').filter(Boolean).pop();
                }
            } catch (e) {
                // Fallback for malformed URLs
                videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()?.split('?')[0];
            }
            console.log('Extracted Video ID:', videoId, 'from URL:', url);
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

exports.getSourceById = async (req, res) => {
    try {
        const source = await StudySource.findById(req.params.sourceId);
        if (!source) return res.status(404).json({ message: 'Source not found' });
        res.json(source);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
