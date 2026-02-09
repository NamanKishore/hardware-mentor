import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { X, Camera, RefreshCw, Mic } from 'lucide-react';
import useAudioRecorder from '../hooks/useAudioRecorder';

const CameraModal = ({ isOpen, onClose, onCapture, isAnalyzing }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const { startRecording, stopRecording, audioBlob } = useAudioRecorder();
    // We need to store the image temporarily while recording audio
    const [tempImage, setTempImage] = useState(null);

    const startCaptureSequence = async () => {
        setIsCapturing(true);

        // 1. Capture Image
        const imageSrc = webcamRef.current.getScreenshot();
        setTempImage(imageSrc);
        setImgSrc(imageSrc); // Show preview immediately

        // 2. Start Audio Recording (3 seconds)
        try {
            await startRecording();
            setCountdown(3);
        } catch (e) {
            console.error("Failed to start recording", e);
            setIsCapturing(false);
            return;
        }
    };

    // Handle Countdown and Stop Recording
    useEffect(() => {
        let timer;
        if (isCapturing && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (isCapturing && countdown === 0) {
            // Time's up
            stopRecording();
            setIsCapturing(false);
        }
        return () => clearTimeout(timer);
    }, [isCapturing, countdown, stopRecording]);

    // When audioBlob is ready (after stopRecording), trigger the parent callback
    useEffect(() => {
        if (audioBlob && tempImage && !isCapturing) {
            onCapture(tempImage, audioBlob);
            setTempImage(null); // Reset
            // audioBlob will be reset by hook on next start
        }
    }, [audioBlob, tempImage, isCapturing, onCapture]);

    const retake = () => {
        setImgSrc(null);
        setTempImage(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-nordic-card p-6 rounded-2xl max-w-2xl w-full mx-4 border border-nordic-muted/20 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-nordic-muted hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h3 className="text-xl font-bold text-white mb-4">
                    {isCapturing ? `Listening... ${countdown}s` : "Check Your Work"}
                </h3>

                <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6 border border-nordic-muted/10">
                    {imgSrc ? (
                        <img src={imgSrc} alt="Captured" className="w-full h-full object-contain" />
                    ) : (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-contain"
                        />
                    )}

                    {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                            <RefreshCw className="text-nordic-accent animate-spin mb-2" size={48} />
                            <p className="text-nordic-accent font-medium">Analyzing soldering quality...</p>
                        </div>
                    )}

                    {isCapturing && (
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                            <div className="bg-nordic-accent/20 p-6 rounded-full animate-pulse">
                                <Mic size={48} className="text-nordic-accent" />
                            </div>
                            <p className="text-white font-bold mt-4 text-lg">Tell me about your step... ({countdown})</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4">
                    {!imgSrc && !isCapturing ? (
                        <button
                            onClick={startCaptureSequence}
                            className="flex items-center px-6 py-3 bg-nordic-accent text-nordic-bg rounded-xl font-bold hover:opacity-90 transition-opacity"
                        >
                            <Camera className="mr-2" /> Capture & Ask (3s)
                        </button>
                    ) : (
                        !isCapturing && (
                            <>
                                <button
                                    onClick={retake}
                                    disabled={isAnalyzing}
                                    className="px-6 py-3 border border-nordic-muted text-nordic-text rounded-xl font-medium hover:bg-nordic-bg transition-colors disabled:opacity-50"
                                >
                                    Retake
                                </button>
                                {/* Submit handled automatically after recording stops, but we show status */}
                                {isAnalyzing && <span className="text-nordic-muted flex items-center">Transferring to Brain...</span>}
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraModal;
