import React from 'react';
import { Send, Mic, Sparkles, User } from 'lucide-react';

const ChatPane = ({ source }) => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: "Hello! I'm your Aether study coach. Select a source to begin our session." }
    ]);
    const [input, setInput] = React.useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages([...newMessages, {
                role: 'assistant',
                content: `I'm processing your request about ${source?.title || 'the current context'}. In a full implementation, I would query the vector database now.`
            }]);
        }, 1000);
    };

    return (
        <div className="h-full glass rounded-xl sm:rounded-[32px] flex flex-col overflow-hidden">
            <div className="p-3 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <h3 className="font-bold text-sm">Aether AI Assistant</h3>
                </div>
                <div className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase">
                    Online
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
                {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'assistant' ? 'bg-secondary/20' : 'bg-primary/20'
                            }`}>
                            {m.role === 'assistant' ? <Sparkles className="w-4 h-4 text-secondary" /> : <User className="w-4 h-4 text-primary" />}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${m.role === 'assistant' ? 'bg-white/5 rounded-tl-none' : 'bg-primary/10 rounded-tr-none border border-primary/20'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-2 sm:p-4 bg-black/20">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask anything about your sources..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-3 sm:pl-4 pr-20 sm:pr-24 focus:border-primary outline-none transition-all text-xs sm:text-sm"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSend}
                            className="p-2 bg-primary text-background rounded-xl hover:scale-105 transition-transform"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPane;
