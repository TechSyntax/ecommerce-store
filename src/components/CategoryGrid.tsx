import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

const CategoryGrid = () => {
  return (
    <section className="container py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-heading font-bold text-2xl lg:text-3xl">Shop by Category</h2>
          <p className="text-muted-foreground text-sm mt-1">Browse our curated collections</p>
        </div>
        <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/products?category=${cat.id}`}
              className={`group block p-6 rounded-3xl bg-gradient-to-br ${cat.color} border border-border/50 hover:border-primary/20 transition-all hover:surface-elevated`}
            >
              <span className="text-4xl mb-3 block">{cat.icon}</span>
              <h3 className="font-heading font-semibold text-base mb-0.5">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.productCount.toLocaleString()} products</p>
              <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
