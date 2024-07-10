import { getHealthAI } from "../Services/aiService.js";

const healthChatController = async (req, res) => {
  try {
    let context = [
      {
        role: 'system',
        content: 'You are a health assistant and help users with their health records, medications, and physical records.'
      }
    ];

    const userMessage = req.body.message;
    context.push({
      role: 'user',
      content: userMessage
    });

    let aiResponse = await getHealthAI(context);
    context.push(aiResponse);

    // Keep interacting until a final answer is provided
    while (true) {
      const userNextMessage = req.body.message;
      context.push({
        role: 'user',
        content: userNextMessage
      });

      aiResponse = await getHealthAI(context);
      context.push(aiResponse);

      if (aiResponse.finish_reason !== 'tool_calls') {
        break;
      }
    }

    res.json({ response: aiResponse.content });
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred during the chat interaction.' });
  }
};

export {
  healthChatController
};
