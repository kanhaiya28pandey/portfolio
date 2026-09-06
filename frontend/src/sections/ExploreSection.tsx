import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Sparkles, Layers } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { fadeInUp, staggerContainer } from '../styles/animations';

const CORE_VALUES = [
  {
    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    title: 'Data Structures & Algorithms',
    description:
      'Solving coding problems with good logic, fast code, and optimal memory usage.',
  },
  {
    icon: <Code className="w-6 h-6 text-blue-400" />,
    title: 'Full-Stack Web Development',
    description:
      'Building complete web apps from user-friendly frontends to reliable backend APIs.',
  },
  {
    icon: <Database className="w-6 h-6 text-purple-400" />,
    title: 'Database Management',
    description:
      'Designing clean databases in MySQL, PostgreSQL, and MongoDB to store and fetch data securely and quickly.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
    title: 'Applied AI & Machine Learning',
    description:
      'Creating smart features like resume matching using Python, machine learning models, and modern AI.',
  },
  {
    icon: <Layers className="w-6 h-6 text-pink-400" />,
    title: 'Clean & Organized Code',
    description:
      'Writing clean, readable, and well-structured code that is easy to understand, test, and scale for real-world projects.',
  },
];

export const ExploreSection: React.FC = () => {
  return (
    <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-white dark:to-slate-300 light:from-slate-900 light:to-slate-700 bg-clip-text text-transparent">
              Explore A Developer's Universe
            </span>
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 light:text-slate-600">
            A solid foundation in problem solving, web development, databases, and applied intelligent systems.
          </p>
        </div>

        {/* Value Cards Grid (3 cards top row, 2 cards bottom row - perfectly balanced) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
        >
          {CORE_VALUES.map((val, idx) => {
            const colSpan =
              idx < 3
                ? 'lg:col-span-2 md:col-span-1'
                : idx === 4
                ? 'lg:col-span-3 md:col-span-2'
                : 'lg:col-span-3 md:col-span-1';

            return (
              <motion.div key={idx} variants={fadeInUp} className={colSpan}>
                <GlassCard
                  variant="interactive"
                  className="h-full flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      {val.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {val.title}
                    </h3>
                    <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
