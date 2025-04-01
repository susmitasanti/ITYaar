import { useState } from "react";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust this path as per your project
import axios from "axios";
import { Link } from "react-router-dom";


export default function TaxAIChatbot() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi! I'm your ITYaar Assistant. Ask me anything about your taxes." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful tax assistant specialized in Indian and global taxation." },
            ...newMessages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      setMessages([...newMessages, { sender: "assistant", text: reply }]);
    } catch (error) {
      console.error("OpenAI API error:", error);
      setMessages([
        ...newMessages,
        { sender: "assistant", text: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
	<div className="p-12 m-12">
    <div className="relative">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-taxblue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-soft"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-taxgreen-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-soft"></div>

      <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-float max-w-xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-taxblue-500 p-2 rounded-lg text-white ai-glow">
            <BrainCircuit size={24} />
          </div>
          <h3 className="font-bold text-lg">ITYaar Assistant</h3>
            <Link to="/chat" target="_blank">
                <button className="text-sm font-medium text-taxblue-600 hover:underline ml-auto">
                    Open in New Page
                </button>
            </Link>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "assistant"
                  ? "bg-gray-100 rounded-tl-none"
                  : "bg-taxblue-50 rounded-tr-none ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center">
          <input
            type="text"
            placeholder="Ask me about your taxes..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-taxblue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <Button
            size="icon"
            className="ml-2 bg-taxblue-500"
            onClick={handleSend}
            disabled={loading}
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
	</div>
  );
}
