import React, { useState } from "react";
import ReactFlow, { Background } from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // updated

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // API call
  const runFlow = async () => {
    if (!input) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/api/ask-ai`, {
        prompt: input,
      });

      setOutput(res.data.result);
    } catch (error) {
      console.error(error);
      setOutput("Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  // Save
  const saveData = async () => {
    if (!input || !output) return;

    try {
      await axios.post(`${API_BASE_URL}/api/save`, {
        prompt: input,
        response: output,
      });

      alert("Saved Response");
      setInput("");
      setOutput("");
    } catch (error) {
      console.error(error);
      alert("Error saving");
    }
  };

  //Clear
  const clearData = () => {
    setInput("");
    setOutput("");
  };

  // Nodes
  const nodes: Node[] = [
    {
      id: "1",
      position: { x: 100, y: 150 },
      data: {
        label: (
          <div className="bg-white p-4 rounded-xl shadow-md border w-64">
            <h2 className="font-semibold mb-2 text-gray-700">Input</h2>
            <textarea
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        ),
      },
    },
    {
      id: "2",
      position: { x: 450, y: 150 },
      data: {
        label: (
          <div className="bg-white p-4 rounded-xl shadow-md border w-64">
            <h2 className="font-semibold mb-2 text-gray-700">Result</h2>
            <div className="text-sm whitespace-pre-wrap">
              {loading
                ? "⏳ Generating response..."
                : output || "AI response will appear here"}
            </div>
          </div>
        ),
      },
    },
  ];

  // Edges
  const edges: Edge[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ];

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      
      {/* Header */}
      <h1 className="text-xl font-bold px-4 pt-3">
        AI Flow Dashboard
      </h1>

      {/* Controls */}
      <div className="p-4 flex gap-3">
        <button
          onClick={runFlow}
          disabled={!input || loading}
          className={`px-4 py-2 rounded text-white ${
            input && !loading
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Run Flow
        </button>

        <button
          onClick={saveData}
          disabled={!input || !output}
          className={`px-4 py-2 rounded text-white ${
            input && output
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save
        </button>

        <button
          onClick={clearData}
          disabled={!input && !output}
          className={`px-4 py-2 rounded text-white ${
            input || output
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Clear
        </button>
      </div>

      {/* React Flow */}
      <div className="flex-1">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;