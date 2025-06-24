import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Flame, Trophy, TrendingUp, Target, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  course: string;
}

export const DashboardPage = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const todayTasks: Task[] = [
    { id: "1", title: "Complete React Hooks chapter", completed: false, course: "React Mastery" },
    { id: "2", title: "Practice JavaScript algorithms", completed: true, course: "JS Fundamentals" },
    { id: "3", title: "Review CSS Grid layout", completed: false, course: "CSS Advanced" },
  ];

  const getTaskIcon = (completed: boolean) => {
    return completed ? "🏆" : "🎯";
  };

  const getTaskDifficulty = (title: string) => {
    if (title.includes("Advanced") || title.includes("algorithms")) return "🔥🔥🔥";
    if (title.includes("Complete") || title.includes("chapter")) return "🔥🔥";
    return "🔥";
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-purple-500/20 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 animate-pulse" />
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-normal pb-1"
          >
            Ready to Level Up, Alex? 🚀
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground mb-4 leading-relaxed"
          >
            Time to earn some wins and unlock new achievements
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-purple-200">Level 12 Scholar</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-400/30">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-cyan-200">7 Day Streak</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "XP Today", value: "3.5h", change: "+0.5h", icon: Zap, color: "from-yellow-500 to-orange-500" },
          { label: "Weekly Score", value: "18h", change: "+2h", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
          { label: "Fire Streak", value: "7", change: "+1", icon: Flame, color: "from-orange-500 to-red-500" },
          { label: "Achievements", value: "12", change: "+1", icon: Trophy, color: "from-purple-500 to-pink-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onHoverStart={() => setHoveredCard(stat.label)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative group cursor-pointer"
          >
            <div className="p-6 rounded-2xl bg-card backdrop-blur-xl border border-border shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <div className="p-6 rounded-3xl bg-card backdrop-blur-xl border border-border shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Today's Quests</h2>
            <div className="ml-auto px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
              <span className="text-xs text-blue-600">{todayTasks.filter(t => !t.completed).length} remaining</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {todayTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`group relative p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                  task.completed 
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-300/50' 
                    : 'bg-muted/60 border border-border hover:border-purple-400/60 hover:bg-muted/80'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                      task.completed ? 'bg-green-500/20' : 'bg-purple-500/20'
                    }`}>
                      {getTaskIcon(task.completed)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </p>
                        <span className="text-xs">{getTaskDifficulty(task.title)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.course}</p>
                      {!task.completed && (
                        <div className="mt-2 w-full bg-muted rounded-full h-1">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-1/3"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.completed ? (
                      <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-400/30">
                        <span className="text-xs text-green-600 font-medium">+50 XP</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                        <span className="text-xs text-purple-600">50 XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden p-6 rounded-3xl bg-card backdrop-blur-xl border border-border shadow-2xl hover:border-green-400/60 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
              <Play className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Continue Your Journey</h2>
          </div>
          
          <div className="flex items-center gap-6 p-4 bg-muted/80 rounded-2xl border border-border group-hover:border-green-400/50 transition-all duration-300">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=60&fit=crop"
                alt="Course thumbnail"
                className="w-20 h-14 rounded-xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white ml-0.5" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Advanced React Patterns</h3>
              <p className="text-sm text-muted-foreground mb-3">Chapter 3: Custom Hooks</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-green-600 font-medium">65% • 2h 15m left</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-[65%]"></div>
                </div>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl px-6 py-3 font-medium shadow-lg transition-all duration-300">
              Resume
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};