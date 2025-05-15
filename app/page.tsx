'use client';
import { useState } from "react";

type Message = { role: "user" | "assistant", content: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const updated: Message[] = [...messages, { role: "user", content: input }];
    setMessages(updated);
    setInput('');
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: updated }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMessages([...updated, data.result]);
    setLoading(false);
  }

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">🥣 PrepPal</h1>

      <div className="space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.role === "user" ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            <strong>{m.role === "user" ? "You" : "PrepPal"}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a cookie recipe, a meal plan, or substitutions..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </main>
  );
}
