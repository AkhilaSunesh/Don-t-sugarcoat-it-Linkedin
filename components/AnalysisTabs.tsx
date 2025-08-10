import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { Brain, User, MessageCircle, Drama, TrendingUp, Hash } from 'lucide-react';

interface AnalysisTabsProps {
  originalText: string;
  humanRewrite: string;
  honestComment: string;
  dramaMode: string;
  aiInsights: string[];
  corporateBuzzwords: string[];
  authenticity: 'low' | 'medium' | 'high';
  sentimentScore: number;
  isVisible: boolean;
}

export function AnalysisTabs({ 
  originalText, 
  humanRewrite, 
  honestComment, 
  dramaMode,
  aiInsights,
  corporateBuzzwords,
  authenticity,
  sentimentScore,
  isVisible 
}: AnalysisTabsProps) {
  if (!isVisible) return null;

  const getAuthenticityColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-success-green text-white';
      case 'medium': return 'bg-warning-yellow text-white';
      case 'low': return 'bg-danger-red text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSentimentColor = (score: number) => {
    if (score > 70) return 'bg-danger-red';
    if (score > 40) return 'bg-warning-yellow';
    return 'bg-success-green';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 bg-card border border-border shadow-lg">
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted p-1 rounded-lg">
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-linkedin-blue data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4 mr-1" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger 
              value="human" 
              className="data-[state=active]:bg-success-green data-[state=active]:text-white"
            >
              <User className="w-4 h-4 mr-1" />
              Human
            </TabsTrigger>
            <TabsTrigger 
              value="honest" 
              className="data-[state=active]:bg-warning-yellow data-[state=active]:text-white"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Honest
            </TabsTrigger>
            <TabsTrigger 
              value="drama" 
              className="data-[state=active]:bg-neon-pink data-[state=active]:text-white"
            >
              <Drama className="w-4 h-4 mr-1" />
              Drama
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="mt-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-linkedin-blue" />
                <h4 className="font-bold text-lg text-foreground">AI Analysis Results</h4>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Authenticity Level</span>
                    <Badge className={getAuthenticityColor(authenticity)}>
                      {authenticity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Artificial Positivity</span>
                    <span className="font-bold">{sentimentScore}%</span>
                  </div>
                  <Progress 
                    value={sentimentScore} 
                    className={`w-full h-2 ${getSentimentColor(sentimentScore)}`}
                  />
                </div>
              </div>

              {/* Buzzwords */}
              {corporateBuzzwords.length > 0 && (
                <div className="bg-muted/30 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">Corporate Buzzwords Detected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {corporateBuzzwords.map((word, index) => (
                      <Badge key={index} variant="outline" className="bg-danger-red/10 text-danger-red border-danger-red/20">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insights */}
              <div className="bg-linkedin-blue/10 p-4 rounded-lg border-l-4 border-linkedin-blue">
                <h5 className="font-medium text-foreground mb-3">Key Insights</h5>
                <div className="space-y-2">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-linkedin-blue mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="human" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">😌</span>
                <h4 className="font-bold text-lg text-foreground">How a Normal Human Would Say It</h4>
              </div>
              <div className="bg-success-green/10 p-4 rounded-lg border-l-4 border-success-green">
                <p className="text-foreground leading-relaxed">{humanRewrite}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="honest" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💣</span>
                <h4 className="font-bold text-lg text-foreground">What People Are Really Thinking</h4>
              </div>
              <div className="bg-warning-yellow/10 p-4 rounded-lg border-l-4 border-warning-yellow">
                <p className="text-foreground leading-relaxed font-medium">{honestComment}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drama" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🎪</span>
                <h4 className="font-bold text-lg text-foreground">Maximum Drama Version</h4>
              </div>
              <div className="bg-neon-pink/10 p-4 rounded-lg border-l-4 border-neon-pink">
                <p className="text-foreground leading-relaxed font-medium break-words">{dramaMode}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}