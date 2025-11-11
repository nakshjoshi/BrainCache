
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function QuizForm({ onQuizFetched }) {
  const [form, setForm] = useState({
    topic: "",
    difficulty: "easy",
    numQuestions: 3,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/generate-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
    if (data.quiz) {
      onQuizFetched({
        quiz: data.quiz,
        topic: form.topic,
        difficulty: form.difficulty,
        numQuestions: form.numQuestions,
      });
      toast.success("Quiz generated!");
    } else {
      toast.error("Failed to generate quiz.");
    }
  } catch (err) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-4 relative overflow-hidden">
      {/* Decorative Blobs */}

      <Card className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-0 w-full max-w-sm shadow-xl text-white border border-white/10 flex flex-col items-center overflow-visible mt-10 mb-6">
        {/* Decorative Rocket Icon */}
        <div className="w-full flex flex-col items-center justify-center pt-6 pb-2">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2 animate-bounce"><circle cx="24" cy="24" r="24" fill="url(#a)"/><path d="M24 13c-4.418 0-8 3.134-8 7v2c0 1.657 1.343 3 3 3h10c1.657 0 3-1.343 3-3v-2c0-3.866-3.582-7-8-7Zm0 2c3.314 0 6 2.239 6 5v2c0 .552-.448 1-1 1H19c-.552 0-1-.448-1-1v-2c0-2.761 2.686-5 6-5Zm-5 13a1 1 0 0 0-1 1v2c0 2.21 3.134 4 7 4s7-1.79 7-4v-2a1 1 0 0 0-1-1H19Zm1 2h8v1c0 .552-.448 1-1 1h-6c-.552 0-1-.448-1-1v-1Z" fill="#fff"/>
            <defs><linearGradient id="a" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#6366F1"/><stop offset="1" stopColor="#EC4899"/></linearGradient></defs></svg>
          <h2 className="text-3xl font-extrabold leading-tight mb-1 tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg text-center">Create Your Coding Quiz</h2>
          <p className="text-indigo-100 text-sm text-center mb-2">Choose your topic, difficulty, and number of questions!</p>
        </div>
        <CardContent className="w-full px-8 py-8 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-xs mx-auto">
            <div>
              <Label htmlFor="topic" className="block text-sm font-semibold text-indigo-200 mb-1">Topic</Label>
              <Input
                id="topic"
                name="topic"
                placeholder="e.g., Arrays, Recursion"
                className="rounded-xl bg-white/20 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/30 transition text-base h-9 px-3"
                value={form.topic}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="difficulty" className="block text-sm font-semibold text-indigo-200 mb-1">Difficulty</Label>
              <Select
                name="difficulty"
                value={form.difficulty}
                onValueChange={(value) => setForm({ ...form, difficulty: value })}
              >
                <SelectTrigger className="rounded-xl bg-white/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/30 transition text-base h-9 px-3">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numQuestions" className="block text-sm font-semibold text-indigo-200 mb-1">Number of Questions</Label>
              <Input
                id="numQuestions"
                name="numQuestions"
                type="number"
                className="rounded-xl bg-white/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/30 transition text-base h-9 px-3"
                value={form.numQuestions}
                onChange={handleChange}
                min={1}
                max={10}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 py-2 rounded-full text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 mt-1"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Quiz"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Subtle animated stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <circle cx="10%" cy="20%" r="2" fill="#fff" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="80%" cy="30%" r="1.5" fill="#fff" opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="60%" cy="80%" r="2" fill="#fff" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="30%" cy="60%" r="1" fill="#fff" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  );
}

 