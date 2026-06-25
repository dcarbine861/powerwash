// controllers/aiController.js
// Business logic for the AI booking assistant

const SERVICES = ["House Exterior", "Driveway", "Deck/Patio", "Full Property Package"];

// POST /api/ai/suggest
const suggestService = async (req, res) => {
  const { situation } = req.body;

  if (!situation || situation.trim().length < 5) {
    return res.status(400).json({ success: false, message: "Please describe your situation." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: `You are a helpful booking assistant for ProWash, a professional power washing company.
Your job is to read the customer's situation and recommend the single best service for them.

Available services:
- House Exterior: full exterior house wash, removes mold/mildew/dirt. From $199.
- Driveway: removes oil stains, tire marks, embedded dirt from concrete/asphalt. From $99.
- Deck/Patio: gentle cleaning for wood, composite, stone surfaces. From $129.
- Full Property Package: house exterior + driveway + deck + walkways all in one visit. From $349.

Respond ONLY with a valid JSON object in this exact format (no markdown, no extra text):
{
  "service": "<exact service name from the list above>",
  "reason": "<1-2 friendly sentences explaining why this service fits their situation>",
  "tips": "<1 short practical tip to help them prepare for the visit>"
}`,
        messages: [{ role: "user", content: `My situation: ${situation}` }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude API error:", data);
      return res.status(500).json({ success: false, message: "AI service unavailable." });
    }

    const text = data.content[0].text.trim();
    const parsed = JSON.parse(text);

    if (!SERVICES.includes(parsed.service)) {
      return res.status(500).json({ success: false, message: "AI returned an unexpected service." });
    }

    res.json({ success: true, ...parsed });
  } catch (err) {
    console.error("AI controller error:", err.message);
    res.status(500).json({ success: false, message: "Something went wrong with the AI assistant." });
  }
};

module.exports = { suggestService };
