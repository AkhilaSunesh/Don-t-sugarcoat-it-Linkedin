import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { motion } from 'motion/react';

interface HeroProps {
  onAnalyze: (text: string) => void;
  onGenerateSample: () => string;
  isAnalyzing: boolean;
}

export function Hero({ onAnalyze, onGenerateSample, isAnalyzing }: HeroProps) {
  const [inputText, setInputText] = useState('');

  const handleAnalyze = () => {
    if (inputText.trim()) {
      onAnalyze(inputText);
    }
  };

  const handleGenerateSample = () => {
    const sampleText = onGenerateSample();
    setInputText(sampleText);
  };

  return (
    <section className="text-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-6xl font-bold mb-4 text-linkedin-blue dark:text-neon-pink">
          LinkedIn Lie Detector™
        </h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold text-foreground mb-6"
        >
          Sniff Out the Zero Feelings 🕵️‍♀️
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Paste your LinkedIn brag, we'll tell you how fake it sounds.
        </motion.p>

        <Card className="p-8 shadow-lg border border-border bg-card">
          <div className="space-y-6">
            <Textarea
              placeholder="Paste that inspirational LinkedIn post here... you know, the one where you 'accidentally' helped an orphan and it taught you about synergy..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 text-lg border-2 border-muted focus:border-linkedin-blue dark:focus:border-neon-pink transition-colors duration-300 bg-input-background dark:bg-input"
              maxLength={1000}
            />
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>💡 Pro tip: The more buzzwords, the higher the cringe score</span>
              <span>{inputText.length}/1000</span>
            </div>

            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="w-full h-14 text-xl font-bold bg-linkedin-blue hover:bg-linkedin-blue-dark dark:bg-neon-pink dark:hover:bg-neon-pink-light text-white disabled:opacity-50 shadow-lg"
                >
                  {isAnalyzing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : null}
                  {isAnalyzing ? 'Analyzing Corporate Speak...' : 'Analyze This Nonsense 🔍'}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleGenerateSample}
                  disabled={isAnalyzing}
                  variant="outline"
                  className="h-14 px-6 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white dark:border-linkedin-blue dark:text-linkedin-blue dark:hover:bg-linkedin-blue dark:hover:text-white disabled:opacity-50 shadow-lg font-bold"
                >
                  🎲 Sample Post
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}