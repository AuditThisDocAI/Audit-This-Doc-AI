import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: http://process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return http://res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { invoiceData } = http://req.body;
   
    if (!invoiceData) {
      return http://res.status(400).json({ error: 'invoiceData is required' });
    }

    const completion = await http://openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert invoice auditor. Find errors, overcharges, and inconsistencies. Return results in clear bullet points."
        },
        {
          role: "user",
          content: `Audit this invoice and find errors: ${invoiceData}`
        }
      ],
    });

    http://res.status(200).json({ result: http://completion.choices.message.content });
   
  } catch (error) {
    http://console.error(error);
    http://res.status(500).json({ error: http://error.message });
  }
}
