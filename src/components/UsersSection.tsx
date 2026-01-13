import { motion } from "framer-motion";
import { GraduationCap, Code, Users, Building } from "lucide-react";

const users = [
  {
    icon: GraduationCap,
    title: "Students",
    emoji: "🎓",
    description: "From bootcamp beginners to CS majors, we help students navigate the emotional rollercoaster of learning to code.",
    stats: "45% of our users",
    color: "pink",
  },
  {
    icon: Code,
    title: "Self-Taught Developers",
    emoji: "💻",
    description: "Learning alone is tough. We provide the emotional support and guidance you need when there's no teacher around.",
    stats: "30% of our users",
    color: "lavender",
  },
  {
    icon: Users,
    title: "Coding Instructors",
    emoji: "👨‍🏫",
    description: "Understand your students' struggles in real-time. Identify who needs help before they even ask.",
    stats: "15% of our users",
    color: "mint",
  },
  {
    icon: Building,
    title: "Developer Teams",
    emoji: "🏢",
    description: "Prevent burnout and improve team wellbeing. Happy developers write better code.",
    stats: "10% of our users",
    color: "sky",
  },
];

const colorMap = {
  pink: "card-pink",
  lavender: "card-lavender",
  mint: "card-mint",
  sky: "card-sky",
};

const iconColorMap = {
  pink: "bg-pastel-pink/40 text-pink-600",
  lavender: "bg-pastel-lavender/40 text-purple-600",
  mint: "bg-pastel-mint/40 text-emerald-600",
  sky: "bg-pastel-sky/40 text-blue-600",
};

const UsersSection = () => {
  return (
    <section className="py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-extrabold gradient-text mb-4">
          Who Uses EmotionAI? 🌈
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From first-time coders to seasoned professionals, we're here to support 
          everyone on their coding journey.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {users.map((user, index) => (
          <motion.div
            key={user.title}
            className={`${colorMap[user.color as keyof typeof colorMap]} rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="flex items-start gap-5">
              <motion.div
                className={`w-16 h-16 rounded-2xl ${iconColorMap[user.color as keyof typeof iconColorMap]} flex items-center justify-center flex-shrink-0`}
                whileHover={{ rotate: 10 }}
              >
                <span className="text-3xl">{user.emoji}</span>
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {user.title}
                  </h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/50 text-muted-foreground">
                    {user.stats}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {user.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UsersSection;
