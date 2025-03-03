import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Image, Bot, User, X, RefreshCw, Loader2, Info, KeyRound, AlertTriangle } from 'lucide-react';
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

const stylePresets = {
  "bowl": {
    name: "Bowl.com Branding",
    primaryColor: "#0F2634",
    accentColor: "#33C3F0",
    backgroundColor: "#1A3C40",
    textColor: "#ffffff",
    borderColor: "#265073",
    borderRadius: 8,
  },
  "blue": {
    name: "Modern Blue",
    primaryColor: "#243949",
    accentColor: "#0EA5E9",
    backgroundColor: "#304352",
    textColor: "#ffffff",
    borderColor: "#435363",
    borderRadius: 10,
  },
  "purple": {
    name: "Tech Purple",
    primaryColor: "#1A1F2C",
    accentColor: "#9b87f5",
    backgroundColor: "#221F26",
    textColor: "#ffffff",
    borderColor: "#3A3544",
    borderRadius: 12,
  },
  "green": {
    name: "Green and Blue",
    primaryColor: "#1A3C40",
    accentColor: "#33C3F0",
    backgroundColor: "#265073",
    textColor: "#ffffff",
    borderColor: "#2D6E7E",
    borderRadius: 8,
  },
  "dark": {
    name: "Dark Mode",
    primaryColor: "#121212",
    accentColor: "#BB86FC",
    backgroundColor: "#1E1E1E",
    textColor: "#ffffff",
    borderColor: "#333333",
    borderRadius: 8,
  },
  "light": {
    name: "Light Mode",
    primaryColor: "#FFFFFF",
    accentColor: "#6200EE",
    backgroundColor: "#F5F5F5",
    textColor: "#121212",
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  "coral": {
    name: "Coral Accent",
    primaryColor: "#1A1A2E",
    accentColor: "#FF6B6B",
    backgroundColor: "#16213E",
    textColor: "#ffffff",
    borderColor: "#0F3460",
    borderRadius: 10,
  },
  "forest": {
    name: "Forest Green",
    primaryColor: "#1B2D2A",
    accentColor: "#57CC99",
    backgroundColor: "#2D4739",
    textColor: "#ffffff",
    borderColor: "#395B50",
    borderRadius: 8,
  }
};

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
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState(true);
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const suggestedPrompts = [
    "Make it match our website colors",
    "Our brand uses green and blue",
    "Create a dark modern theme",
    "I need a bright, cheerful design"
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
      chatInputRef.current.style.height = `${Math.min(chatInputRef.current.scrollHeight, 80)}px`;
    }
  };

  const analyzeUserInputWithOpenAI = async (userInput: string) => {
    if (!apiKey) {
      toast.error("OpenAI API key required", {
        description: "Please enter a valid OpenAI API key to use AI styling"
      });
      setShowKeyInput(true);
      throw new Error("OpenAI API key required");
    }

    try {
      const prompt = `
      As an AI style expert, analyze the following user description and recommend a widget style for a web application.
      User description: "${userInput}"
      
      Available styles:
      ${Object.entries(stylePresets).map(([key, style]) => (
        `- ${style.name}: Primary color ${style.primaryColor}, Accent color ${style.accentColor}, Background color ${style.backgroundColor}`
      )).join('\n')}
      
      Based on the user's description, recommend ONE of these styles or suggest modifications to one of them.
      
      Return your response in this exact JSON format:
      {
        "recommendedStyle": "STYLE_KEY", 
        "explanation": "Your explanation here",
        "primaryColor": "#hex",
        "accentColor": "#hex",
        "backgroundColor": "#hex",
        "textColor": "#hex",
        "borderColor": "#hex",
        "borderRadius": 8
      }
      
      Where STYLE_KEY is one of: bowl, blue, purple, green, dark, light, coral, forest.
      `;

      console.log("Sending request to OpenAI...");
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "user", 
              content: prompt 
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API Error:", errorData);
        
        if (errorData.error?.code === "insufficient_quota") {
          setQuotaExceeded(true);
          setIsKeyValid(false);
          setShowKeyInput(true);
          toast.error("OpenAI API quota exceeded", {
            description: "Your API key has exceeded its quota. Please use a different key or upgrade your plan."
          });
          throw new Error("OpenAI API quota exceeded");
        } else if (errorData.error?.message?.includes("API key")) {
          setIsKeyValid(false);
          setShowKeyInput(true);
          toast.error("Invalid OpenAI API key", {
            description: errorData.error?.message || "Please check your API key format and permissions"
          });
        }
        
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      // If we reach here, the key is valid
      setIsKeyValid(true);
      setQuotaExceeded(false);
      
      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;
      
      if (!aiResponse) {
        throw new Error("No response from OpenAI");
      }
      
      try {
        // Try to parse the JSON response
        console.log("AI response:", aiResponse);
        const parsedResponse = JSON.parse(aiResponse);
        console.log("Parsed response:", parsedResponse);
        
        // Get the recommended style preset
        const styleKey = parsedResponse.recommendedStyle;
        let stylePreset = stylePresets[styleKey as keyof typeof stylePresets];
        
        // Create a style object to apply
        const styleToApply = {
          primaryColor: parsedResponse.primaryColor || stylePreset.primaryColor,
          accentColor: parsedResponse.accentColor || stylePreset.accentColor,
          backgroundColor: parsedResponse.backgroundColor || stylePreset.backgroundColor,
          textColor: parsedResponse.textColor || stylePreset.textColor,
          borderColor: parsedResponse.borderColor || stylePreset.borderColor,
          borderRadius: parsedResponse.borderRadius || stylePreset.borderRadius,
          name: stylePreset.name,
        };
        
        console.log("Style to apply:", styleToApply);
        
        return {
          stylePreset: styleToApply,
          explanation: parsedResponse.explanation
        };
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError);
        // Fall back to direct keyword matching if parsing fails
        return analyzeUserInputWithKeywords(userInput);
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      // Fall back to direct keyword matching
      return analyzeUserInputWithKeywords(userInput);
    }
  };

  const analyzeUserInputWithKeywords = (userInput: string) => {
    const lowerCaseInput = userInput.toLowerCase();
    
    // Direct keyword matching for quick responses
    if (lowerCaseInput.includes('bowl.com') || lowerCaseInput.includes('bowl') || 
        (lowerCaseInput.includes('website') && lowerCaseInput.includes('match'))) {
      return {
        stylePreset: stylePresets.bowl,
        explanation: "I've analyzed the Bowl.com website and created a custom theme using their blue and green color palette. I've applied these colors to your widget design."
      };
    }
    
    if (lowerCaseInput.includes('dark') || lowerCaseInput.includes('night')) {
      return {
        stylePreset: stylePresets.dark,
        explanation: "I've created a sleek dark theme that reduces eye strain while maintaining a professional look. The purple accent adds a touch of elegance."
      };
    }
    
    if (lowerCaseInput.includes('light') || lowerCaseInput.includes('bright') || lowerCaseInput.includes('white')) {
      return {
        stylePreset: stylePresets.light,
        explanation: "I've designed a clean, light theme that's perfect for readability and a minimalist aesthetic. The purple accent provides a nice contrast."
      };
    }
    
    if (lowerCaseInput.includes('blue') && !lowerCaseInput.includes('green')) {
      return {
        stylePreset: stylePresets.blue,
        explanation: "I've created a vibrant blue theme that conveys trust and professionalism while maintaining a modern look."
      };
    }
    
    if (lowerCaseInput.includes('purple') || lowerCaseInput.includes('tech')) {
      return {
        stylePreset: stylePresets.purple,
        explanation: "I've designed a tech-focused purple theme for your brand. It looks modern and innovative with a deep background and vibrant accent color."
      };
    }
    
    if ((lowerCaseInput.includes('green') && lowerCaseInput.includes('blue')) || 
        lowerCaseInput.includes('forest') || lowerCaseInput.includes('nature')) {
      return {
        stylePreset: stylePresets.green,
        explanation: "I've created a green and blue theme that combines both colors for a fresh, professional look that evokes nature and trust."
      };
    }
    
    if (lowerCaseInput.includes('coral') || lowerCaseInput.includes('red') || lowerCaseInput.includes('warm')) {
      return {
        stylePreset: stylePresets.coral,
        explanation: "I've designed a bold theme with coral accents that create energy and excitement while maintaining readability."
      };
    }
    
    if (lowerCaseInput.includes('forest') || (lowerCaseInput.includes('green') && !lowerCaseInput.includes('blue'))) {
      return {
        stylePreset: stylePresets.forest,
        explanation: "I've created a calming forest green theme that conveys growth, harmony, and ecological awareness."
      };
    }

    // Default fallback if no keywords match
    const styles = Object.values(stylePresets);
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    return {
      stylePreset: randomStyle,
      explanation: `Based on your description, I've created a custom ${randomStyle.name.toLowerCase()} style that should work well for your brand.`
    };
  };

  const validateApiKey = () => {
    // Basic validation - check if it starts with "sk-" and has sufficient length
    if (apiKey.startsWith('sk-') && apiKey.length > 20) {
      setIsKeyValid(true);
      setShowKeyInput(false);
      toast.success("API key set", {
        description: "Your OpenAI API key has been saved for this session"
      });
    } else {
      setIsKeyValid(false);
      toast.error("Invalid API key format", {
        description: "OpenAI API keys typically start with 'sk-' and are longer"
      });
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

    // Add AI loading message
    setMessages(prev => [...prev, { role: 'assistant', content: '', isLoading: true }]);
    
    try {
      // Process the user input to get style recommendations - use OpenAI API
      const { stylePreset, explanation } = await analyzeUserInputWithOpenAI(userMessage);
      
      console.log("AI analysis complete:", stylePreset);
      
      // Update the loading message with the actual response
      setMessages(prev => {
        const newMessages = [...prev];
        const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = { role: 'assistant', content: explanation };
        } else {
          newMessages.push({ role: 'assistant', content: explanation });
        }
        return newMessages;
      });
      
      // Apply the style changes
      if (stylePreset) {
        console.log("Applying style changes:", stylePreset);
        onApplyStyle(stylePreset);
        
        toast.success(`Applied ${stylePreset.name} theme`, {
          description: "The widget styling has been updated."
        });
      }
    } catch (error) {
      console.error("Error processing AI response:", error);
      
      let errorMessage = "I'm sorry, I encountered an issue analyzing your request.";
      
      if (quotaExceeded) {
        errorMessage = "I'm sorry, but your OpenAI API key has exceeded its quota. Please use a different key or upgrade your plan at OpenAI.";
      } else if (!isKeyValid) {
        errorMessage = "I'm sorry, I encountered an issue with your API key. Please make sure you've entered a valid OpenAI API key.";
      }
      
      setMessages(prev => {
        const newMessages = [...prev];
        const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = { 
            role: 'assistant', 
            content: errorMessage
          };
        }
        return newMessages;
      });
      
      toast.error("Error generating style", {
        description: "There was a problem processing your request."
      });
    } finally {
      setIsProcessing(false);
      setUploadedImage(null);
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
    if (chatInputRef.current) {
      chatInputRef.current.focus();
      // Send after a brief delay
      setTimeout(() => {
        handleSendMessage();
      }, 100);
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
    <div className="flex flex-col h-full bg-[#1A1F2C] border border-white/10 rounded-xl overflow-hidden ai-style-compact">
      <div className="p-2 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-payouts-accent ai-style-header-icon" />
          <h3 className="font-medium text-sm">Style Assistant (OpenAI Powered)</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="h-6 px-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-md flex items-center justify-center"
            onClick={() => {
              setMessages([{ 
                role: 'assistant', 
                content: 'Hello! I can help you customize your widget design. Tell me about your brand colors and style preferences, or share your logo or website link.' 
              }]);
              setUploadedImage(null);
              setInput('');
              setQuotaExceeded(false);
            }}
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>
      
      {showKeyInput && (
        <div className="bg-white/5 p-3 border-b border-white/10">
          <div className="text-xs text-white/70 mb-2 flex items-center gap-1">
            <KeyRound size={12} className="text-payouts-accent" />
            <span>Enter your OpenAI API key to enable AI styling</span>
          </div>
          
          {quotaExceeded && (
            <div className="mb-2 p-2 bg-orange-900/30 border border-orange-700/30 rounded-md flex items-start gap-2">
              <AlertTriangle size={14} className="text-orange-400 mt-0.5" />
              <div className="text-xs text-orange-200">
                <p className="font-medium mb-0.5">API Quota Exceeded</p>
                <p>Your OpenAI API key has run out of credits. Please use a different API key or upgrade your plan at OpenAI.</p>
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="OpenAI API Key (starts with sk-...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-xs px-3 py-2 bg-white/10 border border-white/20 rounded text-white flex-grow"
            />
            <button
              className="text-xs px-3 py-2 bg-payouts-accent text-payouts-dark rounded font-medium"
              onClick={validateApiKey}
            >
              Set Key
            </button>
          </div>
          <div className="text-xs text-white/60 mt-2 flex items-start gap-1">
            <Info size={10} className="mt-0.5" />
            <span>You need an OpenAI API key with access to gpt-3.5-turbo model. Your key is stored only in your browser for this session.</span>
          </div>
        </div>
      )}
      
      <div className="suggestions-container">
        {suggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            className="suggestion-chip"
            onClick={() => handleSuggestedPrompt(prompt)}
            disabled={!isKeyValid && showKeyInput}
          >
            "{prompt}"
          </button>
        ))}
      </div>
      
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-2 overflow-y-auto bg-black/20 chat-messages"
      >
        <div className="space-y-2">
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
                  "max-w-[90%] rounded-lg p-2 ai-style-compact-message",
                  message.role === 'user' 
                    ? "bg-payouts-accent/20 text-white" 
                    : "bg-white/10 text-white"
                )}
              >
                <div className="flex items-center gap-1 mb-1">
                  {message.role === 'assistant' ? (
                    <Bot size={14} className="text-payouts-accent ai-style-bot-icon" />
                  ) : (
                    <User size={14} className="text-payouts-accent" />
                  )}
                  <span className="text-xs font-medium text-white/70">
                    {message.role === 'user' ? 'You' : 'Style AI'}
                  </span>
                </div>
                
                {message.isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-payouts-accent" />
                    <p className="text-sm text-white/70">Analyzing and generating style...</p>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
                
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
        <div className="px-2 pt-2">
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
      
      <div className="p-2 border-t border-white/10 bg-white/5 chat-input-container">
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
            className="ai-upload-button flex items-center justify-center"
            onClick={triggerFileInput}
            title="Upload logo"
            aria-label="Upload logo"
            disabled={!isKeyValid && showKeyInput}
          >
            <Upload size={16} className={`${(!isKeyValid && showKeyInput) ? 'text-white/30' : 'text-white/70'}`} />
          </button>
          
          <div className="flex-1 bg-white/5 rounded-md flex items-center border border-white/10">
            <textarea
              ref={chatInputRef}
              className="chat-input"
              placeholder={isKeyValid || !showKeyInput ? "Ask about styling..." : "Enter your API key first..."}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResizeTextarea();
              }}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={!isKeyValid && showKeyInput}
            />
          </div>
          
          <button
            type="button"
            className={`chat-button h-8 w-8 flex items-center justify-center ${
              isProcessing || (!input.trim() && !uploadedImage) || (!isKeyValid && showKeyInput) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSendMessage}
            disabled={isProcessing || (!input.trim() && !uploadedImage) || (!isKeyValid && showKeyInput)}
            style={{
              backgroundColor: config.accentColor,
              color: '#143745',
            }}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
