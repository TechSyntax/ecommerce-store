import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-products.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/98 to-secondary/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-secondary/30 z-10" />
        <img
          src={heroImage}
          alt="Premium products"
          className="absolute right-0 top-0 h-full w-3/4 object-cover opacity-50"
        />
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[80px] z-0" />
      </div>

      <div className="container relative z-20 py-20 lg:py-0">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">New Season Collection — Up to 50% Off</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl text-secondary-foreground leading-[1.05] mb-6"
          >
            Everything You Want.{' '}
            <span className="text-gradient">Delivered Smarter.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg lg:text-xl text-secondary-foreground/60 mb-10 max-w-lg leading-relaxed"
          >
            Discover premium products across fashion, tech, lifestyle, home, and more.
            Curated for you. Delivered with care.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-heading font-semibold text-base hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products?badge=deal"
              className="inline-flex items-center gap-2 px-8 py-4 border border-secondary-foreground/20 text-secondary-foreground rounded-2xl font-heading font-semibold text-base hover:bg-secondary-foreground/5 hover:border-secondary-foreground/30 transition-all duration-300"
            >
              <TrendingUp className="w-4 h-4" />
              Explore Deals
            </Link>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-secondary-foreground/10"
          >
            {[
              { icon: Truck, text: 'Free Shipping on ₹999+' },
              { icon: ShieldCheck, text: 'Secure Payments' },
              { icon: RotateCcw, text: '30-Day Returns' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-secondary-foreground/50">
                <item.icon className="w-4 h-4 text-primary/70" />
                <span className="text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex gap-8 mt-8"
          >
            {[
              { value: '50K+', label: 'Products' },
              { value: '2M+', label: 'Happy Customers' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading font-bold text-2xl lg:text-3xl text-secondary-foreground">{stat.value}</p>
                <p className="text-xs text-secondary-foreground/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
