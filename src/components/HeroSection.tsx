import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-products.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-transparent z-10" />
        <img
          src={heroImage}
          alt="Premium products"
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-60"
        />
      </div>

      <div className="container relative z-20 py-20 lg:py-0">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">New Season Collection — Up to 50% Off</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-secondary-foreground leading-[1.1] mb-5"
          >
            Everything You Want.{' '}
            <span className="text-gradient">Delivered Smarter.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-secondary-foreground/60 mb-8 max-w-lg leading-relaxed"
          >
            Discover premium products across fashion, tech, lifestyle, home, and more.
            Curated for you. Delivered with care.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded-2xl font-heading font-semibold hover:opacity-90 transition-opacity"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products?badge=deal"
              className="inline-flex items-center gap-2 px-7 py-4 border border-secondary-foreground/20 text-secondary-foreground rounded-2xl font-heading font-semibold hover:bg-secondary-foreground/5 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Explore Deals
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-8 mt-12 pt-8 border-t border-secondary-foreground/10"
          >
            {[
              { value: '50K+', label: 'Products' },
              { value: '2M+', label: 'Happy Customers' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading font-bold text-2xl text-secondary-foreground">{stat.value}</p>
                <p className="text-xs text-secondary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
