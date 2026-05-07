// const axios = require("axios");

// // @desc Generate real AI trip plan
// // @route POST /api/ai/generate
// // @access Private
// exports.generateTripPlan = async (req, res) => {
//   try {
//     const { destination, days } = req.body;

//     if (!destination || !days) {
//       return res.status(400).json({ message: "Please provide destination and days" });
//     }

//     // Strong prompt for structured output
//     const prompt = `
//     Create a ${days}-day travel plan for ${destination}.

//     Return ONLY JSON in this exact format:
//     {
//       "itinerary": [{ "day": 1, "plan": "" }],
//       "hotels": [],
//       "food": [],
//       "transport": [],
//       "tips": [],
//       "estimatedBudget": ""
//     }

//     Make it realistic and useful.
//     No explanation outside JSON.
//     `;

//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "meta-llama/llama-3-8b-instruct",
//         messages: [
//           { role: "user", content: prompt }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     let aiText = response.data.choices[0].message.content;

//     // Remove markdown if present
//     aiText = aiText.replace(/```json|```/g, "").trim();

//     let parsed;
//     try {
//       // Extract only JSON part safely
//       const jsonMatch = aiText.match(/\{[\s\S]*\}/);

//       if (!jsonMatch) {
//         return res.json({ raw: aiText });
//       }

//       parsed = JSON.parse(jsonMatch[0]);
//     } catch (err) {
//       return res.json({ raw: aiText }); // fallback
//     }

//         // Clean only plan text (NOT whole JSON)
//         parsed.itinerary = parsed.itinerary.map(day => ({
//           ...day,
//           plan: day.plan.replace(/\n+/g, " ").trim()
//         }));

//     res.json(parsed);

//   } catch (error) {
//     console.log(error.response?.data || error.message);
//     res.status(500).json({ message: "AI failed" });
//   }
// };

// const axios = require("axios");

// // @desc Generate real AI trip plan
// // @route POST /api/ai/generate
// // @access Private
// exports.generateTripPlan = async (req, res) => {
//   try {
//     const { destination, days } = req.body;

//     if (!destination || !days) {
//       return res.status(400).json({ message: "Please provide destination and days" });
//     }

//     // 🔥 Strong prompt (VERY IMPORTANT)
//     const prompt = `
// Create a ${days}-day travel plan for ${destination}.

// Return ONLY JSON in this exact format:
// {
//   "itinerary": [{ "day": 1, "plan": "string only" }],
//   "hotels": [],
//   "food": [],
//   "transport": [],
//   "tips": [],
//   "estimatedBudget": ""
// }

// IMPORTANT:
// - "plan" must ALWAYS be a STRING
// - Do NOT return objects inside "plan"
// - No explanation outside JSON

// Make it realistic and useful.
// `;

//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "meta-llama/llama-3-8b-instruct",
//         messages: [
//           { role: "user", content: prompt }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     let aiText = response.data.choices[0].message.content;

//     // ✅ Remove markdown (```json)
//     aiText = aiText.replace(/```json|```/g, "").trim();

//     let parsed;

//     try {
//       // ✅ Extract JSON safely
//       const jsonMatch = aiText.match(/\{[\s\S]*\}/);

//       if (!jsonMatch) {
//         return res.json({ raw: aiText });
//       }

//       parsed = JSON.parse(jsonMatch[0]);

//     } catch (err) {
//       return res.json({ raw: aiText }); // fallback
//     }

//     // ✅ CLEAN PLAN (handles string + object safely)
//     if (parsed.itinerary && Array.isArray(parsed.itinerary)) {
//       parsed.itinerary = parsed.itinerary.map(day => {
//         let cleanPlan = "";

//         if (typeof day.plan === "string") {
//           cleanPlan = day.plan.replace(/\n+/g, " ").trim();
//         } else if (typeof day.plan === "object") {
//           cleanPlan = Object.values(day.plan).join(" ").replace(/\n+/g, " ").trim();
//         }

//         return {
//           ...day,
//           plan: cleanPlan
//         };
//       });
//     }

//     // ✅ Final clean response
//     res.json(parsed);

//   } catch (error) {
//     console.log(error.response?.data || error.message);
//     res.status(500).json({ message: "AI failed" });
//   }
// };



const axios = require("axios");

// @desc Generate real AI trip plan
// @route POST /api/ai/generate
// @access Private
exports.generateTripPlan = async (req, res) => {
  try {
    const { destination, days, budget, people, type } = req.body;

    // Validate input
    if (!destination || !days || !budget || !people || !type) {
      return res.status(400).json({
        message: "Please provide destination, days, budget, people, and type",
      });
    }

    // 🔥 STRONG PROMPT (FIXED)
    const prompt = `
Create a detailed ${days}-day travel plan.

Details:
- Destination: ${destination}
- Budget: ₹${budget}
- Travelers: ${people}
- Trip Type: ${type}

IMPORTANT RULES:
- Stay STRICTLY within the given budget ₹${budget}
- Budget must be realistic and NOT exceed
- Suggest based on travelers:
  * Solo → budget friendly
  * Family → comfortable & safe
  * Friends → fun & nightlife
- If India → use INR
- If International → convert properly
- Always include costs for hotels, food, transport in the budget
- ALWAYS generate valid clickable links
- Use Google Maps search format:
  https://www.google.com/maps/search/?api=1&query=PLACE_NAME
Return ONLY JSON in this exact format:

{
  "itinerary": [
    { "day": 1, "plan": "string" }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Location",
      "price": "₹ per night",
      "rating": "4.2",
      "link": "https://www.google.com/maps/search/?api=1&query=Hotel+Name+City"
    }
  ],
  "food": [
    {
      "name": "Restaurant Name",
      "address": "Location",
      "cost": "₹ approx cost"
      "link": "https://www.google.com/maps/search/?api=1&query=Restaurant+Name+City"
    }
  ],
  "transport": [
    {
      "type": "Bus/Taxi/Bike",
      "details": "info",
      "cost": "₹ approx cost"
      "link": "https://www.google.com/search?q=Taxi+in+City"
    }
  ],
  "tips": [
    "tip 1",
    "tip 2"
  ],
  "estimatedBudget": "Total cost breakdown within ₹${budget}"
}

IMPORTANT:
- DO NOT return empty arrays
- MUST include at least 2 hotels, 2 food places, 2 transport options
- Keep everything practical and realistic
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let aiText = response.data.choices[0].message.content;

    // ✅ Remove markdown ```json
    aiText = aiText.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      // ✅ Extract JSON safely
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        return res.json({ raw: aiText });
      }

      parsed = JSON.parse(jsonMatch[0]);
    } catch (err) {
      return res.json({ raw: aiText }); // fallback
    }

    // ✅ CLEAN itinerary plan
    if (parsed.itinerary && Array.isArray(parsed.itinerary)) {
      parsed.itinerary = parsed.itinerary.map((day) => {
        let cleanPlan = "";

        if (typeof day.plan === "string") {
          cleanPlan = day.plan.replace(/\n+/g, " ").trim();
        } else if (typeof day.plan === "object") {
          cleanPlan = Object.values(day.plan).join(" ").replace(/\n+/g, " ").trim();
        }

        return {
          ...day,
          plan: cleanPlan,
        };
      });
    }

    // ✅ Final clean response
    res.json(parsed);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "AI failed" });
  }
};

