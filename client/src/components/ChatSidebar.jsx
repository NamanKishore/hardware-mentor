import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Bot } from 'lucide-react';

const ChatSidebar = ({ messages, onSendMessage }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="w-80 border-l border-nordic-muted/20 bg-nordic-card flex flex-col h-screen">
            <div className="p-4 border-b border-nordic-muted/20 flex items-center gap-2">
                <Bot size={20} className="text-nordic-accent" />
                <h3 className="font-semibold">Mentor AI</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`
              max-w-[85%] rounded-lg p-3 text-sm
              ${msg.sender === 'user'
                                ? 'bg-nordic-accent text-nordic-bg font-medium'
                                : 'bg-nordic-bg text-nordic-text border border-nordic-muted/20'}
            `}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-nordic-muted/20 bg-nordic-card">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="w-full bg-nordic-bg border border-nordic-muted/30 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-nordic-accent/50 text-sm placeholder-nordic-muted"
                    />
                    <button
                        type="button"
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-nordic-muted hover:text-nordic-accent transition-colors"
                    >
                        <Mic size={18} />
                    </button>
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-nordic-accent rounded-lg text-nordic-bg hover:opacity-90 transition-opacity"
                    >
                        <Send size={14} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatSidebar;
