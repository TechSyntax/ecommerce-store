import { Link } from 'react-router-dom';
import { Check, Package, ShieldCheck, PartyPopper, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useStore, type Order } from '@/store/useStore';
import { formatPrice } from '@/data/products';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const OrderProductCard = ({ item }: { item: Order['items'][number] }) => (
  <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
    <img
      src={item.product.image}
      alt={item.product.title}
      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
    />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{item.product.title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {formatPrice(item.product.price)} × {item.quantity}
      </p>
    </div>
    <span className="font-mono font-semibold text-sm whitespace-nowrap">
      {formatPrice(item.subtotal)}
    </span>
  </div>
);

const ViewOrderPage = () => {
  const { lastOrder } = useStore();

  if (!lastOrder) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CartDrawer />
        <main className="pt-28 lg:pt-36 pb-16">
          <div className="container max-w-lg text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-9 h-9 text-muted-foreground" />
            </div>
            <h1 className="font-heading font-bold text-2xl mb-3">No recent orders found</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't placed an order yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const orderDate = new Date(lastOrder.date);
  const estimatedDelivery = new Date(orderDate.getTime() + 4 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 lg:pt-36 pb-16">
        <div className="container max-w-3xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>

          {/* Success Header */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="text-center mb-10">
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative w-24 h-24 mx-auto mb-6"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-success/10 border-2 border-success/20"
              />
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
                  className="w-12 h-12 rounded-full bg-success flex items-center justify-center shadow-[0_4px_20px_hsl(var(--success)/0.4)]"
                >
                  <Check className="w-6 h-6 text-success-foreground" strokeWidth={3} />
                </motion.div>
              </motion.div>

              {/* Confetti */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 360;
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 0], x: Math.cos(rad) * 50, y: Math.sin(rad) * 50, opacity: [0, 1, 0] }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }}
                    className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-success' : 'bg-accent'}`}
                  />
                );
              })}
            </motion.div>

            <div className="flex items-center justify-center gap-2 text-success mb-2">
              <PartyPopper className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Order Confirmed</span>
            </div>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl mb-2">Thank You!</h1>
            <p className="text-muted-foreground">
              Order <span className="font-mono font-semibold text-foreground">#{lastOrder.id}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {orderDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {orderDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Products */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="lg:col-span-3 space-y-3">
              <h2 className="font-heading font-semibold text-lg mb-1">Items Ordered</h2>
              {lastOrder.items.map((item) => (
                <OrderProductCard key={item.product.id} item={item} />
              ))}
            </motion.div>

            {/* Summary Sidebar */}
            <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="lg:col-span-2 space-y-4">
              {/* Price Breakdown */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-heading font-semibold mb-4">Price Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({lastOrder.items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-mono">{formatPrice(lastOrder.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-success font-medium">Free</span>
                  </div>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg pt-3 mt-3 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono">{formatPrice(lastOrder.total)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      {estimatedDelivery.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Progress steps */}
                <div className="flex items-center gap-1">
                  {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
                    <div key={step} className="flex-1 flex flex-col items-center">
                      <div className={`w-full h-1.5 rounded-full ${i === 0 ? 'bg-success' : 'bg-muted'}`} />
                      <span className={`text-[10px] mt-1.5 ${i === 0 ? 'text-success font-medium' : 'text-muted-foreground'}`}>{step}</span>
                    </div>
                  ))}
                </div>

                {lastOrder.deliveryAddress && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Delivering to</p>
                    <p className="text-sm">{lastOrder.deliveryAddress}</p>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span>Paid via {lastOrder.paymentMethod}</span>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewOrderPage;
