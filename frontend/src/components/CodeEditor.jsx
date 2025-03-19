import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import axios from 'axios';

const languages = [
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

function CodeEditor() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('python');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setCode(value === 'python' ? '' : '// Write your code here\n');
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    try {
      const uri = `${import.meta.env.VITE_API_URL}/api/code/run`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(uri, { code, language, input }, config);
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Code Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={handleLanguageChange} defaultValue={language}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Editor
          height="300px"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
        <div className="mt-4">
          <h3 className="font-bold">Custom Input:</h3>
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Enter custom input..."
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={handleRunCode} disabled={isLoading} className="mt-4">
          {isLoading ? 'Running...' : 'Run Code'}
        </Button>
        <div className="mt-4">
          <h3 className="font-bold">Output:</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2 whitespace-pre-wrap">
            {output || 'No output yet'}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

export default CodeEditor;
