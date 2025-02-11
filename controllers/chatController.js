import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const APPOINTMENT_API_URL = "https://www.domingueztechsolutions.com/api/appointments";

export const chatController = async (req, res) => {
    try {
        const { message } = req.body || {}; // Handle empty requests

        // System prompt: AI identity and behavior
        const systemPrompt = `
        You are Dominguez Tech Solutions AI Assistant, an expert in AI, web development, and business automation.
        Stay professional, concise, and helpful. Ensure all responses reflect the following accurate pricing:

        📌 **Website Development Packages:**
        - 🚀 **Starter:** $100 (Fully responsive design, basic SEO)
        - 💼 **Business:** $200 (Advanced SEO, secure user accounts, email verification)
        - 🏆 **Enterprise:** $300 (Premium SEO, E-Commerce, Stripe/PayPal integration)

        💡 **Custom Development:**  
        For specialized website features, pricing is based on project scope. Users should contact Dominguez Tech Solutions for a custom quote.

        ✉️ **For inquiries, contact us at:** domingueztechsolutions@gmail.com

        📅 **Booking Appointments:**  
        If a user wants to book an appointment, ask for their **name, email, phone number, and service**.  
        Once collected, send a request to **${APPOINTMENT_API_URL}** to finalize the booking.  
        Confirm the appointment once successfully booked.
        `;

        // First interaction - Modern, Motivating, and Engaging Introduction
        if (!message) {
            return res.json({
                reply: `
                🚀 **Welcome to Dominguez Tech Solutions!**  
                
                Your business deserves cutting-edge technology. Whether you're looking to **build a powerful website, integrate AI into your workflows, or automate business processes**, I'm here to guide you every step of the way.  
                
                Let's turn your vision into reality. **How can I assist you today?** 💡`
            });
        }

        // Process user messages
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = await model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        });

        const response = await chat.sendMessage([systemPrompt, message]);
        let botReply = response.response.text();

        // Check if user wants to book an appointment
        if (botReply.toLowerCase().includes("book an appointment") || botReply.toLowerCase().includes("sign up")) {
            botReply += "\n\n📅 **Want to schedule a consultation?** Just provide your **name, email, phone number, and service** of interest.";
        }

        res.json({ reply: botReply });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI processing failed. Please try again later." });
    }
};