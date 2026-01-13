import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16">
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background */}
        <div className="absolute inset-0 pastel-gradient opacity-90" />
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-4 left-8 w-8 h-8 rounded-full bg-white/30"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-8 right-12 w-6 h-6 rounded-full bg-white/30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-white/20"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative px-8 py-16 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            Start Your Journey Today
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 max-w-2xl mx-auto">
            Ready to Transform Your Learning Experience? 🌟
          </h2>
          
          <p className="text-lg text-white/90 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of learners who've discovered the power of emotion-aware coding. 
            It's free to start, and the benefits last a lifetime.
          </p>

          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-foreground font-display font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
