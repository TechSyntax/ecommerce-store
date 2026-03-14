import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { products, formatPrice } from '@/data/products';

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 lg:pt-36 pb-16">
        <div className="container">
          <h1 className="font-heading font-bold text-2xl lg:text-3xl mb-2">My Wishlist</h1>
          <p className="text-muted-foreground text-sm mb-8">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}</p>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
              <h2 className="font-heading font-semibold text-xl mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Save items you love to buy later.</p>
              <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {wishlistProducts.map(product => (
                <div key={product.id} className="bg-card rounded-3xl overflow-hidden surface-elevated">
                  <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-medium line-clamp-2 mt-0.5 hover:text-primary transition-colors">{product.title}</h3>
                    </Link>
                    <p className="font-mono font-bold mt-2">{formatPrice(product.price)}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2.5 rounded-xl border border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
