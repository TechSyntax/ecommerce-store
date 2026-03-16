import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { products, categories } from '@/data/products';

const navCategories = ['electronics', 'fashion', 'home', 'beauty', 'accessories', 'grocery', 'books'];

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlist, cartCount, setCartOpen } = useStore();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(Math.min(1, window.scrollY / 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const displayCategories = categories.filter(c => navCategories.includes(c.id));

  const bgOpacity = 0.5 + scrollProgress * 0.45;
  const shadowOpacity = scrollProgress * 0.4;
  const borderOpacity = 0.06 + scrollProgress * 0.04;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl transition-[backdrop-filter] duration-300"
        style={{
          backgroundColor: `hsla(0, 0%, 7%, ${bgOpacity})`,
          boxShadow: `0 1px 0 hsla(0, 0%, 100%, ${borderOpacity}), 0 4px 24px hsla(0, 0%, 0%, ${shadowOpacity})`,
          borderBottom: `1px solid hsla(0, 0%, 100%, ${borderOpacity})`,
        }}
      >
        <div className="container flex items-center gap-4 lg:gap-6 h-16">
          {/* Mobile menu button */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-[hsl(0,0%,100%,0.08)] transition-colors" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5 text-[hsl(0,0%,95%)]" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(24,100%,55%)] to-[hsl(24,100%,42%)] flex items-center justify-center shadow-[0_0_16px_hsl(24,100%,50%,0.3)] group-hover:shadow-[0_0_24px_hsl(24,100%,50%,0.5)] transition-shadow duration-300">
              <ShoppingBag className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[hsl(24,100%,50%)] border-2 border-[hsl(0,0%,7%)]" />
            </div>
            <div className="hidden sm:flex items-baseline gap-0">
              <span className="font-heading font-extrabold text-lg text-[hsl(24,100%,50%)]">E</span>
              <span className="font-heading font-extrabold text-lg text-white">-Mart</span>
            </div>
          </Link>

          {/* Search bar - center */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-md mx-auto relative">
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-[hsl(0,0%,100%,0.07)] hover:bg-[hsl(0,0%,100%,0.1)] rounded-full border border-[hsl(0,0%,100%,0.08)] focus-within:border-[hsl(24,100%,50%,0.4)] focus-within:bg-[hsl(0,0%,100%,0.1)] focus-within:shadow-[0_0_0_3px_hsl(24,100%,50%,0.1)] transition-all duration-200">
                <Search className="w-4 h-4 ml-4 text-[hsl(0,0%,55%)] shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-[hsl(0,0%,45%)]"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="mr-3 p-0.5 rounded-full hover:bg-[hsl(0,0%,100%,0.1)] transition-colors">
                    <X className="w-3.5 h-3.5 text-[hsl(0,0%,50%)]" />
                  </button>
                )}
              </div>
            </form>

            <AnimatePresence>
              {searchOpen && searchQuery.length > 1 && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,100%,0.08)] rounded-2xl overflow-hidden z-50 shadow-[0_16px_48px_hsl(0,0%,0%,0.5)]"
                >
                  <div className="py-2">
                    {suggestions.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[hsl(0,0%,100%,0.05)] transition-colors"
                      >
                        <img src={product.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{product.title}</p>
                          <p className="text-xs text-[hsl(0,0%,50%)]">{product.brand}</p>
                        </div>
                        <span className="text-sm font-mono font-medium text-[hsl(24,100%,50%)]">₹{product.price.toLocaleString()}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 ml-auto shrink-0">
            <button className="md:hidden p-2 rounded-lg hover:bg-[hsl(0,0%,100%,0.08)] transition-colors" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-[18px] h-[18px] text-[hsl(0,0%,70%)]" />
            </button>

            <Link to="/account" className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-[hsl(0,0%,100%,0.08)] transition-colors group">
              <User className="w-[18px] h-[18px] text-[hsl(0,0%,60%)] group-hover:text-white transition-colors" />
              <span className="text-sm text-[hsl(0,0%,70%)] group-hover:text-white transition-colors hidden lg:block">Account</span>
            </Link>

            <Link to="/account/orders" className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-[hsl(0,0%,100%,0.08)] transition-colors group">
              <Package className="w-[18px] h-[18px] text-[hsl(0,0%,60%)] group-hover:text-white transition-colors" />
              <span className="text-sm text-[hsl(0,0%,70%)] group-hover:text-white transition-colors hidden lg:block">Orders</span>
            </Link>

            <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-[hsl(0,0%,100%,0.08)] transition-colors group">
              <Heart className="w-[18px] h-[18px] text-[hsl(0,0%,60%)] group-hover:text-white transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[hsl(24,100%,50%)] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_hsl(24,100%,50%,0.4)]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-[hsl(0,0%,100%,0.08)] transition-colors group"
            >
              <ShoppingBag className="w-[18px] h-[18px] text-[hsl(0,0%,60%)] group-hover:text-white transition-colors" />
              {cartCount() > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[hsl(24,100%,50%)] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_hsl(24,100%,50%,0.4)]">
                  {cartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-50 md:hidden bg-[hsl(0,0%,7%)]/95 backdrop-blur-xl border-b border-[hsl(0,0%,100%,0.06)] p-3"
          >
            <form onSubmit={(e) => { handleSearch(e); setSearchOpen(false); }}>
              <div className="flex items-center bg-[hsl(0,0%,100%,0.08)] rounded-full px-4 py-2.5 border border-[hsl(0,0%,100%,0.08)]">
                <Search className="w-4 h-4 text-[hsl(0,0%,50%)] mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[hsl(0,0%,45%)]"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="p-1">
                  <X className="w-4 h-4 text-[hsl(0,0%,50%)]" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[hsl(0,0%,8%)] border-r border-[hsl(0,0%,100%,0.06)] z-50 overflow-y-auto"
            >
              <div className="p-4 flex items-center justify-between border-b border-[hsl(0,0%,100%,0.06)]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[hsl(24,100%,55%)] to-[hsl(24,100%,42%)] flex items-center justify-center">
                    <ShoppingBag className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
                  </div>
                  <div className="flex items-baseline">
                    <span className="font-heading font-extrabold text-sm text-[hsl(24,100%,50%)]">E</span>
                    <span className="font-heading font-extrabold text-sm text-white">-Mart</span>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-[hsl(0,0%,100%,0.08)]">
                  <X className="w-5 h-5 text-[hsl(0,0%,60%)]" />
                </button>
              </div>

              <div className="p-4 space-y-0.5">
                <p className="text-[11px] text-[hsl(0,0%,45%)] font-medium uppercase tracking-widest px-3 mb-3">Categories</p>
                {displayCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[hsl(0,0%,100%,0.06)] transition-colors"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm text-[hsl(0,0%,80%)]">{cat.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-[hsl(0,0%,100%,0.06)] p-4 space-y-0.5">
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[hsl(0,0%,100%,0.06)]">
                  <User className="w-5 h-5 text-[hsl(0,0%,50%)]" /><span className="text-sm text-[hsl(0,0%,80%)]">Account</span>
                </Link>
                <Link to="/account/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[hsl(0,0%,100%,0.06)]">
                  <Package className="w-5 h-5 text-[hsl(0,0%,50%)]" /><span className="text-sm text-[hsl(0,0%,80%)]">Orders</span>
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[hsl(0,0%,100%,0.06)]">
                  <Heart className="w-5 h-5 text-[hsl(0,0%,50%)]" /><span className="text-sm text-[hsl(0,0%,80%)]">Wishlist</span>
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
