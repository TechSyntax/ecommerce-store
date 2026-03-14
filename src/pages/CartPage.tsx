import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/data/products';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 lg:pt-36 pb-16">
        <div className="container">
          <h1 className="font-heading font-bold text-2xl lg:text-3xl mb-8">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
              <h2 className="font-heading font-semibold text-xl mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
              >
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-card rounded-3xl surface-elevated">
                    <Link to={`/product/${item.product.id}`}>
                      <img src={item.product.image} alt={item.product.title} className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-medium text-sm lg:text-base line-clamp-2 hover:text-primary transition-colors">{item.product.title}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.product.brand}</p>
                      {item.selectedColor && <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>}
                      {item.selectedSize && <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono font-bold">{formatPrice(item.product.price)}</span>
                          {item.product.mrp > item.product.price && (
                            <span className="font-mono text-xs text-muted-foreground line-through">{formatPrice(item.product.mrp)}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-xl overflow-hidden">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-mono">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.product.id)} className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Link to="/products" className="inline-flex items-center gap-2 text-sm text-primary font-medium mt-4">
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-3xl surface-elevated p-6 sticky top-36">
                  <h3 className="font-heading font-bold text-lg mb-5">Order Summary</h3>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span className="font-mono">{formatPrice(cartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-success font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Savings</span>
                      <span className="text-success font-mono font-medium">
                        -{formatPrice(cart.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.quantity, 0))}
                      </span>
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="flex gap-2 mb-5">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 px-4 py-2.5 bg-muted/50 rounded-xl text-sm outline-none border border-transparent focus:border-primary/30 transition-colors"
                    />
                    <button className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                      Apply
                    </button>
                  </div>

                  <div className="flex justify-between font-heading font-bold text-lg pt-4 border-t border-border">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(cartTotal())}</span>
                  </div>

                  <Link
                    to="/checkout"
                    className="flex items-center justify-center gap-2 w-full py-4 mt-5 bg-primary text-primary-foreground rounded-2xl font-heading font-semibold hover:opacity-90 transition-opacity"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
