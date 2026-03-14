import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products, categories } from '@/data/products';

const sortOptions = [
  { value: 'popular', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
  { value: 'discount', label: 'Discount' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 2>(3);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'popular';
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '999999');
  const selectedRating = parseInt(searchParams.get('rating') || '0');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category) result = result.filter(p => p.category === category);
    if (search) result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
    if (minPrice > 0) result = result.filter(p => p.price >= minPrice);
    if (maxPrice < 999999) result = result.filter(p => p.price <= maxPrice);
    if (selectedRating > 0) result = result.filter(p => p.rating >= selectedRating);

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.reverse(); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [category, search, sort, minPrice, maxPrice, selectedRating]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const categoryName = categories.find(c => c.id === category)?.name || 'All Products';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 lg:pt-36 pb-16">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">{search ? `Search: "${search}"` : categoryName}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading font-bold text-2xl lg:text-3xl">
                {search ? `Results for "${search}"` : categoryName}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Grid toggle */}
              <div className="hidden lg:flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 ${gridCols === 3 ? 'bg-muted' : ''} transition-colors`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-2 ${gridCols === 2 ? 'bg-muted' : ''} transition-colors`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  className="appearance-none bg-card border border-border rounded-xl px-4 py-2.5 pr-8 text-sm outline-none focus:border-primary/30 transition-colors cursor-pointer"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Filter button */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`${filtersOpen ? 'fixed inset-0 z-50 bg-card p-6 overflow-y-auto lg:static lg:bg-transparent lg:p-0' : 'hidden'} lg:block lg:w-56 shrink-0`}>
              {filtersOpen && (
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h3 className="font-heading font-bold text-lg">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
                </div>
              )}

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-sm mb-3">Category</h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => updateParam('category', '')}
                    className={`block w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${!category ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'}`}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => updateParam('category', cat.id)}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${category === cat.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'}`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-sm mb-3">Customer Rating</h4>
                <div className="space-y-1.5">
                  {[4, 3, 2, 1].map(r => (
                    <button
                      key={r}
                      onClick={() => updateParam('rating', selectedRating === r ? '' : String(r))}
                      className={`block w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${selectedRating === r ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'}`}
                    >
                      {r}★ & above
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="font-heading font-semibold text-sm mb-3">Availability</h4>
                <button className="block w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-muted/50 transition-colors">
                  In Stock
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-muted/50 transition-colors">
                  Express Delivery
                </button>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="font-heading font-semibold text-lg mb-1">No products found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div className={`grid grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4 lg:gap-6`}>
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
