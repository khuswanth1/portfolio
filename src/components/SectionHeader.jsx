import { motion } from 'framer-motion'

export default function SectionHeader({ tag, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-10 md:mb-16 w-full flex flex-col ${align === 'center' ? 'text-center items-center' : 'text-left items-start'}`}
    >
      {tag && (
        <span className="inline-block font-mono text-[10px] sm:text-xs text-primary/70 tracking-[0.3em] uppercase mb-3 sm:mb-4 border border-primary/20 bg-primary/5 px-3 py-1 rounded-sm">
          {tag}
        </span>
      )}
      <h2 className="section-title text-white mb-3 sm:mb-4 w-full">
        {title.split(' ').map((word, i) => (
          <span key={i}>
            {i % 2 === 1 ? <span className="gradient-text">{word}</span> : word}{' '}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className={`text-white/50 font-body text-sm sm:text-base max-w-xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 sm:mt-6 flex gap-2 items-center ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <motion.div 
          initial={{ width: 0 }} 
          whileInView={{ width: '3rem' }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-0.5 bg-primary rounded-full" 
          style={{ boxShadow: '0 0 8px #00d4ff' }} 
        />
        <motion.div 
          initial={{ width: 0 }} 
          whileInView={{ width: '1.5rem' }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-0.5 bg-secondary rounded-full" 
        />
        <motion.div 
          initial={{ width: 0, opacity: 0 }} 
          whileInView={{ width: '0.75rem', opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.4 }}
          className="h-0.5 bg-accent rounded-full" 
        />
      </div>
    </motion.div>
  )
}
