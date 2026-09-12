import React, { useState, useEffect, useRef } from 'react';
import {
  ChatMessage,
  UselessModeId,
  PointlessActionType,
  UselessSessionStats,
  HistoryItem,
  SpecialEventAlert,
} from './types';
import {
  RANDOM_USELESS_QUESTIONS,
  LOADING_THOUGHTS,
  EASTER_EGGS,
  SPECIAL_EVENTS,
  getCategoryForMode,
  getScoreLabel,
} from './data/uselessData';
import {
  playSendSound,
  playReceiveSound,
  playScoreSound,
  playEmergencySound,
  playClickSound,
  playNothingDeletedSound,
} from './utils/audio';

import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { PointlessButtonsBar } from './components/PointlessButtonsBar';
import { ChatMessageList } from './components/ChatMessageList';
import { ChatInputArea } from './components/ChatInputArea';
import { StatsPanel } from './components/StatsPanel';
import { DailyQuoteCard } from './components/DailyQuoteCard';
import { HistoryModal } from './components/HistoryModal';
import { UselessChallengeModal } from './components/UselessChallengeModal';
import { AboutModal } from './components/AboutModal';
import { ClearChatModal } from './components/ClearChatModal';
import { SpecialEventToast } from './components/SpecialEventToast';

export default function App() {
  // Sound configuration
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('useless_ai_sound') === 'true';
    }
    return false;
  });

  // Selected Mode
  const [selectedMode, setSelectedMode] = useState<UselessModeId>('random');

  // Messages List
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('useless_ai_active_chat');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore parsing error
        }
      }
    }
    return [
      {
        id: 'welcome_1',
        sender: 'ai',
        text: 'Hello. I am Useless AI, specifically engineered to solve problems nobody has. Ask me anything, and I promise to offer zero practical assistance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'HONEST INTRODUCTION',
        score: 95,
        scoreLabel: 'Extremely Useless',
        mode: 'random',
      },
    ];
  });

  // History state in localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('useless_ai_history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [];
  });

  // Session Statistics
  const [stats, setStats] = useState<UselessSessionStats>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('useless_ai_stats');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return {
      questionsAsked: 1,
      usefulAnswers: 0,
      uselessAnswers: 1,
      timeWastedSeconds: 0,
      brainCellsLostPercent: 32,
      productivityPercent: -42,
    };
  });

  // Loading & generation states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingThoughtIndex, setLoadingThoughtIndex] = useState(0);
  const [lastUserPrompt, setLastUserPrompt] = useState<string>('');
  const [lastAiResponse, setLastAiResponse] = useState<string>('');

  // Modals state
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isClearChatOpen, setIsClearChatOpen] = useState(false);

  // Special Events Toast
  const [activeSpecialEvent, setActiveSpecialEvent] = useState<SpecialEventAlert | null>(null);

  // Persist messages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('useless_ai_active_chat', JSON.stringify(messages));
    }
  }, [messages]);

  // Persist history
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('useless_ai_history', JSON.stringify(history));
    }
  }, [history]);

  // Persist stats
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('useless_ai_stats', JSON.stringify(stats));
    }
  }, [stats]);

  // Persist sound preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('useless_ai_sound', String(soundEnabled));
    }
  }, [soundEnabled]);

  // Dynamic Time Wasted Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        timeWastedSeconds: prev.timeWastedSeconds + 1,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle Loading Thoughts while AI is thinking
  useEffect(() => {
    if (!isLoading) return;
    const thoughtInterval = setInterval(() => {
      setLoadingThoughtIndex((prev) => (prev + 1) % LOADING_THOUGHTS.length);
    }, 1200);
    return () => clearInterval(thoughtInterval);
  }, [isLoading]);

  // Occasional random special event trigger (every 5-6 questions or random interval)
  const triggerRandomSpecialEvent = () => {
    const randomEvent = SPECIAL_EVENTS[Math.floor(Math.random() * SPECIAL_EVENTS.length)];
    setActiveSpecialEvent(randomEvent);
  };

  // Sound handler
  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Send message to Useless AI API
  const handleSendMessage = async (text: string, actionType?: PointlessActionType) => {
    const trimmed = text.trim();
    if (!trimmed && !actionType) return;

    playSendSound(soundEnabled);

    const nowTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // If it's a new user prompt (not an action button tweak)
    if (!actionType) {
      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        sender: 'user',
        text: trimmed,
        timestamp: nowTimestamp,
      };
      setMessages((prev) => [...prev, userMessage]);
      setLastUserPrompt(trimmed);
    }

    setIsLoading(true);
    setLoadingThoughtIndex(0);

    // Check Easter Eggs immediately client-side
    const cleanLower = trimmed.toLowerCase();
    if (!actionType && EASTER_EGGS[cleanLower]) {
      const egg = EASTER_EGGS[cleanLower];
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: egg.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: egg.category,
          score: egg.score,
          scoreLabel: getScoreLabel(egg.score),
          mode: selectedMode,
          isEasterEgg: true,
          parentQuestion: trimmed,
        };

        setMessages((prev) => [...prev, aiMessage]);
        setLastAiResponse(egg.answer);
        setIsLoading(false);

        // Update statistics
        setStats((prev) => ({
          ...prev,
          questionsAsked: prev.questionsAsked + 1,
          uselessAnswers: prev.uselessAnswers + 1,
          brainCellsLostPercent: Math.min(99, prev.brainCellsLostPercent + 3),
          productivityPercent: prev.productivityPercent - 4,
        }));

        // Add to history
        const newHistoryItem: HistoryItem = {
          id: `hist_${Date.now()}`,
          question: trimmed,
          response: egg.answer,
          score: egg.score,
          scoreLabel: getScoreLabel(egg.score),
          category: egg.category,
          mode: selectedMode,
          timestamp: nowTimestamp,
        };
        setHistory((prev) => [newHistoryItem, ...prev.slice(0, 49)]);

        playReceiveSound(soundEnabled);
        setTimeout(() => playScoreSound(egg.score, soundEnabled), 300);
      }, 700);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: trimmed || lastUserPrompt,
          mode: selectedMode,
          actionType,
          previousResponse: lastAiResponse,
          parentQuestion: lastUserPrompt,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      const aiResponseText = data.response || 'I have decided not to participate in answering.';
      const score = data.score ?? Math.floor(Math.random() * 15) + 85;
      const scoreLabel = data.scoreLabel || getScoreLabel(score);
      const category = data.category || getCategoryForMode(selectedMode);

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category,
        score,
        scoreLabel,
        mode: selectedMode,
        parentQuestion: trimmed || lastUserPrompt,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLastAiResponse(aiResponseText);

      // Update statistics
      setStats((prev) => {
        const nextQuestions = actionType ? prev.questionsAsked : prev.questionsAsked + 1;
        const nextUseless = prev.uselessAnswers + 1;
        const nextBrain = Math.min(99, prev.brainCellsLostPercent + Math.floor(Math.random() * 3) + 2);
        const nextProd = prev.productivityPercent - (Math.floor(Math.random() * 5) + 3);

        // Check if we should trigger a random event
        if (nextQuestions % 4 === 0) {
          setTimeout(triggerRandomSpecialEvent, 800);
        }

        return {
          ...prev,
          questionsAsked: nextQuestions,
          uselessAnswers: nextUseless,
          brainCellsLostPercent: nextBrain,
          productivityPercent: nextProd,
        };
      });

      // Save to History (only for full questions or significant actions)
      const historyItem: HistoryItem = {
        id: `hist_${Date.now()}`,
        question: trimmed || lastUserPrompt || 'Tweak action',
        response: aiResponseText,
        score,
        scoreLabel,
        category,
        mode: selectedMode,
        timestamp: nowTimestamp,
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);

      playReceiveSound(soundEnabled);
      setTimeout(() => playScoreSound(score, soundEnabled), 250);
    } catch (err) {
      console.error('Chat error:', err);
      // Section 13 error handling:
      // "Oops. My brain has stopped working. Not that it was working before." with [TRY AGAIN]
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'ai',
        text: 'Oops.\n\nMy brain has stopped working.\n\nNot that it was working before.',
        timestamp: nowTimestamp,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Pointless action button trigger
  const handleTriggerAction = (action: PointlessActionType) => {
    playClickSound(soundEnabled);

    if (action === 'delete_nothing') {
      playNothingDeletedSound(soundEnabled);
      setActiveSpecialEvent({
        id: `nothing_${Date.now()}`,
        title: '🗑️ NOTHING DELETED',
        message: 'Successfully deleted 0 bytes of essential nothingness. Your storage and chat remain untouched.',
        type: 'notice',
      });
      return;
    }

    if (action === 'emergency') {
      playEmergencySound(soundEnabled);
      setActiveSpecialEvent({
        id: `emergency_${Date.now()}`,
        title: '🚨 EMERGENCY ALERT',
        message: 'Someone nearby is being dangerously productive! Activating maximum pointless defense protocols!',
        type: 'emergency',
      });
      return;
    }

    // AI actions: 'make_more_useless' | 'overthink' | 'make_worse' | 'regenerate'
    handleSendMessage(lastUserPrompt || 'Tell me something useless', action);
  };

  // Ask something random button handler
  const handleAskRandom = () => {
    playClickSound(soundEnabled);
    const randomQuestion =
      RANDOM_USELESS_QUESTIONS[Math.floor(Math.random() * RANDOM_USELESS_QUESTIONS.length)];
    handleSendMessage(randomQuestion);
  };

  // Clear chat handler
  const handleConfirmClear = () => {
    playClickSound(soundEnabled);
    setMessages([]);
    localStorage.removeItem('useless_ai_active_chat');
    setActiveSpecialEvent({
      id: `cleared_${Date.now()}`,
      title: '✨ CHAT CLEARED',
      message: 'All your useless conversations have vanished into thin air. Exactly as expected.',
      type: 'notice',
    });
  };

  // History actions
  const handleDeleteHistoryEntry = (id: string) => {
    playClickSound(soundEnabled);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearEntireHistory = () => {
    playClickSound(soundEnabled);
    setHistory([]);
    localStorage.removeItem('useless_ai_history');
  };

  const handleRetryError = () => {
    if (lastUserPrompt) {
      handleSendMessage(lastUserPrompt);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* 1. Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenClearChat={() => setIsClearChatOpen(true)}
        historyCount={history.length}
      />

      {/* 2. Main Content Dashboard */}
      <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 flex-1 flex flex-col gap-4">
        {/* Mode Selector */}
        <ModeSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />

        {/* Core Layout: Chat Column (Main) + Sidebar (Telemetry & Pointless Fun) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
          {/* Main Chat Area (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col h-[680px] bg-zinc-900/50 border border-zinc-800/80 rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl">
            {/* Pointless Action Controls directly above chat */}
            <div className="p-2 border-b border-zinc-800/60 bg-zinc-950/40">
              <PointlessButtonsBar
                onTriggerAction={handleTriggerAction}
                disabled={isLoading}
                hasMessages={messages.length > 0}
              />
            </div>

            {/* Chat Messages List */}
            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              loadingThought={LOADING_THOUGHTS[loadingThoughtIndex]}
              onSelectPrompt={(p) => handleSendMessage(p)}
              onRetryError={handleRetryError}
              onQuickAction={(action) => handleTriggerAction(action)}
            />

            {/* Input Area */}
            <ChatInputArea
              onSendMessage={(t) => handleSendMessage(t)}
              onAskRandom={handleAskRandom}
              isLoading={isLoading}
            />
          </div>

          {/* Right Sidebar: Daily Quote, Stats Panel, Quick Info (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Daily Quote of the Day */}
            <DailyQuoteCard />

            {/* Live Useless Telemetry Stats */}
            <StatsPanel stats={stats} />

            {/* Mini Challenge Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 to-violet-900/20 border border-purple-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                  🧠 Mini Challenge
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                  DIAGNOSTIC
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">How Useless Are You?</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Take our 5-question unscientific test to determine your exact level of futility.
              </p>
              <button
                type="button"
                onClick={() => setIsQuizOpen(true)}
                className="w-full mt-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all text-center cursor-pointer"
              >
                Start Useless Challenge 🎯
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-4 text-center text-xs text-zinc-500 space-y-1 px-4">
        <p>
          🤖 <strong>USELESS AI</strong> • "The AI that solves problems nobody has."
        </p>
        <p className="text-[11px] text-zinc-600">
          Crafted with intentional futility, modern React, Tailwind CSS, and zero productivity goals.
        </p>
      </footer>

      {/* Modals & Dialogs */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearEntireHistory}
        onDeleteEntry={handleDeleteHistoryEntry}
        onSelectQuestion={(q) => handleSendMessage(q)}
      />
      <UselessChallengeModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <ClearChatModal
        isOpen={isClearChatOpen}
        onClose={() => setIsClearChatOpen(false)}
        onConfirmClear={handleConfirmClear}
      />

      {/* Floating Toast Notification for Special Events */}
      <SpecialEventToast
        event={activeSpecialEvent}
        onDismiss={() => setActiveSpecialEvent(null)}
      />
    </div>
  );
}
