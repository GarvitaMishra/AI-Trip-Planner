const axios = require("axios");

// @desc Generate AI Trip Plan
// @route POST /api/ai/generate
// @access Private

exports.generateTripPlan = async (req, res) => {
  try {
    const { destination, days, budget, people, type } = req.body;

    // VALIDATION

    if (!destination || !days || !budget || !people || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // BULLETPROOF PROMPT

    const prompt = `
You are an expert AI Travel Planner. Generate a highly detailed and realistic travel itinerary strictly based on the following inputs:

- Destination: ${destination}
- Duration: ${days} days
- Budget: ₹${budget}
- Travelers: ${people}
- Trip Type: ${type}

IMPORTANT RULES:
- Respond ONLY with a valid JSON object. 
- Do not include any markdown formatting (do not use \`\`\`json). 
- Do not include any conversational text, introductions, or explanations.
- Make the data realistic and specific to the requested destination (${destination}).
- Ensure all JSON keys match exactly as provided below.

JSON FORMAT:
{
  "destination": "${destination}",
  "days": ${days},
  "budget": "${budget}",
  "people": "${people}",
  "type": "${type}",
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival and Exploration",
      "plan": "Detailed activities customized for ${destination}"
    }
  ],
  "hotels": [
    {
      "name": "Realistic Hotel Name in ${destination}",
      "address": "Realistic Address",
      "price": "₹3000/night",
      "rating": "4.5",
      "link": "https://maps.google.com/?q=Hotel+Name"
    }
  ],
  "food": [
    {
      "name": "Realistic Restaurant Name in ${destination}",
      "address": "Realistic Address",
      "cost": "₹800 approx",
      "famousFor": "Local specialty",
      "link": "https://maps.google.com/?q=Restaurant+Name"
    }
  ],
  "transport": [
    {
      "type": "Taxi or Metro",
      "details": "Details on commuting in ${destination}",
      "cost": "₹1500"
    }
  ],
  "tips": [
    "Specific travel tip for ${destination} 1",
    "Specific travel tip for ${destination} 2"
  ],
  "estimatedBudget": {
    "hotel": "₹...",
    "food": "₹...",
    "transport": "₹...",
    "activities": "₹...",
    "total": "₹..."
  }
}
`;

    // API CALL

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // Using a highly reliable, free Google Gemini model through OpenRouter
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4, // Lower temperature forces adherence to JSON logic
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // RAW AI RESPONSE

    let aiText = response.data.choices[0].message.content;

    console.log("RAW AI RESPONSE:", aiText);

    // CLEAN RESPONSE (Strip accidental markdown backticks just in case)

    aiText = aiText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // FIND JSON

    const start = aiText.indexOf("{");
    const end = aiText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response format - No JSON object found.",
      });
    }

    const jsonString = aiText.substring(start, end + 1);

    let parsedData;

    try {
      parsedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.log("JSON PARSE ERROR:", parseError.message);

      return res.status(500).json({
        success: false,
        message: "AI returned broken JSON format",
      });
    }

    // FALLBACK SAFETY

    parsedData.destination = parsedData.destination || destination;
    parsedData.itinerary = Array.isArray(parsedData.itinerary) ? parsedData.itinerary : [];
    parsedData.hotels = Array.isArray(parsedData.hotels) ? parsedData.hotels : [];
    parsedData.food = Array.isArray(parsedData.food) ? parsedData.food : [];
    parsedData.transport = Array.isArray(parsedData.transport) ? parsedData.transport : [];
    parsedData.tips = Array.isArray(parsedData.tips) ? parsedData.tips : [];

    // CLEAN ITINERARY

    parsedData.itinerary = parsedData.itinerary.map((item, index) => ({
      day: item.day || index + 1,
      title: item.title || `Day ${index + 1}`,
      plan: typeof item.plan === "string" ? item.plan.replace(/\n/g, " ").trim() : "No plan available",
    }));

    // FINAL RESPONSE

    return res.status(200).json({
      success: true,
      trip: parsedData,
    });
  } catch (error) {
    console.log(
      "AI GENERATION ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Trip generation failed. Ensure your OpenRouter API Key is valid.",
    });
  }
};
