import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Truck, MapPin, ShieldCheck, PartyPopper, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/data/products';

const steps = ['Address', 'Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const { cart, cartTotal, placeOrder } = useStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    placeOrder();
    navigate('/view-order');
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 text-center">
          <h1 className="font-heading font-bold text-2xl mb-4">No items to checkout</h1>
          <Link to="/products" className="text-primary">Continue Shopping</Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CartDrawer />
        <main className="pt-28 lg:pt-36 pb-16">
          <div className="container max-w-lg text-center py-16">
            {/* Animated success */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="relative w-28 h-28 mx-auto mb-8"
            >
              {/* Outer ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-success/10 border-2 border-success/20"
              />
              {/* Inner circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
                className="absolute inset-3 rounded-full bg-success/20 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.5 }}
                  className="w-14 h-14 rounded-full bg-success flex items-center justify-center shadow-[0_4px_20px_hsl(var(--success)/0.4)]"
                >
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    <Check className="w-7 h-7 text-success-foreground" strokeWidth={3} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Confetti dots */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 360;
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 0],
                      x: Math.cos(rad) * 60,
                      y: Math.sin(rad) * 60,
                      opacity: [0, 1, 0],
                    }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }}
                    className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
                      i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-success' : 'bg-accent'
                    }`}
                  />
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 text-success mb-3">
                <PartyPopper className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Payment Successful</span>
              </div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl mb-3">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-1">Order <span className="font-mono font-semibold text-foreground">#{orderId}</span></p>
              <p className="text-sm text-muted-foreground mb-8">We'll send you an email with tracking details shortly.</p>
            </motion.div>

            {/* Order summary card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-card rounded-2xl border border-border p-5 mb-8 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                      weekday: 'long', month: 'short', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Progress steps */}
              <div className="flex items-center gap-1 mb-2">
                {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
                  <div key={step} className="flex-1 flex flex-col items-center">
                    <div className={`w-full h-1.5 rounded-full ${i === 0 ? 'bg-success' : 'bg-muted'}`} />
                    <span className={`text-[10px] mt-1.5 ${i === 0 ? 'text-success font-medium' : 'text-muted-foreground'}`}>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
              <Link
                to="/account/orders"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border rounded-2xl font-semibold hover:bg-muted/50 transition-colors"
              >
                View Orders
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 lg:pt-36 pb-16">
        <div className="container max-w-4xl">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>

          <h1 className="font-heading font-bold text-2xl lg:text-3xl mb-8">Checkout</h1>

          {/* Progress */}
          <div className="flex items-center justify-between mb-10 max-w-md">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm hidden sm:block ${i <= currentStep ? 'font-medium' : 'text-muted-foreground'}`}>{step}</span>
                {i < steps.length - 1 && <div className={`w-8 h-px transition-colors ${i < currentStep ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              {/* Address */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> Delivery Address
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input placeholder="First Name" className="px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                    <input placeholder="Last Name" className="px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                  </div>
                  <input placeholder="Address Line 1" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                  <input placeholder="Address Line 2 (Optional)" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input placeholder="City" className="px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                    <input placeholder="State" className="px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                    <input placeholder="PIN Code" className="px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                  </div>
                  <input placeholder="Phone Number" className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
                </div>
              )}

              {/* Shipping */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" /> Shipping Method
                  </h2>
                  {[
                    { label: 'Express Delivery', desc: 'Get it by tomorrow', price: 'Free', selected: true },
                    { label: 'Standard Delivery', desc: '3-5 business days', price: 'Free', selected: false },
                    { label: 'Same Day Delivery', desc: 'Order before 2 PM', price: '₹149', selected: false },
                  ].map((opt, i) => (
                    <label key={i} className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${opt.selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${opt.selected ? 'border-primary' : 'border-muted-foreground/30'}`}>
                        {opt.selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                      <span className="text-sm font-medium">{opt.price}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Payment */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                  </h2>
                  {['Credit/Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery'].map((method, i) => (
                    <label key={i} className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${i === 0 ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'border-primary' : 'border-muted-foreground/30'}`}>
                        {i === 0 && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <span className="text-sm font-medium">{method}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Review */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Order Review
                  </h2>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3 p-3 bg-card rounded-2xl border border-border">
                        <img src={item.product.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.title}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-mono font-medium text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border border-border rounded-2xl text-sm font-medium hover:bg-muted/50 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
                    else handlePlaceOrder();
                  }}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-2xl font-heading font-semibold hover:opacity-90 transition-opacity"
                >
                  {currentStep === steps.length - 1 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl surface-elevated p-5 sticky top-36">
                <h3 className="font-heading font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span className="font-mono">{formatPrice(cartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-success font-medium">Free</span>
                  </div>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono">{formatPrice(cartTotal())}</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
