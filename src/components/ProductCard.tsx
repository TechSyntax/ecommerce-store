import { useState } from 'react';
import { Heart, ShoppingBag, Star, Zap, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const badgeColors = {
    bestseller: 'bg-primary text-primary-foreground',
    new: 'bg-secondary text-secondary-foreground',
    deal: 'bg-success text-success-foreground',
    limited: 'bg-destructive text-destructive-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-card rounded-3xl overflow-hidden surface-elevated hover:surface-premium transition-shadow duration-300"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={hovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />

        {/* Top overlay row */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          {/* Left: badges stacked */}
          <div className="flex flex-col gap-1.5">
            {product.badge && (
              <span className={`pointer-events-auto px-2.5 py-1 rounded-full text-xs font-semibold ${badgeColors[product.badge]} shadow-sm`}>
                {product.badge === 'bestseller' ? '🔥 Bestseller' :
                 product.badge === 'new' ? '✨ New' :
                 product.badge === 'deal' ? '⚡ Deal' : '🔒 Limited'}
              </span>
            )}
            {product.discount > 0 && (
              <span className="pointer-events-auto bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold font-mono shadow-sm w-fit">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Right: wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              isWishlisted ? 'bg-destructive/10 text-destructive' : 'bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick actions */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-secondary/95 backdrop-blur-sm text-secondary-foreground rounded-xl text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2.5 bg-secondary/95 backdrop-blur-sm text-secondary-foreground rounded-xl hover:bg-secondary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-medium mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium leading-snug line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5 bg-success/10 text-success px-1.5 py-0.5 rounded-md">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-semibold">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-mono font-bold text-base">{formatPrice(product.price)}</span>
          {product.mrp > product.price && (
            <span className="font-mono text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>

        {/* Delivery */}
        {product.fastDelivery && (
          <div className="flex items-center gap-1 mt-2 text-primary">
            <Zap className="w-3 h-3" />
            <span className="text-xs font-medium">Express Delivery</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
