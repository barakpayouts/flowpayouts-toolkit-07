
import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Image, Bot, User, X, RefreshCw } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
}

interface ChatWindowProps {
  onApplyStyle: (styleChanges: any) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onApplyStyle }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I can help you customize your widget design. Tell me about your brand colors and style preferences, or share your logo or website link.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { config } = useWidgetConfig();
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Example styles that the AI would generate based on the conversation and uploaded images
  const predefinedStyles = [
    {
      name: "Modern Blue",
      primaryColor: "#243949",
      accentColor: "#0EA5E9",
      backgroundColor: "#304352",
      textColor: "#ffffff",
      borderColor: "#435363",
      borderRadius: 10,
    },
    {
      name: "Tech Purple",
      primaryColor: "#1A1F2C",
      accentColor: "#9b87f5",
      backgroundColor: "#221F26",
      textColor: "#ffffff",
      borderColor: "#3A3544",
      borderRadius: 12,
    },
    {
      name: "Green and Blue",
      primaryColor: "#1A3C40",
      accentColor: "#1EAEDB",
      backgroundColor: "#265073",
      textColor: "#ffffff",
      borderColor: "#2D6E7E",
      borderRadius: 8,
    },
    {
      name: "Vibrant Ocean",
      primaryColor: "#003366",
      accentColor: "#33C3F0",
      backgroundColor: "#004E89",
      textColor: "#ffffff",
      borderColor: "#2A6F97",
      borderRadius: 8,
    }
  ];

  // Suggested prompts that users can click on
  const suggestedPrompts = [
    "Make it match our website colors",
    "Our brand uses green and blue",
    "Upload our logo to extract colors"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const autoResizeTextarea = () => {
    if (chatInputRef.current) {
      chatInputRef.current.style.height = 'auto';
      chatInputRef.current.style.height = `${Math.min(chatInputRef.current.scrollHeight, 100)}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !uploadedImage) return;

    // Add user message
    const userMessage = input.trim() || (uploadedImage ? "I've uploaded a logo for my brand." : "");
    
    setMessages(prev => [
      ...prev, 
      { role: 'user', content: userMessage }
    ]);
    
    setInput('');
    if (chatInputRef.current) {
      chatInputRef.current.style.height = 'auto';
    }
    setIsProcessing(true);

    // Add AI loading message after a short delay to improve UX
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: '', isLoading: true }]);
    }, 300);

    // Simulate AI response after a delay
    setTimeout(() => {
      simulateAIResponse(userMessage);
      setIsProcessing(false);
      setUploadedImage(null);
    }, 1500);
  };

  const simulateAIResponse = (userMessage: string) => {
    const lowerCaseMsg = userMessage.toLowerCase();
    let aiResponse = '';
    let styleToApply = null;

    // Simulate AI understanding different user inputs
    if (lowerCaseMsg.includes('blue') || lowerCaseMsg.includes('ocean')) {
      aiResponse = "I think a vibrant ocean blue theme would work well for your brand. It conveys trust and professionalism. I've created a style based on blue tones.";
      styleToApply = predefinedStyles[3];
    } 
    else if (lowerCaseMsg.includes('purple') || lowerCaseMsg.includes('tech')) {
      aiResponse = "A tech-focused purple theme would be perfect for your brand. It looks modern and innovative. I've applied this style to your widget.";
      styleToApply = predefinedStyles[1];
    }
    else if (lowerCaseMsg.includes('green') && lowerCaseMsg.includes('blue')) {
      aiResponse = "I've created a green and blue theme that combines both colors for a fresh, professional look. This should match your brand colors perfectly.";
      styleToApply = predefinedStyles[2];
    }
    else if (lowerCaseMsg.includes('website') || lowerCaseMsg.includes('match')) {
      aiResponse = "Based on your website colors, I've designed a modern blue theme that should complement your existing brand identity perfectly.";
      styleToApply = predefinedStyles[0];
    }
    else if (uploadedImage || lowerCaseMsg.includes('logo') || lowerCaseMsg.includes('image') || lowerCaseMsg.includes('upload')) {
      aiResponse = "I've analyzed your brand assets and created a custom theme that matches your visual identity. The colors and style elements have been extracted from your logo.";
      // Use green and blue style for logo uploads
      styleToApply = predefinedStyles[2];
    }
    else {
      aiResponse = "Based on your preferences, I've created a custom style that should work well for your brand. You can always ask me to adjust specific elements like colors, borders, or spacing.";
      // Use a random style for the demo
      styleToApply = predefinedStyles[Math.floor(Math.random() * predefinedStyles.length)];
    }

    // Update the loading message with the actual response
    setMessages(prev => {
      const newMessages = [...prev];
      const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
      if (loadingIndex !== -1) {
        newMessages[loadingIndex] = { role: 'assistant', content: aiResponse };
      } else {
        newMessages.push({ role: 'assistant', content: aiResponse });
      }
      return newMessages;
    });

    // Apply the style changes
    if (styleToApply) {
      onApplyStyle(styleToApply);
      
      toast.success(`Applied ${styleToApply.name} theme`, {
        description: "The widget styling has been updated."
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    // Focus the input after selecting a prompt
    if (chatInputRef.current) {
      chatInputRef.current.focus();
      // Simulate a click on the send button after a brief delay
      setTimeout(() => {
        handleSendMessage();
      }, 500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Read the file and convert it to a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
        toast.success('Logo uploaded successfully', {
          description: 'The AI will analyze your logo to create a matching style'
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1F2C] border border-white/10 rounded-xl overflow-hidden">
      <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-payouts-accent" />
          <h3 className="font-medium text-sm">Style Assistant</h3>
        </div>
        <button 
          className="h-7 px-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-md flex items-center justify-center"
          onClick={() => {
            setMessages([{ 
              role: 'assistant', 
              content: 'Hello! I can help you customize your widget design. Tell me about your brand colors and style preferences, or share your logo or website link.' 
            }]);
            setUploadedImage(null);
            setInput('');
          }}
        >
          <RefreshCw size={12} />
        </button>
      </div>
      
      {/* Suggested prompts section */}
      <div className="suggestions-container">
        {suggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            className="suggestion-chip"
            onClick={() => handleSuggestedPrompt(prompt)}
          >
            "{prompt}"
          </button>
        ))}
      </div>
      
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-3 overflow-y-auto bg-black/20 max-h-[280px]"
      >
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex w-full",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-[90%] rounded-lg p-2",
                  message.role === 'user' 
                    ? "bg-payouts-accent/20 text-white" 
                    : "bg-white/10 text-white",
                  message.isLoading && "animate-pulse"
                )}
              >
                <div className="flex items-center gap-1 mb-1">
                  {message.role === 'assistant' ? (
                    <Bot size={14} className="text-payouts-accent" />
                  ) : (
                    <User size={14} className="text-payouts-accent" />
                  )}
                  <span className="text-xs font-medium text-white/70">
                    {message.role === 'user' ? 'You' : 'Style AI'}
                  </span>
                </div>
                
                <p className="text-sm whitespace-pre-wrap">{message.content || (message.isLoading ? 'Designing your style...' : '')}</p>
                
                {index === messages.length - 1 && message.role === 'user' && uploadedImage && (
                  <div className="mt-2">
                    <div className="uploaded-image-container">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded logo" 
                        className="uploaded-image" 
                      />
                      <button 
                        className="remove-image-button"
                        onClick={() => setUploadedImage(null)}
                      >
                        <X size={12} className="text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {uploadedImage && (
        <div className="px-3 pt-2">
          <div className="bg-white/10 rounded-md p-2 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-white/70 truncate">
              <Image size={12} className="text-payouts-accent" />
              <span className="truncate">Logo uploaded and ready to analyze</span>
            </div>
            <button 
              className="h-6 w-6 p-0 text-white/70 hover:text-white bg-transparent flex items-center justify-center"
              onClick={() => setUploadedImage(null)}
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}
      
      <div className="p-3 border-t border-white/10 bg-white/5">
        <div className="flex gap-2 items-center">
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            className="ai-upload-button h-9 w-9 flex items-center justify-center"
            onClick={triggerFileInput}
            title="Upload logo"
          >
            <Upload size={16} className="text-white/70" />
          </button>
          
          <div className="flex-1 bg-white/5 rounded-md flex items-center border border-white/10">
            <textarea
              ref={chatInputRef}
              className="chat-input"
              placeholder="Ask about styling, or share your website..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResizeTextarea();
              }}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          
          <button
            type="button"
            className={`chat-button h-9 w-9 flex items-center justify-center ${
              isProcessing || (!input.trim() && !uploadedImage) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSendMessage}
            disabled={isProcessing || (!input.trim() && !uploadedImage)}
            style={{
              backgroundColor: config.accentColor,
              color: '#143745',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
