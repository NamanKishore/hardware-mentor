import React, { useState } from 'react';
import axios from 'axios';
import ChatSidebar from '../components/ChatSidebar';
import StepViewer from '../components/StepViewer';
import CameraModal from '../components/CameraModal';
import { projects } from '../data/projects';
import { playBase64Audio } from '../utils/audioUtils';

const SessionPage = ({ projectId, onExit }) => {
    const project = projects[projectId];
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: `Welcome to the ${project.title} project! I'm your AI mentor. Let's get started with the first step.` }
    ]);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Real Backend Integration
    const handleCapture = async (imageSrc, audioBlob) => {
        setIsAnalyzing(true);

        try {
            const formData = new FormData();

            // Convert base64 image to blob
            const fetchResponse = await fetch(imageSrc);
            const imageBlob = await fetchResponse.blob();
            formData.append("image", imageBlob, "step_capture.jpg");

            if (audioBlob) {
                formData.append("audio", audioBlob, "user_query.wav");
            }

            // Add Context
            const currentStep = project.steps[currentStepIndex];
            const context = `Project: ${project.title}. Step ${currentStepIndex + 1}: ${currentStep.title}. ${currentStep.description}`;
            formData.append("step_context", context);

            // Call Backend
            const response = await axios.post("http://localhost:8000/analyze", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const { status, feedback, audio } = response.data;

            if (status === "success" || status === "ok") {
                setMessages(prev => [...prev, {
                    sender: 'ai',
                    text: feedback || "Analysis received."
                }]);

                if (audio) {
                    playBase64Audio(audio);
                } else if (feedback) {
                    // Fallback to Browser TTS (since 1.5 Flash doesn't return audio)
                    const utterance = new SpeechSynthesisUtterance(feedback);
                    utterance.rate = 1.0;
                    utterance.pitch = 1.0;
                    window.speechSynthesis.speak(utterance);
                }

                // Heuristic to advance step if feedback seems positive
                if (feedback && (feedback.toLowerCase().includes("good") || feedback.toLowerCase().includes("great") || feedback.toLowerCase().includes("excellent"))) {
                    if (currentStepIndex < project.steps.length - 1) {
                        setTimeout(() => setCurrentStepIndex(prev => prev + 1), 3000);
                    }
                }
            } else {
                setMessages(prev => [...prev, {
                    sender: 'ai',
                    text: "I encountered an error analyzing that. Could you try again?"
                }]);
            }

        } catch (error) {
            console.error("Analysis Error:", error);
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: "Sorry, I couldn't connect to the Brain. Is the backend running?"
            }]);
        } finally {
            setIsAnalyzing(false);
            setIsCameraOpen(false);
        }
    };

    const handleSendMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'user', text }]);
        // Mock response for chat (vision is the main part)
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'ai', text: "I'm listening! For best results, use the 'Check My Work' button to show me what you're doing." }]);
        }, 1000);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-nordic-bg">
            <ChatSidebar
                messages={messages}
                onSendMessage={handleSendMessage}
            />

            <div className="flex-1 flex flex-col relative">
                <button
                    onClick={onExit}
                    className="absolute top-4 right-4 z-10 px-4 py-2 bg-nordic-card/50 hover:bg-nordic-error/20 text-nordic-muted hover:text-nordic-error rounded-lg text-sm transition-colors"
                >
                    Exit Session
                </button>

                <StepViewer
                    project={project}
                    stepIndex={currentStepIndex}
                    onNext={() => setCurrentStepIndex(prev => Math.min(prev + 1, project.steps.length - 1))}
                    onPrev={() => setCurrentStepIndex(prev => Math.max(prev - 1, 0))}
                    onCheckWork={() => setIsCameraOpen(true)}
                />
            </div>

            <CameraModal
                isOpen={isCameraOpen}
                onClose={() => setIsCameraOpen(false)}
                onCapture={handleCapture}
                isAnalyzing={isAnalyzing}
            />
        </div>
    );
};

export default SessionPage;
