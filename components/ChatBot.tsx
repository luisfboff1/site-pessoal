 'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blogPosts, portfolioPages, contactPage } from '@/lib/linkMap';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! 👋 Sou o assistente do site. Em que posso ajudar? Seja direto — respondo brevemente.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // removed expanded state — messages will be concise by design

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

  // Respostas locais concisas com suporte a links
  const text = userMessage.content.toLowerCase().trim();

    // (local link maps removed — using `lib/linkMap` directly instead)

  // Build a system prompt that includes the site's pages as knowledge base
    const systemPromptParts: string[] = [];
  systemPromptParts.push('Você é o assistente virtual do site de Luis Fernando Boff. Responda de forma concisa e útil. Tente ser direto, com no maximo 1 pagrafro');
    systemPromptParts.push('Base de conhecimento: lista de páginas do site (título | url | keywords):');

  type LinkItem = { title: string; url: string; keywords?: string[] };
  const mapToLines = (items: LinkItem[]) => items.map(i => `${i.title} | ${i.url} | ${Array.isArray(i.keywords) ? i.keywords.join(', ') : ''}`);
    systemPromptParts.push(...mapToLines(blogPosts));
    systemPromptParts.push(...mapToLines(portfolioPages));
  systemPromptParts.push(`${contactPage.title} | ${contactPage.url} | ${contactPage.keywords?.join(', ') || ''}`);
  // Instruct LLM to be concise
  // Stronger brevity instruction
  systemPromptParts.push('Responda de forma direta e concisa: máximo 1 frase e 100 caracteres. Seja prático e objetivo. Não use "Ver mais" nem explicações longas.');

  const systemPrompt = systemPromptParts.join('\n');

    // Try remote LLM first (server API). If it fails, fall back to a small local generator that uses the link map.
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await resp.json();
      if (data?.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        // fallback local logic
        const fallback = generateLocalReply(text);
        setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
      }
    } catch {
      const fallback = generateLocalReply(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
    }

    setIsLoading(false);
  };

  // Local lightweight reply generator when API is unavailable.
  const generateLocalReply = (text: string) => {
    const limit = (s: string, n = 100) => {
      if (s.length <= n) return s;
      // cut to last space before limit, no ellipsis
      const cut = s.slice(0, n);
      const idx = cut.lastIndexOf(' ');
      return (idx > 20 ? cut.slice(0, idx) : cut).trim();
    };
    // simple patterns
    if (/quais\s+projetos|quais\s+os\s+projetos|mostrar\s+projetos|listar\s+projetos/.test(text)) {
  return limit(`Projetos: ${portfolioPages.map(p => p.title).join(', ')}.`);
    }
    if (text.includes('contato') || text.includes('falar') || text.includes('contratar')) {
  return `Contato: ${contactPage.url}`;
    }
    // try to find keyword match
    const all = [...portfolioPages, ...blogPosts];
    const found = [] as { title: string; url: string }[];
    for (const item of all) {
      if (!item.keywords) continue;
      for (const kw of item.keywords) {
        if (text.includes(kw.toLowerCase())) {
          found.push({ title: item.title, url: item.url });
          break;
        }
      }
    }
    if (found.length === 1) {
      return limit(`${found[0].title}: ${found[0].url}`);
    }
    if (found.length > 1) {
      return limit(`${found.map(f => f.title).slice(0,3).join(', ')}`);
    }
    return limit(`Não encontrei. Deseja ver: blog ou projetos?`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const router = useRouter();

  const renderMessageContent = (text: string) => {
    // No truncation UI — messages should already be concise. Still linkify internal and external URLs.
    const parts = text.split(/(\s+)/g);
    return (
      <>
        <p className="text-sm whitespace-pre-wrap">
          {parts.map((part, i) => {
            if (!part.trim()) return part;
            // Internal link (starts with /)
            if (part.startsWith('/')) {
              return (
                <a
                  key={i}
                  href={part}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(part);
                  }}
                  className="text-emerald-300 underline hover:text-emerald-200"
                >
                  {part}
                </a>
              );
            }
            // Absolute URL
            if (/^https?:\/\//.test(part)) {
              return (
                <a key={i} href={part} target="_blank" rel="noreferrer" className="text-emerald-300 underline hover:text-emerald-200">
                  {part}
                </a>
              );
            }
            return part;
          })}
        </p>
        {/* no expansion UI; messages are concise by design */}
      </>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-blue-950/75 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 text-white">
              <h3 className="font-semibold text-lg">Assistente Virtual</h3>
              <p className="text-sm opacity-90">Luis Fernando Boff</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    {message.role === 'assistant' ? renderMessageContent(message.content) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  {/* Botões para links detectados na mensagem do assistente */}
                  {message.role === 'assistant' && (
                    <div className="flex gap-2 mt-2">
                      {(() => {
                        const linkRegex = /(https?:\/\/[^\s)]+)|(\/[\w\-\/]+\b)/g;
                        const matches = Array.from((message.content || '').matchAll(linkRegex));
                        if (!matches.length) return null;
                        return matches.map((m, i) => {
                          const url = m[0];
                          const isInternal = url.startsWith('/');
                          return (
                            <button
                              key={i}
                              onClick={() => {
                                if (isInternal) router.push(url);
                                else window.open(url, '_blank');
                              }}
                              className="text-xs px-3 py-1 rounded-full bg-blue-700/80 hover:bg-blue-600 text-white"
                            >
                              {isInternal ? 'Abrir página' : 'Abrir link'}
                            </button>
                          );
                        });
                      })()}
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 p-3 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
