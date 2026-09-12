import React, { useState } from 'react';
import { X, Trophy, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/uselessData';

interface UselessChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UselessChallengeModal: React.FC<UselessChallengeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (points: number) => {
    const updated = [...selectedAnswers, points];
    setSelectedAnswers(updated);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsFinished(false);
  };

  // Calculate final score
  const totalScore =
    selectedAnswers.length > 0
      ? Math.round(
          selectedAnswers.reduce((acc, curr) => acc + curr, 0) / selectedAnswers.length
        )
      : 87;

  return (
    <div
      id="quiz-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="quiz-modal-content"
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              HOW USELESS ARE YOU?
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>
                  Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-purple-400 font-semibold">Diagnostic in Progress</span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                <h4 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
                  {currentQuestion.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectOption(opt.points)}
                    className="w-full p-3 rounded-xl bg-zinc-800/60 hover:bg-purple-950/40 border border-zinc-700/60 hover:border-purple-500/50 text-left transition-all flex items-center gap-3 group hover:scale-[1.01]"
                  >
                    <span className="w-7 h-7 rounded-lg bg-zinc-700/60 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center font-mono font-bold text-xs text-zinc-300 transition-colors">
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-200 font-medium group-hover:text-white">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4 space-y-5">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-500/20 to-amber-500/20 border border-purple-500/40 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(168,85,247,0.25)]">
                🏅
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-purple-400 font-mono">
                  DIAGNOSTIC COMPLETE
                </span>
                <h4 className="text-3xl sm:text-4xl font-black text-white">
                  {totalScore}% Useless
                </h4>
                <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono mt-1">
                  TIER: MASTER OF FUTILITY
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-300 leading-relaxed max-w-sm mx-auto">
                <p className="font-bold text-amber-300 mb-1">Congratulations!</p>
                <p>
                  You have achieved <span className="font-semibold text-white">absolutely nothing</span>.
                  Your dedication to procrastination and unproductivity is genuinely inspiring.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retake Diagnostic
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
                >
                  Accept Defeat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
