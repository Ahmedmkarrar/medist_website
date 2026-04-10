import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 20,  suffix: '+', label: 'Years of Experience',   desc: 'Serving the region since 2004' },
  { value: 500, suffix: '+', label: 'Products Sourced',      desc: 'Across 7 industry verticals' },
  { value: 50,  suffix: '+', label: 'Global Suppliers',      desc: 'Europe, Asia & the Americas' },
  { value: 30,  suffix: '+', label: 'Countries Served',      desc: 'Middle East, Africa & beyond' },
];

function useCounter(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, desc, delay }: typeof stats[0] & { delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCounter(value, 1600, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center justify-center py-10 px-6 text-center"
    >
      <span className="text-5xl lg:text-6xl font-bold text-[#0A8C7A] mb-1 tabular-nums leading-none">
        {count}{suffix}
      </span>
      <span className="text-sm font-bold text-[#0D1F3C] mt-2 mb-1">{label}</span>
      <span className="text-xs text-[#8A9BB0]">{desc}</span>
    </motion.div>
  );
}

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100" aria-label="Key statistics">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </dl>
      </div>
    </section>
  );
}
