import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const FeaturedProducts = () => {
  const bestsellers = products.filter(p => p.badge === 'bestseller').slice(0, 4);
  const deals = products.filter(p => p.discount >= 30).slice(0, 4);

  return (
    <>
      {/* Bestsellers */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl">Bestsellers</h2>
            <p className="text-muted-foreground text-sm mt-1">The products everyone is loving</p>
          </div>
          <Link to="/products?sort=popular" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Flash Deals Banner */}
      <section className="container pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-secondary p-8 lg:p-12 noise-overlay"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Flash Sale • Ends Tonight</span>
              </div>
              <h3 className="font-heading font-bold text-3xl lg:text-4xl text-secondary-foreground mb-2">
                Up to <span className="text-gradient">50% Off</span>
              </h3>
              <p className="text-secondary-foreground/60 max-w-md">
                Limited-time deals on top brands. Don't miss out on massive savings.
              </p>
            </div>
            <Link
              to="/products?sort=discount"
              className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded-2xl font-heading font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Shop Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        </motion.div>
      </section>

      {/* Hot Deals */}
      <section className="container pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl">🔥 Hot Deals</h2>
            <p className="text-muted-foreground text-sm mt-1">Biggest savings of the season</p>
          </div>
          <Link to="/products?sort=discount" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {deals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
