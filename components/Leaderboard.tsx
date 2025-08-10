import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  percentage: number;
  preview: string;
  engagement: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "S████ M██████",
    percentage: 97,
    preview: "Yesterday I helped an elderly woman cross the street and it reminded me of the importance of...",
    engagement: "2.3K reactions"
  },
  {
    rank: 2,
    username: "J███ D██",
    percentage: 94,
    preview: "I was rejected from 100 jobs, but the 101st one taught me that persistence is the key to...",
    engagement: "1.8K reactions"
  },
  {
    rank: 3,
    username: "M████ R████",
    percentage: 92,
    preview: "My 5-year-old asked me what leadership means, and I realized that true leaders are those who...",
    engagement: "3.1K reactions"
  },
  {
    rank: 4,
    username: "A██ P████",
    percentage: 89,
    preview: "I once worked with a janitor who showed me more about business strategy than any MBA could...",
    engagement: "987 reactions"
  },
  {
    rank: 5,
    username: "L██ C██████",
    percentage: 87,
    preview: "During my morning coffee, I had an epiphany about synergy that completely transformed my...",
    engagement: "1.2K reactions"
  }
];

export function Leaderboard() {
  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "💀";
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-500";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3: return "bg-gradient-to-r from-amber-600 to-amber-700";
      default: return "bg-gradient-to-r from-gray-200 to-gray-300";
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Hall of Fame 🏆
          </h2>
          <p className="text-xl text-gray-600">
            This week's most hilariously hollow posts
          </p>
        </motion.div>

        <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-bold text-gray-700 pb-4 border-b-2 border-gray-200">
              <div className="md:col-span-1 text-center">Rank</div>
              <div className="md:col-span-3">User</div>
              <div className="md:col-span-2 text-center">Cringe %</div>
              <div className="md:col-span-4">Post Preview</div>
              <div className="md:col-span-2 text-center">Engagement</div>
            </div>

            {mockLeaderboard.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="md:col-span-1 text-center">
                  <div className={`w-8 h-8 rounded-full ${getRankColor(entry.rank)} flex items-center justify-center text-white font-bold mx-auto`}>
                    {getRankEmoji(entry.rank)}
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="font-medium text-gray-800">
                    {entry.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    Thought Leader • 3rd+
                  </div>
                </div>

                <div className="md:col-span-2 text-center">
                  <Badge 
                    variant="destructive" 
                    className="text-lg font-bold bg-danger-red hover:bg-danger-red"
                  >
                    {entry.percentage}%
                  </Badge>
                </div>

                <div className="md:col-span-4">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    "{entry.preview}..."
                  </p>
                </div>

                <div className="md:col-span-2 text-center">
                  <span className="text-sm font-medium text-gray-500">
                    {entry.engagement}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              * Usernames have been censored to protect the chronically inspirational
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}