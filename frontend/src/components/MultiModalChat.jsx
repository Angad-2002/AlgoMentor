import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Importing Textarea
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

function MultiModalChat() {
  const [imageQuery, setImageQuery] = useState("");
  const [videoQuery, setVideoQuery] = useState("");
  const [imageResponse, setImageResponse] = useState("");
  const [videoResponse, setVideoResponse] = useState("");
  const [audioResponse, setAudioResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("image"); // Track active tab
  const fileInputRef = useRef(null);

  const prefixUrl = `${import.meta.env.VITE_BACKEND_ML_URL}`;

  const handleSubmit = async (type) => {
    setIsLoading(true);
    if (type === "image") setImageResponse("");
    if (type === "video") setVideoResponse("");
    if (type === "voice") setAudioResponse("");
    setAudioUrl("");

    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Please select a file");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append(type, file);
    formData.append("query_text", type === "image" ? imageQuery : videoQuery);

    const uri = `${prefixUrl}/${type}-query`;
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      console.log(`Sending request to ${uri}`);
      const { data } = await axios.post(uri, formData, config);
      console.log("Response received:", data);
      if (type === "image") setImageResponse(data.text_response);
      if (type === "video") setVideoResponse(data.text_response);
      if (type === "voice") setAudioResponse(data.text_response);

      // Fetch the audio file
      const audioResponse = await axios.get(`${prefixUrl}/download-audio`, {
        responseType: "blob",
      });
      const responseAudioBlob = new Blob([audioResponse.data], {
        type: "audio/mp3",
      });
      setAudioUrl(URL.createObjectURL(responseAudioBlob));
    } catch (error) {
      console.error("Error:", error);
      if (type === "image") setImageResponse("An error occurred. Please try again.");
      if (type === "video") setVideoResponse("An error occurred. Please try again.");
      if (type === "voice") setAudioResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Multi-Modal Chat</CardTitle>
          <CardDescription>Interact using image or video</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="image" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="voice">Voice</TabsTrigger>
            </TabsList>

            {/* Image Upload and Query */}
            <TabsContent value="image">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <Input id="image-upload" type="file" accept="image/*" ref={fileInputRef} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-query">Your Image Query</Label>
                  <Textarea
                    id="image-query"
                    placeholder="Enter your query about the image"
                    value={imageQuery}
                    onChange={(e) => setImageQuery(e.target.value)}
                    rows={1}
                    style={{ resize: "none", overflow: "hidden" }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                </div>
                <Button onClick={() => handleSubmit("image")} disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Submit Image Query
                </Button>
              </div>
              {activeTab === "image" && imageResponse && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold">Response:</h3>
                  <p className="text-sm">{imageResponse}</p>
                  {audioUrl && (
                    <audio controls src={audioUrl} className="w-full">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Video Upload and Query */}
            <TabsContent value="video">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-upload">Upload Video</Label>
                  <Input id="video-upload" type="file" accept="video/*" ref={fileInputRef} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-query">Your Video Query</Label>
                  <Textarea
                    id="video-query"
                    placeholder="Enter your query about the video"
                    value={videoQuery}
                    onChange={(e) => setVideoQuery(e.target.value)}
                    rows={1}
                    style={{ resize: "none", overflow: "hidden" }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                </div>
                <Button onClick={() => handleSubmit("video")} disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Submit Video Query
                </Button>
              </div>
              {activeTab === "video" && videoResponse && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold">Response:</h3>
                  <p className="text-sm">{videoResponse}</p>
                </div>
              )}
            </TabsContent>

            {/* Voice Tab Placeholder */}
            <TabsContent value="voice">
              <div className="space-y-4 text-center">
                <p className="text-lg font-semibold">Feature Coming Soon!</p>
                <p>Voice chat functionality will be available in a future update.</p>
              </div>
              {activeTab === "voice" && audioResponse && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold">Response:</h3>
                  <p className="text-sm">{audioResponse}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default MultiModalChat;
