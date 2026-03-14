import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, MapPin, ChevronDown, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { products } from '@/data/products';
import { categories } from '@/data/products';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlist, cartCount, setCartOpen } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const suggestions = searchQuery.length > 1
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
        {/* Top bar */}
        <div className="hidden lg:block border-b border-border/50">
          <div className="container flex items-center justify-between py-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Deliver to Mumbai 400001</span>
              <span>|</span>
              <span>Free shipping on orders above ₹999</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/account/orders" className="hover:text-foreground transition-colors">Track Order</Link>
              <span>|</span>
              <Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="container flex items-center gap-4 py-3 lg:py-3.5">
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">LX</span>
            </div>
            <span className="font-heading font-bold text-lg hidden sm:block">LUXEMART</span>
          </Link>

          {/* Category dropdown */}
          <div className="hidden lg:flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors group">
            <span className="text-sm font-medium">Categories</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="flex w-full items-center bg-muted/60 rounded-2xl border border-transparent focus-within:border-primary/30 focus-within:bg-card transition-all">
              <Search className="w-4 h-4 ml-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </div>

            <AnimatePresence>
              {searchOpen && (searchQuery.length > 1 || true) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-card rounded-2xl surface-premium border border-border/50 overflow-hidden z-50"
                >
                  {suggestions.length > 0 ? (
                    <div className="py-2">
                      <p className="px-4 py-1.5 text-xs text-muted-foreground font-medium">Products</p>
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                        >
                          <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{product.title}</p>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                          <span className="text-sm font-mono font-medium text-primary">₹{product.price.toLocaleString()}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-3 px-4">
                      <p className="text-xs text-muted-foreground font-medium mb-2">Trending</p>
                      <div className="flex flex-wrap gap-2">
                        {['Headphones', 'Sneakers', 'Laptop', 'Watch'].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1.5 bg-muted/60 rounded-full text-xs hover:bg-muted transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto">
            <button className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5" />
            </button>

            <Link to="/account" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-sm hidden lg:block">Account</span>
            </Link>

            <Link to="/account/orders" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors">
              <Package className="w-5 h-5" />
              <span className="text-sm hidden lg:block">Orders</span>
            </Link>

            <Link to="/wishlist" className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {cartCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className="hidden lg:block border-t border-border/30">
          <div className="container flex items-center gap-1 py-1.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-card z-50 overflow-y-auto"
            >
              <div className="p-4 flex items-center justify-between border-b border-border">
                <span className="font-heading font-bold text-lg">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-border p-4 space-y-1">
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50">
                  <User className="w-5 h-5" /><span className="text-sm">My Account</span>
                </Link>
                <Link to="/account/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50">
                  <Package className="w-5 h-5" /><span className="text-sm">Orders</span>
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50">
                  <Heart className="w-5 h-5" /><span className="text-sm">Wishlist</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
