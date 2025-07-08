const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_api_key);
const axios = require('axios');
const formatWeatherData = require('./formatWeatherAttributes');

exports.generateResponse = async (req, res) => {
    const { prompt } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const newPrompt = `${prompt}
Please provide the answer in both English`;

        const result = await model.generateContent(newPrompt);
        const response = await result.response;
        const text = response.text();
        console.log('✅ Text generated');
        res.send(text);
    } catch (error) {
        console.error(error);
        res.status(500).send("Couldn't fulfill your request at this time.");
    }
};

exports.weatherResponse = async (req, res) => {
    const { seedName, date, location, type } = req.body;

    if (!seedName || !date) {
        return res.status(400).send('Seed name and date are required.');
    }

    try {
        const forecast = await axios.get('http://localhost:3500/weather-forecast', {
            params: { cityName: location }
        });

        const formattedResponse = formatWeatherData(forecast.data);

        const prompt = `These are the weather forecast details for ${location}:\n${formattedResponse}

I have planted ${seedName} on ${date} in ${type} soil.

Please answer the following:
1. What should be the frequency of irrigation?
2. Do I need to add fertilizers? Which ones? Provide Indian manufacturers with price and quantity.
3. What are the major pest threats? Which pesticides to use? Provide Indian manufacturers with price and quantity.`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/(?<=Hindi:)/, '\n\n');


        console.log('✅ Weather response generated');
        res.send(text);
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).send("Couldn't fulfill your request at this time.");
    }
};

exports.getSoilType = async (req, res) => {
    const { location } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `What is the type of soil found in the following location?
City: ${location}
Country: India
Respond with a single word soil type (like Black, Alluvial, Red, etc.) in English only.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.send(text.trim());
    } catch (error) {
        console.error(error);
        res.status(500).send("Couldn't fulfill your request at this time.");
    }
};
