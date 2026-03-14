import { Link } from 'react-router-dom';
import { Truck, Shield, RotateCcw, Headphones, CheckCircle, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const trustFeatures = [
  { icon: Truck, label: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: Shield, label: 'Secure Payments', desc: '256-bit SSL encryption' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '30-day return policy' },
  { icon: Headphones, label: '24/7 Support', desc: 'Always here to help' },
  { icon: CheckCircle, label: '100% Genuine', desc: 'Authentic products only' },
];

const footerLinks = {
  'Shop': ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Accessories', 'Gaming', 'Books'],
  'Help': ['Track Order', 'Returns & Refunds', 'Shipping Info', 'Size Guide', 'FAQs', 'Contact Us'],
  'Company': ['About Us', 'Careers', 'Press', 'Blog', 'Affiliate Program', 'Sustainability'],
  'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
};

const Footer = () => {
  return (
    <footer>
      {/* Trust Bar */}
      <div className="border-t border-border bg-card">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {trustFeatures.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-secondary noise-overlay">
        <div className="container py-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading font-bold text-2xl text-secondary-foreground mb-2">
              Stay in the loop
            </h3>
            <p className="text-secondary-foreground/60 text-sm mb-6">
              Get exclusive deals, new arrivals, and curated picks delivered to your inbox.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-2xl bg-surface-muted text-secondary-foreground placeholder:text-secondary-foreground/40 border border-secondary-foreground/10 outline-none focus:border-primary transition-colors text-sm"
              />
              <button
                type="button"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-secondary border-t border-secondary-foreground/10">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-sm">LX</span>
                </div>
                <span className="font-heading font-bold text-lg text-secondary-foreground">LUXEMART</span>
              </div>
              <p className="text-sm text-secondary-foreground/50 mb-4 leading-relaxed">
                Premium commerce for the modern consumer. Discover, shop, and experience the best.
              </p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-surface-muted flex items-center justify-center text-secondary-foreground/50 hover:text-primary hover:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-heading font-semibold text-sm text-secondary-foreground mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-sm text-secondary-foreground/50 hover:text-primary transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/10">
          <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-secondary-foreground/40">
              © 2026 LuxeMart. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-secondary-foreground/40">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
