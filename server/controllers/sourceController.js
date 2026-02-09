const StudySource = require('../models/StudySource');
const { YoutubeTranscript } = require('youtube-transcript');
const pdf = require('pdf-parse');

exports.addSource = async (req, res) => {
    try {
        const { title, type, url, userId } = req.body;
        let content = '';

        if (type === 'video') {
            // Extract YouTube Transcript
            const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
            const transcript = await YoutubeTranscript.fetchTranscript(videoId);
            content = transcript.map(t => t.text).join(' ');
        } else if (type === 'pdf') {
            // PDF logic would require file upload handling (multer)
            // For now, assume content is sent or handle separately
            content = req.body.content || 'PDF Content Parsing Placeholder';
        }

        const source = await StudySource.create({
            userId,
            title,
            type,
            url,
            content
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
