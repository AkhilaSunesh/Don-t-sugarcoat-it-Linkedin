// AI Service for content generation and analysis
// This creates mock AI responses for immediate functionality

export interface AnalysisResult {
  percentage: number;
  humanRewrite: string;
  honestComment: string;
  dramaMode: string;
  aiInsights: string[];
  corporateBuzzwords: string[];
  authenticity: 'low' | 'medium' | 'high';
  sentimentScore: number;
}

export interface GeneratedPost {
  content: string;
  scenario: string;
  type: 'humble_brag' | 'fake_story' | 'buzzword_overload' | 'virtue_signal' | 'thought_leader';
}

class AIContentService {
  private buzzwords = [
    'synergy', 'leverage', 'disrupt', 'paradigm', 'innovative', 'journey', 
    'passionate', 'thrilled', 'blessed', 'grateful', 'humbled', 'ecosystem', 
    'rockstar', 'ninja', 'guru', 'thought leadership', 'game-changer', 
    'revolutionary', 'exponential', 'authentic', 'vulnerability', 'pivot',
    'circle back', 'ideate', 'low-hanging fruit', 'move the needle',
    'best practices', 'deep dive', 'actionable insights', 'win-win'
  ];

  private scenarios = [
    'Meeting a wise stranger who changes everything',
    'Coffee shop epiphany that revolutionizes business',
    'Child asking innocent question with profound implications',
    'Failure leading to massive success story',
    'Janitor teaching leadership lessons',
    'Random encounter with secret CEO',
    'Meditation retreat breakthrough',
    'Family dinner wisdom bomb'
  ];

  private postTemplates = {
    humble_brag: [
      "I'm humbled to announce that {achievement}. This journey taught me that {lesson}. Grateful for my amazing team who made this possible! 🚀 #Success #Leadership",
      "Plot twist: {unexpected_event} turned out to be the best thing that happened to my career. Sometimes failure is just success in disguise! 💪 #Growth #Mindset",
      "I was recently asked '{question}' - this simple question completely shifted my perspective on {topic}. Success isn't about {wrong_thing}, it's about {right_thing}! ✨ #Wisdom"
    ],
    fake_story: [
      "Yesterday, while {mundane_activity}, I met {person} who taught me more about {skill} than any {formal_education} ever could. Here's what happened... 🧵 #StoryTime #Learning",
      "LIFE-CHANGING moment: {event} happened and it made me realize that {profound_realization}. This is why I'm passionate about {cause}! 🌟 #Inspiration",
      "True story: {interaction} completely changed how I view {business_concept}. Sometimes the best lessons come from unexpected places! 💡 #Leadership"
    ],
    buzzword_overload: [
      "Our team has successfully leveraged cutting-edge synergy to disrupt the traditional paradigm of {industry}! Through innovative ideation and exponential growth mindset, we're revolutionizing {field}! 🎯 #Innovation #Disruption",
      "Excited to share that we're pivoting our game-changing platform to create actionable insights that move the needle in the {market} space! Let's circle back on best practices for exponential success! 📈 #TechLeadership",
      "Deep dive into how authentic vulnerability and thought leadership can create win-win scenarios in the modern ecosystem. Ready to ideate some low-hanging fruit solutions? 🌱 #ThoughtLeadership"
    ],
    virtue_signal: [
      "Mental health matters. Work-life balance isn't just a buzzword - it's a necessity. I'm committed to creating an inclusive environment where {value} thrives. Who's with me? 🤝 #MentalHealthAwareness #Inclusion",
      "Diversity isn't just the right thing to do - it's the smart thing to do. Our diverse team has {achievement} because different perspectives create innovation! 🌈 #Diversity #Innovation",
      "Sustainability isn't optional anymore. I'm proud to announce that {green_initiative} because the planet needs leaders who act, not just talk! 🌍 #Sustainability #Leadership"
    ],
    thought_leader: [
      "Unpopular opinion: {controversial_take}. Here's why traditional {industry} thinking is holding us back and what we should do instead... 🧠 #ThoughtLeadership #Disruption",
      "The future of {field} isn't what you think. After {research}, I've discovered that {prediction}. Here's my framework for {solution}... 📊 #FutureOfWork #Strategy",
      "I've been studying {topic} for {timeframe} and here's what everyone gets wrong: {insight}. Time to challenge the status quo! ⚡ #Innovation #Leadership"
    ]
  };

  generateSamplePost(): GeneratedPost {
    const types = Object.keys(this.postTemplates) as Array<keyof typeof this.postTemplates>;
    const type = types[Math.floor(Math.random() * types.length)];
    const templates = this.postTemplates[type];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const scenario = this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
    
    // Replace placeholders with random content
    const content = template
      .replace('{achievement}', this.getRandomFromArray(['closing our biggest deal ever', 'launching our revolutionary product', 'getting promoted to VP', 'being featured in Forbes']))
      .replace('{lesson}', this.getRandomFromArray(['perseverance pays off', 'collaboration beats competition', 'authenticity is everything', 'failure is feedback']))
      .replace('{unexpected_event}', this.getRandomFromArray(['getting fired', 'my startup failing', 'being rejected 50 times', 'losing my biggest client']))
      .replace('{question}', this.getRandomFromArray(['What does success mean to you?', 'How do you define leadership?', 'What\'s your biggest fear?', 'Why do you do what you do?']))
      .replace('{topic}', this.getRandomFromArray(['leadership', 'entrepreneurship', 'innovation', 'success', 'teamwork']))
      .replace('{wrong_thing}', this.getRandomFromArray(['climbing the corporate ladder', 'maximizing profits', 'individual achievement', 'working 80-hour weeks']))
      .replace('{right_thing}', this.getRandomFromArray(['lifting others as you climb', 'creating value for society', 'building meaningful relationships', 'finding work-life harmony']))
      .replace('{mundane_activity}', this.getRandomFromArray(['grabbing my morning coffee', 'waiting for the elevator', 'walking my dog', 'standing in line at the grocery store']))
      .replace('{person}', this.getRandomFromArray(['an elderly janitor', 'a homeless veteran', 'a 7-year-old kid', 'an Uber driver']))
      .replace('{skill}', this.getRandomFromArray(['leadership', 'resilience', 'empathy', 'innovation', 'customer service']))
      .replace('{formal_education}', this.getRandomFromArray(['MBA program', 'corporate training', 'business school', 'leadership seminar']))
      .replace('{event}', this.getRandomFromArray(['My laptop crashed during a pitch', 'I spilled coffee on my shirt before a meeting', 'My flight got canceled', 'I forgot my presentation slides']))
      .replace('{profound_realization}', this.getRandomFromArray(['preparation matters less than adaptability', 'vulnerability is strength', 'every setback is a setup for a comeback', 'authenticity beats perfection']))
      .replace('{cause}', this.getRandomFromArray(['mental health awareness', 'inclusive leadership', 'sustainable business', 'youth mentorship']))
      .replace('{interaction}', this.getRandomFromArray(['A customer complaint', 'Feedback from my intern', 'A conversation with my grandmother', 'Watching my toddler learn to walk']))
      .replace('{business_concept}', this.getRandomFromArray(['customer experience', 'team dynamics', 'innovation process', 'company culture']))
      .replace('{industry}', this.getRandomFromArray(['customer engagement', 'team collaboration', 'product development', 'market research']))
      .replace('{field}', this.getRandomFromArray(['the way we work', 'business relationships', 'customer experience', 'team productivity']))
      .replace('{market}', this.getRandomFromArray(['B2B SaaS', 'digital transformation', 'customer success', 'e-commerce']))
      .replace('{value}', this.getRandomFromArray(['creativity', 'innovation', 'authenticity', 'collaboration', 'diversity']))
      .replace('{achievement}', this.getRandomFromArray(['increased productivity by 300%', 'solved our biggest challenge', 'created breakthrough innovation', 'exceeded all targets']))
      .replace('{green_initiative}', this.getRandomFromArray(['our company is going carbon neutral', 'we\'re implementing sustainable practices', 'we\'re partnering with eco-friendly suppliers', 'we\'re reducing our environmental footprint']))
      .replace('{controversial_take}', this.getRandomFromArray(['Remote work is killing creativity', 'AI will replace most managers', 'Networking events are overrated', 'Work-life balance is a myth']))
      .replace('{research}', this.getRandomFromArray(['analyzing 1000+ companies', 'interviewing 50 CEOs', 'studying market trends for 5 years', 'testing 100 different strategies']))
      .replace('{prediction}', this.getRandomFromArray(['human connection will become the most valuable skill', 'traditional hierarchies will disappear', 'emotional intelligence will beat technical skills', 'micro-learning will replace formal education']))
      .replace('{solution}', this.getRandomFromArray(['building resilient teams', 'creating adaptive organizations', 'fostering innovation culture', 'developing future leaders']))
      .replace('{topic}', this.getRandomFromArray(['workplace culture', 'leadership development', 'digital transformation', 'customer experience']))
      .replace('{timeframe}', this.getRandomFromArray(['10 years', '5 years', 'my entire career', 'the past decade']))
      .replace('{insight}', this.getRandomFromArray(['It\'s not about the technology, it\'s about the people', 'Culture beats strategy every time', 'Small actions create big changes', 'Listening is more important than talking']));

    return {
      content,
      scenario,
      type
    };
  }

  private getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  async analyzePost(text: string): Promise<AnalysisResult> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Advanced analysis based on multiple factors
    const detectedBuzzwords = this.buzzwords.filter(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );

    const exclamationCount = (text.match(/!/g) || []).length;
    const emojiCount = (text.match(/[\u{1F600}-\u{1F6FF}]/gu) || []).length;
    const hashtagCount = (text.match(/#\w+/g) || []).length;
    const capsCount = (text.match(/[A-Z]{2,}/g) || []).length;
    const questionCount = (text.match(/\?/g) || []).length;

    // Calculate corporate BS percentage using multiple factors
    let percentage = 10; // Base score
    
    percentage += detectedBuzzwords.length * 12; // Heavy penalty for buzzwords
    percentage += exclamationCount * 4;
    percentage += emojiCount * 3;
    percentage += hashtagCount * 6;
    percentage += capsCount * 8;
    percentage += questionCount * 2;
    
    // Check for typical LinkedIn patterns
    if (text.toLowerCase().includes('thrilled to announce')) percentage += 15;
    if (text.toLowerCase().includes('humbled')) percentage += 12;
    if (text.toLowerCase().includes('blessed')) percentage += 10;
    if (text.toLowerCase().includes('journey')) percentage += 8;
    if (text.toLowerCase().includes('game changer')) percentage += 15;
    if (text.toLowerCase().includes('thought leader')) percentage += 12;
    
    // Story patterns
    if (text.includes('Yesterday') || text.includes('True story')) percentage += 10;
    if (text.toLowerCase().includes('plot twist')) percentage += 15;
    if (text.match(/\d+-year-old/)) percentage += 8; // Age mentions
    
    // Cap at realistic range
    percentage = Math.min(96, Math.max(8, percentage));

    // Determine authenticity level
    let authenticity: 'low' | 'medium' | 'high' = 'medium';
    if (percentage > 70) authenticity = 'low';
    else if (percentage < 30) authenticity = 'high';

    // Calculate sentiment score (0-100, higher = more artificial positivity)
    const positiveWords = ['amazing', 'incredible', 'fantastic', 'revolutionary', 'game-changing', 'blessed', 'grateful'];
    const sentimentScore = Math.min(100, positiveWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length * 15 + exclamationCount * 5);

    // Generate human rewrite with advanced replacements
    const humanRewrite = this.generateHumanRewrite(text);

    // Generate AI insights
    const aiInsights = this.generateAIInsights(text, percentage, detectedBuzzwords);

    // Generate honest comment
    const honestComment = this.generateHonestComment(percentage, detectedBuzzwords, authenticity);

    // Generate drama mode
    const dramaMode = this.generateDramaMode(text);

    return {
      percentage: Math.round(percentage),
      humanRewrite,
      honestComment,
      dramaMode,
      aiInsights,
      corporateBuzzwords: detectedBuzzwords,
      authenticity,
      sentimentScore: Math.round(sentimentScore)
    };
  }

  private generateHumanRewrite(text: string): string {
    const replacements = {
      "I'm thrilled to announce": "I wanted to share",
      "I'm excited to share": "I wanted to mention",
      "I'm humbled": "I'm surprised",
      "I'm blessed": "I'm lucky",
      "thrilled": "happy",
      "blessed": "lucky",
      "humbled": "surprised",
      "journey": "experience",
      "passionate": "interested",
      "leverage": "use",
      "synergy": "teamwork",
      "disrupt": "change",
      "paradigm": "approach",
      "innovative": "new",
      "game-changer": "helpful",
      "revolutionary": "different",
      "exponential": "significant",
      "ecosystem": "environment",
      "thought leader": "person with opinions",
      "rockstar": "good employee",
      "ninja": "skilled person",
      "guru": "expert"
    };

    let rewritten = text;
    
    // Apply replacements
    Object.entries(replacements).forEach(([corporate, human]) => {
      const regex = new RegExp(corporate, 'gi');
      rewritten = rewritten.replace(regex, human);
    });

    // Reduce excessive punctuation
    rewritten = rewritten.replace(/!+/g, '.');
    rewritten = rewritten.replace(/\?+/g, '?');
    
    // Remove excessive emojis (keep max 1 per sentence)
    const sentences = rewritten.split(/[.!?]+/);
    rewritten = sentences.map(sentence => {
      const emojis = sentence.match(/[\u{1F600}-\u{1F6FF}]/gu) || [];
      if (emojis.length > 1) {
        return sentence.replace(/[\u{1F600}-\u{1F6FF}]/gu, '').trim() + (emojis[0] || '');
      }
      return sentence;
    }).join('. ');

    // Clean up spacing
    rewritten = rewritten.replace(/\s+/g, ' ').trim();
    
    return rewritten;
  }

  private generateAIInsights(text: string, percentage: number, buzzwords: string[]): string[] {
    const insights = [];

    if (buzzwords.length > 3) {
      insights.push(`Detected ${buzzwords.length} corporate buzzwords - consider more specific language`);
    }

    if (text.includes('!')) {
      const count = (text.match(/!/g) || []).length;
      insights.push(`${count} exclamation marks detected - tone down the artificial enthusiasm`);
    }

    if (percentage > 80) {
      insights.push('This post ranks in the top 10% of corporate BS - might want to dial it back');
    } else if (percentage < 25) {
      insights.push('Refreshingly authentic content - keep this natural tone');
    }

    const patterns = [
      { pattern: /yesterday.*taught me/i, message: 'Classic "profound moment" story structure detected' },
      { pattern: /\d+-year-old.*said/i, message: 'Using child wisdom for credibility - very LinkedIn' },
      { pattern: /plot twist/i, message: 'Plot twist narrative device - trying too hard for engagement' },
      { pattern: /true story/i, message: 'Having to say "true story" makes it sound less true' },
      { pattern: /agree\?/i, message: 'Fishing for engagement with "Agree?" - classic LinkedIn move' }
    ];

    patterns.forEach(({ pattern, message }) => {
      if (pattern.test(text)) {
        insights.push(message);
      }
    });

    return insights.slice(0, 3); // Limit to 3 insights
  }

  private generateHonestComment(percentage: number, buzzwords: string[], authenticity: 'low' | 'medium' | 'high'): string {
    const honestComments = {
      high: [
        "Actually sounds like a real human wrote this. Rare on LinkedIn.",
        "Refreshingly authentic. Did you forget you were on LinkedIn?",
        "Wait, genuine content? Are you sure you're using LinkedIn correctly?"
      ],
      medium: [
        "Could go either way. Teetering on the edge of LinkedIn cringe.",
        "Not terrible, but I can smell the corporate handbook from here.",
        "Moderately authentic with hints of professional posturing."
      ],
      low: [
        "Peak LinkedIn energy. My secondhand embarrassment meter is off the charts.",
        "This reads like it was written by a motivational poster that gained consciousness.",
        "I can practically hear the elevator music while reading this.",
        "Sir/Madam, this is a professional network, not a creative writing class.",
        "The corporate buzzword bingo card is completely filled.",
        "This post gave me corporate PTSD and I don't even work in an office.",
        "Did ChatGPT write this after being trained exclusively on LinkedIn posts?",
        "I think I just witnessed the birth of a new thought leader. Congratulations, I guess."
      ]
    };

    const categoryComments = honestComments[authenticity];
    return categoryComments[Math.floor(Math.random() * categoryComments.length)];
  }

  private generateDramaMode(text: string): string {
    let dramatic = text
      .replace(/I/g, "I, THE CHOSEN ONE,")
      .replace(/\bwe\b/gi, "WE, THE LEGENDARY SQUAD,")
      .replace(/\bmy\b/gi, "MY ABSOLUTELY PHENOMENAL")
      .replace(/learned/gi, "DISCOVERED THROUGH EARTH-SHATTERING REVELATION")
      .replace(/important/gi, "MIND-BLOWINGLY LIFE-CHANGING")
      .replace(/team/gi, "SQUAD OF ABSOLUTE LEGENDS AND VISIONARIES")
      .replace(/success/gi, "UNPRECEDENTED WORLD-DOMINATING SUCCESS")
      .replace(/\./g, "!!!")
      .replace(/!/g, "!!!")
      .toUpperCase();

    // Add some extra drama
    dramatic = "🔥🔥🔥 " + dramatic + " 🔥🔥🔥";
    
    return dramatic;
  }
}

export const aiService = new AIContentService();