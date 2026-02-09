import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import StepViewer from '../components/StepViewer';
import CameraModal from '../components/CameraModal';
import { projects } from '../data/projects';

const SessionPage = ({ projectId, onExit }) => {
    const project = projects[projectId];
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: `Welcome to the ${project.title} project! I'm your AI mentor. Let's get started with the first step.` }
    ]);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Mock Mode: Logic to simulate AI feedback
    const handleCapture = async (imageSrc) => {
        setIsAnalyzing(true);

        // Simulate network delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setIsCameraOpen(false);

            // MOCK LOGIC: Randomly succeed or fail distinctively for demo
            // In real app, this would be the Gemini response
            const mockSuccess = Math.random() > 0.3; // 70% success rate for demo

            if (mockSuccess) {
                setMessages(prev => [...prev, {
                    sender: 'ai',
                    text: "Excellent soldering! The joint looks shiny and covers the pad effectively. You're ready for the next step."
                }]);
                // Auto-advance if not last step
                if (currentStepIndex < project.steps.length - 1) {
                    setTimeout(() => setCurrentStepIndex(prev => prev + 1), 1500);
                }
            } else {
                setMessages(prev => [...prev, {
                    sender: 'ai',
                    text: "It looks like a 'cold joint'. The solder looks dull and hasn't flowed well. Try reheating the joint and adding a tiny bit more solder."
                }]);
            }
        }, 2000);
    };

    const handleSendMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'user', text }]);
        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'ai', text: "I'm in Mock Mode right now, but I'd normally answer your question about: " + text }]);
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
