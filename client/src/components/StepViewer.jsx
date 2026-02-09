import React from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const StepViewer = ({ project, stepIndex, onNext, onPrev, onCheckWork }) => {
    const step = project.steps[stepIndex];
    const isFirst = stepIndex === 0;
    const isLast = stepIndex === project.steps.length - 1;

    return (
        <div className="flex-1 p-8 overflow-y-auto bg-nordic-bg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                    <div className="text-nordic-accent font-medium">
                        Step {stepIndex + 1} of {project.steps.length}: {step.title}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-nordic-muted/20 relative group">
                        <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                            Reference Image
                        </div>
                    </div>
                    <p className="text-lg text-nordic-text leading-relaxed">
                        {step.description}
                    </p>
                </div>

                {step.type === 'solder' && (
                    <div className="aspect-video bg-nordic-card rounded-2xl overflow-hidden border border-nordic-muted/20 relative p-4 flex items-center justify-center">
                        {/* Mock Diagram Placeholder */}
                        {step.diagram ? (
                            <img src={step.diagram} alt="Diagram" className="max-h-full max-w-full" />
                        ) : (
                            <div className="text-nordic-muted italic">No diagram for this step</div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-nordic-accent/20 backdrop-blur px-3 py-1 rounded-full text-xs text-nordic-accent border border-nordic-accent/30">
                            Schematic View
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-auto pt-8 border-t border-nordic-muted/10">
                <button
                    onClick={onPrev}
                    disabled={isFirst}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all
            ${isFirst
                            ? 'opacity-50 cursor-not-allowed text-nordic-muted'
                            : 'hover:bg-nordic-card text-white'}`}
                >
                    <ChevronLeft className="mr-2" /> Previous
                </button>

                {step.type === 'solder' && (
                    <button
                        onClick={onCheckWork}
                        className="flex items-center px-8 py-4 bg-nordic-accent text-nordic-bg rounded-xl font-bold hover:shadow-[0_0_20px_rgba(122,162,247,0.4)] transition-all transform hover:scale-105"
                    >
                        <Camera className="mr-2" /> Check My Work
                    </button>
                )}

                <button
                    onClick={onNext}
                    disabled={isLast}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all
            ${isLast
                            ? 'opacity-50 cursor-not-allowed text-nordic-muted'
                            : 'bg-nordic-card hover:bg-nordic-card/80 text-white'}`}
                >
                    Next <ChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default StepViewer;
