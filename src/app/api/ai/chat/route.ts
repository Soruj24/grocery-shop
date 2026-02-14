import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAIContext } from "@/lib/ai/context";
import ollama from "ollama";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string })?.role || "customer";
    const { message } = await req.json();

    const context = await getAIContext(role as "customer" | "admin");

    const systemPrompt = `
      You are an AI Assistant for "Mohammad Emran Hossain Grocery Shop" located in Janer Mor, Nagurpur, Tangail.
      Your goal is to help customers with their grocery shopping, product information, and orders.
      
      Shop Context:
      ${context}
      
      Instructions:
      1. Respond in Bengali (বাংলা) as the primary language.
      2. Be polite, helpful, and professional.
      3. Use the provided context to answer questions about products, prices, and delivery.
      4. If a product is not in the list, politely say it's currently unavailable.
      5. For order-related queries, explain that they need to add items to cart and proceed to checkout.
      6. Keep responses concise and relevant to the grocery shop.
      7. Mention that the shop is located at Janer Mor, Nagurpur, Tangail if asked about location.
    `;

    try {
      const response = await ollama.chat({
        model: "llama3.2",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
      });

      return NextResponse.json({ response: response.message.content });
    } catch (ollamaError: unknown) {
      console.error("Ollama error, falling back to simple logic:", ollamaError);
      
      // Fallback logic if Ollama is not running or model not found
      let aiResponse = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("আজ কি কি আছে") || lowerMessage.includes("প্রোডাক্ট") || lowerMessage.includes("পণ্য")) {
        const productLines = context.split("Products Available:")[1]?.split("\n").filter(l => l.trim()).slice(0, 5) || [];
        const products = productLines.map(l => l.split("-")[0].trim()).join(", ");
        aiResponse = `আমাদের কাছে বর্তমানে ${products} সহ আরও অনেক টাটকা পণ্য আছে। (Ollama Fallback)`;
      } else {
        aiResponse = `দুঃখিত, বর্তমানে আমাদের স্মার্ট এআই সার্ভারটি অফলাইনে আছে। আমি আপনাকে সাধারণ তথ্য দিয়ে সাহায্য করতে পারি। আপনি কি পণ্য সম্পর্কে জানতে চান?`;
      }
      
      return NextResponse.json({ response: aiResponse });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
