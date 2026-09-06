import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Laptop, Rocket, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { FuturisticButton } from '../components/common/FuturisticButton';
import { NeonBadge } from '../components/common/NeonBadge';
import { fadeInUp, staggerContainer } from '../styles/animations';

const OPPORTUNITIES = [
  {
    icon: <Briefcase className="w-6 h-6 text-blue-400" />,
    title: 'Full-Time Software Engineer',
    description: 'Looking to join forward-thinking engineering teams to design scalable backend architectures and impactful web applications.',
    tag: 'Full-Time',
  },
  {
    icon: <Laptop className="w-6 h-6 text-purple-400" />,
    title: 'Software Developer Internships',
    description: 'Eager to contribute high-energy problem solving, clean code, and fast learning to product teams.',
    tag: 'Internship',
  },
  {
    icon: <Rocket className="w-6 h-6 text-cyan-400" />,
    title: 'Freelance & System Design',
    description: 'Available for bespoke full-stack applications, REST API development, and PostgreSQL database modeling.',
    tag: 'Contract',
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: 'Open Source & Collaborations',
    description: 'Passionate about teaming up with fellow developers on ambitious open source initiatives.',
    tag: 'Collaborate',
  },
];

export const WorkWithMeSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div>
            <NeonBadge variant="green" size="sm">
              Let's Build Together
            </NeonBadge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-white dark:to-slate-300 light:from-slate-900 light:to-slate-700 bg-clip-text text-transparent">
              Open to Opportunities
            </span>
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 light:text-slate-600">
            Whether you are a recruiter, hiring manager, startup founder, or fellow engineer—let's create impactful solutions together.
          </p>
        </div>

        {/* Opportunity Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {OPPORTUNITIES.map((opp, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <GlassCard
                variant="interactive"
                className="h-full flex flex-col justify-between p-6 space-y-4 text-left"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-200/80 border border-white/10 light:border-slate-300 flex items-center justify-center">
                    {opp.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    [{opp.tag}]
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Global CTA Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <FuturisticButton
            size="lg"
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={scrollToContact}
          >
            Hire Me / Start a Conversation
          </FuturisticButton>
        </div>
      </div>
    </section>
  );
};
