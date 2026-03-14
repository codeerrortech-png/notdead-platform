import { motion } from 'framer-motion'
import BounceHeading from './BounceHeading'
import BounceSubheading from './BounceSubheading'

export default function SectionTitle({ title, subtitle, accent = true, titleClassName, subtitleClassName, highlightBox = false, scrollTrigger = false }) {
  const content = (
    <>
      <BounceHeading
        as="h2"
        variant="physics"
        scrollTrigger={scrollTrigger}
        className={`font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-2 ${
          titleClassName ?? (accent ? 'text-cyber-accent' : 'text-white')
        }`}
      >
        {title}
      </BounceHeading>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="origin-left h-0.5 w-16 sm:w-20 bg-gradient-to-r from-cyber-accent to-transparent rounded-full mb-4"
      />
      {subtitle && (
        <BounceSubheading
          as="p"
          scrollTrigger={scrollTrigger}
          className={`text-sm sm:text-base max-w-2xl ${subtitleClassName ?? 'text-slate-300'}`}
        >
          {subtitle}
        </BounceSubheading>
      )}
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0.7, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-8 sm:mb-10 lg:mb-12 ${highlightBox ? 'section-title-highlight inline-block' : ''}`}
    >
      {content}
    </motion.div>
  )
}
