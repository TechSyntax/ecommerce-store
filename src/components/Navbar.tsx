import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, MapPin, ChevronDown, Package, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { products, categories } from '@/data/products';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const { wishlist, cartCount, setCartOpen } = useStore();
  const navigate = useNavigate();
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const suggestions = searchQuery.length > 1
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-card/90 backdrop-blur-2xl shadow-[0_1px_3px_hsl(var(--commerce-black)/0.06),0_8px_24px_hsl(var(--commerce-black)/0.04)] border-b border-border/40' 
          : 'bg-transparent'
      }`}>
        {/* Top announcement bar */}
        <div className={`overflow-hidden transition-all duration-500 ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
          <div className="bg-primary text-primary-foreground">
            <div className="container flex items-center justify-center py-1.5 text-xs font-medium gap-2">
              <Sparkles className="w-3 h-3" />
              <span>Flash Sale Live — Extra 20% off on all categories with code <span className="font-bold">LUXE20</span></span>
              <Sparkles className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className={`hidden lg:block border-b border-border/30 transition-all duration-300 ${scrolled ? 'py-0 max-h-0 overflow-hidden opacity-0' : 'max-h-10 opacity-100'}`}>
          <div className="container flex items-center justify-between py-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Deliver to Mumbai 400001</span>
              <span className="text-border">|</span>
              <span>Free shipping on orders above ₹999</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/account/orders" className="hover:text-foreground transition-colors">Track Order</Link>
              <span className="text-border">|</span>
              <Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="container flex items-center gap-3 lg:gap-5 py-3">
          <button className="lg:hidden p-1.5" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_8px_hsl(var(--primary)/0.3)] group-hover:shadow-[0_4px_16px_hsl(var(--primary)/0.4)] transition-shadow">
              <span className="text-primary-foreground font-heading font-bold text-sm">LX</span>
            </div>
            <span className="font-heading font-bold text-lg hidden sm:block tracking-tight">LUXEMART</span>
          </Link>

          {/* Category dropdown */}
          <div ref={catRef} className="relative hidden lg:block">
            <button
              onClick={() => setCatDropdown(!catDropdown)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors text-sm font-medium"
            >
              Categories
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${catDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {catDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 w-64 bg-card rounded-2xl surface-premium border border-border/50 overflow-hidden z-50 py-2"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      onClick={() => setCatDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{cat.name}</p>
                        <p className="text-[11px] text-muted-foreground">{cat.productCount.toLocaleString()} products</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
            <div className="flex w-full items-center bg-muted/50 rounded-2xl border border-transparent focus-within:border-primary/30 focus-within:bg-card focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)] transition-all duration-200">
              <Search className="w-4 h-4 ml-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="mr-2 p-1 rounded-full hover:bg-muted transition-colors">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
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
                      <p className="px-4 py-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">Products</p>
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                        >
                          <img src={product.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
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
                      <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">Trending Searches</p>
                      <div className="flex flex-wrap gap-2">
                        {['Headphones', 'Sneakers', 'Laptop', 'Watch', 'Skincare', 'Gaming'].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1.5 bg-muted/60 rounded-full text-xs hover:bg-primary/10 hover:text-primary transition-colors"
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
          <div className="flex items-center gap-0.5 ml-auto">
            <button className="md:hidden p-2.5 rounded-xl hover:bg-muted/50 transition-colors" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5" />
            </button>

            <Link to="/account" className="hidden sm:flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group">
              <User className="w-[18px] h-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm hidden lg:block">Account</span>
            </Link>

            <Link to="/account/orders" className="hidden sm:flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group">
              <Package className="w-[18px] h-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm hidden lg:block">Orders</span>
            </Link>

            <Link to="/wishlist" className="relative p-2.5 rounded-xl hover:bg-muted/50 transition-colors group">
              <Heart className="w-[18px] h-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
            >
              <ShoppingBag className="w-[18px] h-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
              {cartCount() > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className={`hidden lg:block border-t border-border/20 transition-all duration-300 ${scrolled ? 'bg-transparent' : ''}`}>
          <div className="container flex items-center gap-0.5 py-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
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
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-heading font-bold text-xs">LX</span>
                  </div>
                  <span className="font-heading font-bold">LUXEMART</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              {/* Mobile search */}
              <div className="p-4 border-b border-border">
                <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }}>
                  <div className="flex items-center bg-muted/60 rounded-xl px-3 py-2.5">
                    <Search className="w-4 h-4 text-muted-foreground mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                </form>
              </div>

              <div className="p-4 space-y-0.5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider px-3 mb-2">Categories</p>
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
              <div className="border-t border-border p-4 space-y-0.5">
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50">
                  <User className="w-5 h-5 text-muted-foreground" /><span className="text-sm">My Account</span>
                </Link>
                <Link to="/account/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50">
                  <Package className="w-5 h-5 text-muted-foreground" /><span className="text-sm">Orders</span>
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50">
                  <Heart className="w-5 h-5 text-muted-foreground" /><span className="text-sm">Wishlist</span>
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
