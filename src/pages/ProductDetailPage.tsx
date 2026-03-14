import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Zap, Truck, Shield, RotateCcw, Share2, Minus, Plus, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products, formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 text-center">
          <h1 className="font-heading font-bold text-2xl">Product not found</h1>
          <Link to="/products" className="text-primary mt-4 inline-block">Browse products</Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 lg:pt-36 pb-16">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-4xl overflow-hidden bg-card surface-elevated">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground">
                  {product.badge === 'bestseller' ? '🔥 Bestseller' : product.badge === 'new' ? '✨ New' : product.badge === 'deal' ? '⚡ Deal' : '🔒 Limited'}
                </span>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <p className="text-sm text-muted-foreground font-medium mb-1">{product.brand}</p>
              <h1 className="font-heading font-bold text-2xl lg:text-3xl mb-3">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono font-bold text-3xl">{formatPrice(product.price)}</span>
                {product.mrp > product.price && (
                  <>
                    <span className="font-mono text-lg text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-sm font-bold">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-medium mb-2">Color: <span className="text-muted-foreground">{selectedColor}</span></p>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedColor === color
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/30'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-medium mb-2">Size: <span className="text-muted-foreground">{selectedSize}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Quantity</p>
                <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-heading font-semibold transition-all ${
                    addedToCart
                      ? 'bg-success text-success-foreground'
                      : 'bg-primary text-primary-foreground hover:opacity-90'
                  }`}
                >
                  {addedToCart ? (
                    <><Check className="w-5 h-5" /> Added!</>
                  ) : (
                    <><ShoppingBag className="w-5 h-5" /> Add to Cart</>
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 flex items-center justify-center rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'border-destructive/30 bg-destructive/5 text-destructive'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="w-14 flex items-center justify-center rounded-2xl border border-border hover:border-primary/30 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery info */}
              <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                {product.fastDelivery && (
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm"><span className="font-medium">Express Delivery</span> — Get it by tomorrow</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">30-day easy returns & exchange</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">100% authentic product guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-1 border-b border-border mb-8">
              {(['description', 'specs', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                <h3 className="font-heading font-semibold mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <div className="space-y-0 rounded-2xl border border-border overflow-hidden">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div key={key} className={`flex ${i > 0 ? 'border-t border-border' : ''}`}>
                      <span className="w-40 shrink-0 px-4 py-3 bg-muted/30 text-sm font-medium">{key}</span>
                      <span className="px-4 py-3 text-sm text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="font-heading font-bold text-4xl">{product.rating}</p>
                    <div className="flex items-center gap-0.5 my-1 justify-center">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'text-primary fill-current' : 'text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map(star => {
                      const pct = star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 3 : 1;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs w-8">{star}★</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center py-8 bg-muted/30 rounded-2xl">
                  Sign in to write a review
                </p>
              </div>
            )}
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-heading font-bold text-2xl mb-6">You might also like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
