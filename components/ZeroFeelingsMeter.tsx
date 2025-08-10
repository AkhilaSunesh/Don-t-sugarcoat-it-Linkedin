import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';

interface ZeroFeelingsMetProps {
  percentage: number;
  isVisible: boolean;
}

export function ZeroFeelingsMeter({ percentage, isVisible }: ZeroFeelingsMetProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setDisplayPercentage(percentage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [percentage, isVisible]);

  const getColor = () => {
    if (percentage < 40) return 'text-success-green';
    if (percentage < 70) return 'text-warning-yellow';
    return 'text-danger-red';
  };

  const getBorderColor = () => {
    if (percentage < 40) return 'border-success-green';
    if (percentage < 70) return 'border-warning-yellow';
    return 'border-danger-red';
  };

  const getBgColor = () => {
    if (percentage < 40) return 'bg-success-green';
    if (percentage < 70) return 'bg-warning-yellow';
    return 'bg-danger-red';
  };

  const getEmoji = () => {
    if (percentage < 40) return '😊';
    if (percentage < 70) return '😬';
    return '🤢';
  };

  const getMessage = () => {
    if (percentage < 20) return "Wow, actual human detected!";
    if (percentage < 40) return "Pretty authentic... suspicious";
    if (percentage < 60) return "Getting a bit corporate-y";
    if (percentage < 80) return "Peak LinkedIn energy";
    return "100% Pure Corporate Cringe";
  };

  if (!isVisible) return null;

  return (
    <Card className="p-8 bg-card border border-border shadow-lg">
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Zero Feelings Meter 📊
        </h3>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          className={`relative w-48 h-48 mx-auto rounded-full border-8 ${getBorderColor()} flex items-center justify-center shadow-lg bg-muted`}
        >
          {/* Circular progress indicator */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${
                percentage < 40 ? '#10b981' : 
                percentage < 70 ? '#f59e0b' : 
                '#ef4444'
              } ${displayPercentage * 3.6}deg, transparent ${displayPercentage * 3.6}deg)`
            }}
          />
          
          <div className="w-32 h-32 bg-background rounded-full flex items-center justify-center shadow-inner z-10 border-4 border-muted">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="text-center"
            >
              <div className={`text-4xl font-black ${getColor()}`}>
                {displayPercentage}%
              </div>
              <div className="text-2xl">{getEmoji()}</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-lg font-medium text-foreground"
        >
          {getMessage()}
        </motion.div>

        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>🟢 0-39%: Actually Human</span>
          </div>
          <div className="flex justify-between">
            <span>🟡 40-69%: Corporate Speak</span>
          </div>
          <div className="flex justify-between">
            <span>🔴 70-100%: Pure Cringe</span>
          </div>
        </div>
      </div>
    </Card>
  );
}