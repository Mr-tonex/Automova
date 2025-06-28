
"use client";

import type {FormEvent} from 'react';
import {useState, useRef, useEffect, useActionState, useTransition} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {MessageCircle, Send, X, LoaderCircle} from 'lucide-react';
import {autoMovaSupport, type AutoMovaSupportInput} from '@/ai/flows/autoMovaSupportFlow';
import {useToast} from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const initialGreetingMessage: Message = {
  id: 'initial-greeting',
  role: 'model',
  content: "Hi there! I'm the AutoMova AI assistant. How can I help you today?",
};

const allPossibleSuggestedQuestions = [
  "What services do you offer?",
  "How can automation benefit my business?",
  "How do I get started with AutoMova?",
  "What's the process like?",
  "Can you give examples of automations?",
  "Do you work with small businesses?",
  "Tell me more about AI in your services.",
  "How long does setup typically take?",
  "What kind of support do you provide after setup?",
  "What are your pricing plans?",
  "How is AutoMova different from competitors?",
  "Can you help with data entry?",
  "Do you offer consultations?",
  "What industries do you serve?"
];

const getRandomSuggestedQuestions = (count: number = 3): string[] => {
  const shuffled = [...allPossibleSuggestedQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


export default function AIChatbox() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialGreetingMessage]);
  const [input, setInput] = useState('');
  const [suggestedQuestionsToDisplay, setSuggestedQuestionsToDisplay] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [_, startTransition] = useTransition();

  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const [state, formAction, isPendingAction] = useActionState(
    async (previousState: { reply: string; error: string | null }, formData: FormData) => {
      const userInput = formData.get('message') as string;
      if (!userInput.trim()) return { ...previousState, error: 'Message cannot be empty.' };

      setSuggestedQuestionsToDisplay([]);

      const chatHistoryForFlow = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const flowInput: AutoMovaSupportInput = {
        message: userInput,
        history: chatHistoryForFlow,
      };

      try {
        const aiResponse = await autoMovaSupport(flowInput);
        const aiMessage: Message = {id: Date.now().toString() + '-ai', role: 'model', content: aiResponse.reply};
        setMessages(prev => [...prev, aiMessage]);
        return { reply: aiResponse.reply, error: null };
      } catch (error) {
        console.error('Error calling AI flow from AIChatbox:', error);
        let displayErrorMessage = "Sorry, I'm having trouble connecting. Please try one of the contact options below.";
        if (error instanceof Error) {
          if (error.message.includes("503") || error.message.toLowerCase().includes("overloaded") || error.message.toLowerCase().includes("service unavailable")) {
            displayErrorMessage = "The AI service is temporarily overloaded. Please try again in a few moments or use one of the contact options below.";
          }
        }

        const errorMessage: Message = {
          id: Date.now().toString() + '-error',
          role: 'model',
          content: displayErrorMessage,
        };
        setMessages(prev => [...prev, errorMessage]);
        return { reply: '', error: 'Failed to get AI response.' };
      }
    },
    { reply: '', error: null }
  );

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (isClient && isOpen) {
      const lastMessage = messages[messages.length - 1];
      const shouldShowSuggestions =
        (messages.length === 1 && lastMessage.id === 'initial-greeting') ||
        (lastMessage?.role === 'model' && !isPendingAction);

      if (shouldShowSuggestions) {
        setSuggestedQuestionsToDisplay(getRandomSuggestedQuestions(3));
      } else if (lastMessage?.role === 'user' && !isPendingAction) {
        setSuggestedQuestionsToDisplay([]);
      }
    } else if (!isOpen && isClient) {
      setSuggestedQuestionsToDisplay([]);
    }
  }, [isClient, isOpen, messages, isPendingAction]);


  const processMessageSubmission = (messageText: string) => {
    if (!messageText.trim() || isPendingAction) return;

    const newMessage: Message = {id: Date.now().toString() + '-user', role: 'user', content: messageText};
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setSuggestedQuestionsToDisplay([]);

    const formData = new FormData();
    formData.append('message', messageText);

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processMessageSubmission(input);
  };

  const handleSuggestedQuestionClick = (question: string) => {
     processMessageSubmission(question);
  };

  const handleToggleChatbox = () => {
    setIsOpen(prevIsOpen => {
        const newIsOpenState = !prevIsOpen;
        if (newIsOpenState && isClient && messages.length === 1 && messages[0].id === 'initial-greeting') {
            setSuggestedQuestionsToDisplay(getRandomSuggestedQuestions(3));
        } else if (!newIsOpenState && isClient) {
            setSuggestedQuestionsToDisplay([]);
        }
        return newIsOpenState;
    });
  };


  return (
    <>
      <div
        className={`fixed bottom-20 right-4 left-4 sm:left-auto z-50 transition-all duration-300 ease-out
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <Card className="w-full sm:w-96 h-[32rem] flex flex-col shadow-[0_0_35px_5px_hsl(var(--primary)/0.3)] bg-card rounded-xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Image
                src="/AutoMova 4k no bg.png"
                alt="AutoMova Logo"
                width={24}
                height={24}
                className="object-contain"
              />
              <CardTitle className="text-lg font-semibold text-card-foreground">AutoMova Support</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>

          <CardContent className="flex-grow p-0 overflow-hidden flex flex-col">
            <ScrollArea ref={scrollAreaRef} className="flex-grow p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-xl text-sm
                                ${message.role === 'user'
                                  ? 'bg-primary text-primary-foreground rounded-br-none'
                                  : 'bg-muted text-muted-foreground rounded-bl-none shadow-sm'
                                }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
               {isPendingAction && (
                <div className="flex justify-start mb-3">
                  <div className="max-w-[75%] p-3 rounded-xl text-sm bg-muted text-muted-foreground rounded-bl-none shadow-sm flex items-center space-x-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>Typing...</span>
                  </div>
                </div>
              )}
              {isClient && isOpen && !isPendingAction && Array.isArray(suggestedQuestionsToDisplay) && suggestedQuestionsToDisplay.length > 0 && (
                <div className="flex flex-col items-start space-y-2 pt-3">
                  {suggestedQuestionsToDisplay.map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-1 px-2 rounded-full border-primary/50 text-primary hover:bg-primary/10"
                      onClick={() => handleSuggestedQuestionClick(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                name="message"
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
                disabled={isPendingAction}
              />
              <Button type="submit" size="icon" disabled={isPendingAction || !input.trim()} className="bg-primary hover:bg-primary/90">
                {isPendingAction ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>

      <Button
        onClick={handleToggleChatbox}
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-xl transition-transform hover:scale-110 active:scale-95"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </Button>
    </>
  );
}
