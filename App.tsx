import { useState } from 'react';
import { Hero } from './components/Hero';
import { ZeroFeelingsMeter } from './components/ZeroFeelingsMeter';
import { AnalysisTabs } from './components/AnalysisTabs';
import { InfluencerSimulator } from './components/InfluencerSimulator';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { aiService, AnalysisResult } from './components/AIService';
import { motion } from 'motion/react';

function AppContent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [originalText, setOriginalText] = useState('');

  const generateSampleInput = (): string => {
    const generatedPost = aiService.generateSamplePost();
    return generatedPost.content;
  };

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    setOriginalText(text);
    
    try {
      const result = await aiService.analyzePost(text);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Background decorative elements with solid colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-neon-pink/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-linkedin-blue/10 rounded-full blur-3xl"
        />
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero onAnalyze={handleAnalyze} onGenerateSample={generateSampleInput} isAnalyzing={isAnalyzing} />
        
        {(isAnalyzing || analysisResult) && (
          <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ZeroFeelingsMeter 
                  percentage={analysisResult?.percentage || 0} 
                  isVisible={!isAnalyzing && !!analysisResult} 
                />
                
                {analysisResult && (
                  <AnalysisTabs
                    originalText={originalText}
                    humanRewrite={analysisResult.humanRewrite}
                    honestComment={analysisResult.honestComment}
                    dramaMode={analysisResult.dramaMode}
                    aiInsights={analysisResult.aiInsights}
                    corporateBuzzwords={analysisResult.corporateBuzzwords}
                    authenticity={analysisResult.authenticity}
                    sentimentScore={analysisResult.sentimentScore}
                    isVisible={!isAnalyzing}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {analysisResult && (
          <InfluencerSimulator
            originalText={originalText}
            isVisible={!isAnalyzing}
          />
        )}

        {/* Footer */}
        <footer className="py-8 px-4 bg-linkedin-blue dark:bg-card text-white dark:text-foreground border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">LinkedIn Lie Detector™</h3>
              <p className="text-blue-200 dark:text-muted-foreground mb-4">
                Keeping corporate social media honest, one cringe post at a time.
              </p>
              <p className="text-sm text-blue-300 dark:text-muted-foreground/80">
                * This is a satirical tool. No actual feelings were harmed in the making of this analysis.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}