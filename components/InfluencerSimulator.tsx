import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Download, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';

interface InfluencerSimulatorProps {
  originalText: string;
  isVisible: boolean;
}

export function InfluencerSimulator({ originalText, isVisible }: InfluencerSimulatorProps) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [reposts, setReposts] = useState(0);
  const [shares, setShares] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Generate fake metrics based on text length and "corporate-ness"
      const baseMetric = Math.floor(Math.random() * 500) + 100;
      const multiplier = originalText.length > 300 ? 2 : 1;
      
      setTimeout(() => setLikes(Math.floor(baseMetric * 3 * multiplier)), 300);
      setTimeout(() => setComments(Math.floor(baseMetric * 0.3 * multiplier)), 600);
      setTimeout(() => setReposts(Math.floor(baseMetric * 0.8 * multiplier)), 900);
      setTimeout(() => setShares(Math.floor(baseMetric * 0.2 * multiplier)), 1200);
    }
  }, [originalText, isVisible]);

  const handleDownload = () => {
    // Mock download functionality
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a fake LinkedIn post screenshot
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 600);
      
      ctx.fillStyle = '#0077b5';
      ctx.fillRect(0, 0, 800, 80);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('LinkedIn', 30, 50);
      
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      const lines = originalText.match(/.{1,80}/g) || [originalText];
      lines.slice(0, 10).forEach((line, index) => {
        ctx.fillText(line, 30, 120 + index * 25);
      });
      
      ctx.fillStyle = '#666666';
      ctx.font = '14px Arial';
      ctx.fillText(`${likes} likes • ${comments} comments • ${reposts} reposts`, 30, 450);
      
      // Download the canvas as image
      const link = document.createElement('a');
      link.download = 'linkedin-post-screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  if (!isVisible) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="py-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Influencer Simulator 🎪
        </h2>
        
        <Card className="p-8 bg-card border border-border shadow-lg">
          <div className="space-y-6">
            {/* Fake LinkedIn Post Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-12 h-12 bg-linkedin-blue dark:bg-neon-pink rounded-full flex items-center justify-center">
                <span className="text-white font-bold">YU</span>
              </div>
              <div>
                <div className="font-bold text-foreground">Your Name • 2nd</div>
                <div className="text-sm text-muted-foreground">Thought Leader at Synergy Corp | Inspiring Change Through Buzzwords</div>
                <div className="text-xs text-muted-foreground/80">2h • 🌍</div>
              </div>
            </div>

            {/* Post Content */}
            <div className="bg-muted/50 p-6 rounded-lg border">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {originalText}
              </p>
            </div>

            {/* Fake Engagement Metrics */}
            <div className="flex justify-between items-center py-4 border-t border-b border-border">
              <div className="flex gap-6">
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Heart className="w-5 h-5 text-danger-red" />
                  <span className="font-bold counter-up">{likes.toLocaleString()}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <MessageCircle className="w-5 h-5 text-linkedin-blue" />
                  <span className="font-bold counter-up">{comments.toLocaleString()}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Repeat2 className="w-5 h-5 text-success-green" />
                  <span className="font-bold counter-up">{reposts.toLocaleString()}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <Share className="w-5 h-5 text-neon-pink" />
                  <span className="font-bold counter-up">{shares.toLocaleString()}</span>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex items-center gap-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white dark:border-linkedin-blue dark:text-linkedin-blue dark:hover:bg-linkedin-blue dark:hover:text-white"
                >
                  <Download className="w-4 h-4" />
                  Download Screenshot
                </Button>
              </motion.div>
            </div>

            {/* Fake Comments Preview */}
            <div className="space-y-3">
              <h4 className="font-bold text-foreground">Top Comments 💬</h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium text-foreground">Sarah M.:</span>
                  <span className="text-muted-foreground">This is so inspiring! 🙌</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-foreground">Mike T.:</span>
                  <span className="text-muted-foreground">Absolutely agree! Thoughts?</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-foreground">Jennifer L.:</span>
                  <span className="text-muted-foreground">Love this perspective! 💯</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}