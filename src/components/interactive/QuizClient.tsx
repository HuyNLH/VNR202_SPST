'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { quizData } from '@/data/quiz';
import QuizOption from '@/components/ui/QuizOption';
import { cn } from '@/lib/utils';

export default function QuizClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizData[currentQuestion];

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;
    
    if (selectedOptionIndex === question.correctIndex) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptionIndex(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptionIndex(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="glass-card rounded-[3rem] p-12 text-center max-w-2xl mx-auto border-amber-400/20 shadow-[0_0_100px_rgba(251,191,36,0.1)]"
      >
        <div className="w-24 h-24 rounded-full bg-amber-400/10 border-2 border-amber-400/20 flex items-center justify-center text-5xl mb-8 mx-auto animate-bounce">
          🏆
        </div>
        <h3 className="font-heading text-4xl font-bold text-white mb-4">Hoàn thành thử thách!</h3>
        <p className="text-stone-400 text-lg mb-8 font-sans font-light">
          Bạn đã trả lời đúng <span className="text-amber-400 font-bold text-2xl">{score}/{quizData.length}</span> câu hỏi.
        </p>
        <div className="h-2 w-full bg-white/5 rounded-full mb-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(score / quizData.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
          />
        </div>
        <button
          onClick={resetQuiz}
          className="px-10 py-4 bg-white text-stone-950 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          Làm lại bài tập
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex justify-between items-center mb-10 px-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
          Câu hỏi <span className="text-amber-400">{currentQuestion + 1}</span> / {quizData.length}
        </span>
        <div className="flex gap-2">
          {quizData.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-8 h-1 rounded-full transition-all duration-500",
                i === currentQuestion ? "bg-amber-400 scale-x-125" : i < currentQuestion ? "bg-stone-700" : "bg-white/5"
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/5 shadow-2xl"
      >
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-4 mb-12">
          {question.options.map((optionText, index) => (
            <QuizOption
              key={index}
              id={index.toString()}
              text={optionText}
              isSelected={selectedOptionIndex === index}
              isCorrect={showFeedback && index === question.correctIndex}
              isIncorrect={showFeedback && selectedOptionIndex === index && index !== question.correctIndex}
              onSelect={() => handleSelect(index)}
              disabled={showFeedback}
            />
          ))}
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Giải thích:</span>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-sans font-light">
              {question.explanation}
            </p>
          </motion.div>
        )}

        <div className="flex justify-end">
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOptionIndex === null}
              className={cn(
                "px-10 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300 shadow-lg",
                selectedOptionIndex !== null 
                  ? "bg-gradient-to-r from-red-700 to-red-600 text-white hover:scale-105 active:scale-95" 
                  : "bg-white/5 text-stone-600 cursor-not-allowed"
              )}
            >
              Kiểm tra
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-10 py-4 bg-white text-stone-950 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              {currentQuestion < quizData.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
