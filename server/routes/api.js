const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Initialize OpenAI using Gemini's OpenAI-compatible endpoint
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
});

router.post('/predict', async (req, res) => {
  const { name, dob, time, place } = req.body;
  try {
    const prompt = `Act as an expert Vedic astrologer. I have the following birth details:
Name: ${name}
Date of Birth: ${dob}
Time of Birth: ${time}
Place of Birth: ${place}

Please provide:
1. The person's Rashi (Moon Sign)
2. The person's Nakshatra
3. A detailed astrological prediction broken into Career, Health, and Love segments. 
For each segment, provide an array of 3-4 distinct bullet points. 
Wrap the most important keywords or phrases in each bullet point with <b> tags for highlighting.

Return the result strictly as a raw JSON object (no markdown) exactly matching this structure:
{
  "rashi": "...",
  "nakshatra": "...",
  "career": ["...", "point 2 with <b>highlight</b>..."],
  "health": ["...", "..."],
  "love": ["...", "..."]
}`;

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }]
    });

    const content = completion.choices[0].message.content;
    const data = JSON.parse(content.replace(/```json|```/g, '').trim());

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ success: false, error: 'Failed to generate prediction' });
  }
});

router.post('/palm-reading', upload.array('hands', 2), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No images uploaded' });
    }

    const imageParts = req.files.map(file => {
      const base64Image = fs.readFileSync(file.path).toString('base64');
      return {
        type: "image_url",
        image_url: {
          url: `data:${file.mimetype};base64,${base64Image}`,
        },
      };
    });
    
    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Act as an expert palm reader. Analyze these images of the left and right hands. First, explain what each hand traditionally represents in palmistry. Then, detail the specific line patterns found on each hand using an array of 3-4 bullet points. Wrap the most important keywords in <b> tags for highlighting. Return strictly as a raw JSON object (no markdown) exactly matching this structure: {\"leftHand\": {\"represents\": \"...\", \"details\": [\"...\", \"...\"]}, \"rightHand\": {\"represents\": \"...\", \"details\": [\"...\", \"...\"]}}" },
            ...imageParts
          ],
        },
      ],
    });

    req.files.forEach(f => {
      try { fs.unlinkSync(f.path) } catch (e) {}
    });

    const content = response.choices[0].message.content;
    const data = JSON.parse(content.replace(/```json|```/g, '').trim());

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    res.status(500).json({ success: false, error: 'Failed to read palm image' });
  }
});

router.post('/kundli', async (req, res) => {
  const { name, dob, time, place } = req.body;
  try {
    const prompt = `Act as an expert Vedic astrologer. Create a realistic 12-house Kundli dataset for a person born on ${dob} at ${time} in ${place}.

Return the result strictly as a raw JSON object (no markdown) exactly matching this structure:
{
  "lagna": "...",
  "houses": [
    { "house": 1, "sign": "...", "planets": ["...", "..."] },
    ... up to house 12
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }]
    });

    const content = completion.choices[0].message.content;
    const data = JSON.parse(content.replace(/```json|```/g, '').trim());

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ success: false, error: 'Failed to generate Kundli' });
  }
});

module.exports = router;
