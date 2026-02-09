import React from 'react';
import { ArrowRight, Bot, Cpu } from 'lucide-react';

const ProjectCard = ({ title, description, icon, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden rounded-2xl bg-nordic-card p-8 border border-nordic-muted/20 hover:border-nordic-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,162,247,0.15)] cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon === 'robot' ? <Bot size={120} /> : <Cpu size={120} />}
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-nordic-bg text-nordic-accent group-hover:scale-110 transition-transform">
                        {icon === 'robot' ? <Bot size={24} /> : <Cpu size={24} />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-nordic-muted group-hover:text-nordic-text transition-colors">
                        {description}
                    </p>
                </div>

                <div className="mt-6 flex items-center text-nordic-accent font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Start Project <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
