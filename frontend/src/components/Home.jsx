import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

function Home() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      navigate(`/resources?topic=${encodeURIComponent(topic)}`);
    }
  };

  return (
    <>
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center text-center pt-10">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-2">AlgoMentor</h2>
        <div className="text-3xl font-semibold text-gray-700">
          <Typewriter
            options={{
              strings: [
                "Master Sorting Algorithms",
                "Improve Your Coding Skills",
                "Learn Interactively",
                "Enhance Your Problem-Solving",
              ],
              autoStart: true,
              loop: true,
              delay: 80,
              deleteSpeed: 50,
            }}
          />
        </div>
        <p className="text-lg text-gray-600 mt-3 mb-6 max-w-2xl">
          Discover the power of innovative education in Computer Science and beyond.
        </p>
        <div className="space-x-4">
          <Link to="/code-editor">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-600 transition">
              Try Our Code Editor
            </button>
          </Link>
          <Link to="/algorithms">
            <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-200 transition">
              Explore Algorithms
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section - Two-Column Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto my-16">
        <Link to="/visualizer/bubble-sort" className="w-full">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 p-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span>🚀</span> Interactive Lessons
              </CardTitle>
              <CardDescription>Visualize the sorting process</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Visualize the sorting process and understand the mechanics behind each algorithm.</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/chat" className="w-full">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 p-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span>🤖</span> AI Assistant
              </CardTitle>
              <CardDescription>Ask questions and get AI-powered answers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Get help with your coding questions and interact with our AlgoMentor AI Assistant.</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/mcq-generator" className="w-full">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 p-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span>📊</span> Self-Evaluation
              </CardTitle>
              <CardDescription>Generate custom multiple-choice questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create personalized multiple-choice questions to test your knowledge.</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/multimodal-chat" className="w-full">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 p-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span>💬</span> Multimodal Learning
              </CardTitle>
              <CardDescription>Chat using text, images, audio, and video</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Experience seamless communication through various modalities like text, images, and video.</p>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Resources Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Want to learn something new?</h2>
          <p className="text-gray-600 mb-6">Enter a topic and find the best learning resources.</p>
          
          <form onSubmit={handleTopicSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Input
              type="text"
              placeholder="Enter a topic you want to learn"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
              Search Resources
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Home;
