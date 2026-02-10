const StudySource = require('../models/StudySource');
const { YoutubeTranscript } = require('youtube-transcript');
const pdf = require('pdf-parse');
const MOCK_DATA = require('../data/mockAiData');

const { generateAetherContent } = require('./aiController');

// Extract YouTube video ID from various URL formats
const extractVideoId = (url) => {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
            return urlObj.searchParams.get('v')
                || urlObj.pathname.split('/').filter(Boolean).pop();
        }
    } catch (e) {
        // Fallback for malformed URLs
    }
    return url.split('v=')[1]?.split('&')[0] || url.split('/').pop()?.split('?')[0];
};

exports.addSource = async (req, res) => {
    try {
        const { title, type, url, userId } = req.body;
        let content = '';
        let videoId = null;

        if (type === 'video') {
            videoId = extractVideoId(url);
            console.log('Extracted Video ID:', videoId, 'from URL:', url);

            try {
                const transcript = await YoutubeTranscript.fetchTranscript(videoId);
                content = transcript.map(t => t.text).join(' ');
            } catch (err) {
                console.error("Transcript Error:", err.message);
                content = "Transcript unavailable. AI analysis will be limited.";
            }
        } else if (type === 'pdf') {
            content = req.body.content || 'PDF Content Placeholder';
        }

        // Try AI synthesis, fall back to mock data if available
        let aiAnalysis;

        // Check for mock data first (instant, no API needed)
        if (videoId && MOCK_DATA[videoId]) {
            console.log(`[Aether AI] Using pre-built data for video: ${videoId}`);
            aiAnalysis = MOCK_DATA[videoId];
        } else {
            // Try live API
            aiAnalysis = await generateAetherContent(content);

            // If API failed and returned error, check mock as backup
            if (aiAnalysis.summary === "AI Synthesis Failed. Please try again." && videoId && MOCK_DATA[videoId]) {
                console.log(`[Aether AI] API failed, falling back to mock data for: ${videoId}`);
                aiAnalysis = MOCK_DATA[videoId];
            }
        }

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
