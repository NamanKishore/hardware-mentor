import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { X, Camera, RefreshCw } from 'lucide-react';

const CameraModal = ({ isOpen, onClose, onCapture, isAnalyzing }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const confirmCapture = () => {
        onCapture(imgSrc);
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

                <h3 className="text-xl font-bold text-white mb-4">Check Your Work</h3>

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
                </div>

                <div className="flex justify-center gap-4">
                    {!imgSrc ? (
                        <button
                            onClick={capture}
                            className="flex items-center px-6 py-3 bg-nordic-accent text-nordic-bg rounded-xl font-bold hover:opacity-90 transition-opacity"
                        >
                            <Camera className="mr-2" /> Capture
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={retake}
                                disabled={isAnalyzing}
                                className="px-6 py-3 border border-nordic-muted text-nordic-text rounded-xl font-medium hover:bg-nordic-bg transition-colors disabled:opacity-50"
                            >
                                Retake
                            </button>
                            <button
                                onClick={confirmCapture}
                                disabled={isAnalyzing}
                                className="px-6 py-3 bg-nordic-success text-nordic-bg rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isAnalyzing ? 'Processing...' : 'Submit for Review'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraModal;
