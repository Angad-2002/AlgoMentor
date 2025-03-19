import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from 'axios';

const ResourcesDisplay = () => {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const topic = searchParams.get('topic');
    if (topic) {
      fetchResources(topic);
    }
  }, [location]);

  const fetchResources = async (topic) => {
    try {
      setLoading(true);
      const prefixUrl = `${import.meta.env.VITE_BACKEND_ML_URL}`;
      const uri = `${prefixUrl}/resources`;
      const body = { query: topic };
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };

      const response = await axios.post(uri, body, config);
      console.log('Resources response:', response.data);

      setResources(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError(error.response?.data?.detail || error.message || 'Failed to fetch resources');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading resources...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!resources) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Resources for: {new URLSearchParams(location.search).get('topic')}</h2>
      <Tabs defaultValue="medium">
        <TabsList>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
          <TabsTrigger value="geeksforgeeks">GeeksforGeeks</TabsTrigger>
        </TabsList>

        {/* Medium Tab - Supports multiple results */}
        <TabsContent value="medium">
          {resources?.results?.medium?.length > 0 ? (
            resources.results.medium.map((item, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Read more on Medium
                  </a>
                  <p>{item.snippet}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No Medium results</p>
          )}
        </TabsContent>

        {/* YouTube Tab - Supports multiple results */}
        <TabsContent value="youtube">
          {resources?.results?.youtube?.length > 0 ? (
            resources.results.youtube.map((item, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${getYouTubeId(item.link)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No YouTube results</p>
          )}
        </TabsContent>

        {/* GeeksforGeeks Tab - Supports multiple results */}
        <TabsContent value="geeksforgeeks">
          {resources?.results?.geeksforgeeks?.length > 0 ? (
            resources.results.geeksforgeeks.map((item, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Read more on GeeksforGeeks
                  </a>
                  <p>{item.snippet}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No GeeksforGeeks results</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Optionally display a summary if available */}
      {resources?.summary && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{resources.summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper function to extract YouTube video ID from URL
function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default ResourcesDisplay;
