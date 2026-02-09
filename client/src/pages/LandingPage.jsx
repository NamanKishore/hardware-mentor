import React from 'react';
import ProjectCard from '../components/ProjectCard';

const LandingPage = ({ onStartProject }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-nordic-bg to-black text-center">
            <div className="max-w-4xl w-full">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-nordic-muted">
                    Hardware Mentor
                </h1>
                <p className="text-xl text-nordic-muted mb-12">
                    Select a project to begin your guided assembly session.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <ProjectCard
                        title="Dasai Mochi Robot"
                        description="Assemble the iconic Dasai Mochi robot. Learn basic soldering and component placement."
                        icon="robot"
                        onClick={() => onStartProject('dasai-mochi')}
                    />
                    <ProjectCard
                        title="Tiny Wheeled Robot"
                        description="Build a simple autonomous rover. Covers motor drivers and microcontroller basics."
                        icon="cpu"
                        onClick={() => onStartProject('tiny-wheeled')}
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
