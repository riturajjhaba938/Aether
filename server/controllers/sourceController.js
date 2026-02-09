const StudySource = require('../models/StudySource');
const { YoutubeTranscript } = require('youtube-transcript');
const pdf = require('pdf-parse');

const { generateStudyMaterial } = require('./aiController');

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
            // PDF logic would require file upload handling (multer)
            // For now, assume content is sent or handle separately
            content = req.body.content || 'PDF Content Parsing Placeholder';
        }

        // Generate AI Study Material
        const aiData = await generateStudyMaterial(content);

        const source = await StudySource.create({
            userId,
            title,
            type,
            url,
            content,
            summary: aiData.summary,
            milestones: aiData.milestones,
            quiz: aiData.quiz
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
