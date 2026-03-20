import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Package, Settings, ShoppingBag, Mail, Edit, LogOut, Bell, Moon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const AccountPage = () => {
  const location = useLocation();
  const defaultTab = location.pathname.includes('/orders') ? 'orders' : 'profile';
  const { orders } = useStore();
  const [notifications, setNotifications] = useState({ deals: true, orders: true, newsletter: false });

  const statusColors: Record<string, string> = {
    Processing: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    Shipped: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    Delivered: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 lg:pt-36 pb-16">
        <div className="container max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-2xl lg:text-3xl mb-8"
          >
            My Account
          </motion.h1>

          <Tabs defaultValue={defaultTab} className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
              <TabsList className="bg-card border border-border h-12 p-1 rounded-2xl">
                <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 px-4">
                  <User className="w-4 h-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 px-4">
                  <Package className="w-4 h-4" /> Orders
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 px-4">
                  <Settings className="w-4 h-4" /> Settings
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* ── Profile Tab ── */}
            <TabsContent value="profile">
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="bg-card rounded-3xl border border-border surface-elevated p-6 lg:p-8"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="w-20 h-20 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-heading font-bold">
                      GU
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left flex-1">
                    <h2 className="font-heading font-bold text-xl mb-1">Guest User</h2>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">guest@emart.com</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => toast.info('Edit profile coming soon!')}
                      className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
                    >
                      <Edit className="w-4 h-4" /> Edit Profile
                    </button>
                    <button
                      onClick={() => toast.info('Logout coming soon!')}
                      className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors active:scale-[0.97]"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                  {[
                    { label: 'Orders', value: orders.length.toString() },
                    { label: 'Wishlist', value: useStore.getState().wishlist.length.toString() },
                    { label: 'Member since', value: 'Mar 2026' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-mono font-bold text-lg">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* ── Orders Tab ── */}
            <TabsContent value="orders">
              {orders.length === 0 ? (
                <motion.div
                  variants={fadeUp} initial="hidden" animate="visible" custom={0}
                  className="bg-card rounded-3xl border border-border surface-elevated p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">No orders yet</h3>
                  <p className="text-sm text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Continue Shopping <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, idx) => (
                    <motion.div
                      key={order.id}
                      variants={fadeUp} initial="hidden" animate="visible" custom={idx}
                      className="bg-card rounded-3xl border border-border surface-elevated overflow-hidden"
                    >
                      {/* Order header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-mono font-semibold text-sm">{order.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status] || statusColors.Processing}`}>
                            {order.status}
                          </span>
                          <span className="font-mono font-bold text-sm">{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="p-5 space-y-3">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-3">
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="w-12 h-12 rounded-xl object-cover border border-border"
                              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.product.title}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-mono text-sm">{formatPrice(item.subtotal)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                        <span>Paid via {order.paymentMethod}</span>
                        <Link to="/view-order" className="text-primary font-medium hover:underline">View Details</Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ── Settings Tab ── */}
            <TabsContent value="settings">
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="space-y-6"
              >
                {/* Notifications */}
                <div className="bg-card rounded-3xl border border-border surface-elevated p-6">
                  <h3 className="font-heading font-semibold text-base mb-5 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" /> Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'deals' as const, label: 'Deals & Offers', desc: 'Get notified about exclusive deals and discounts' },
                      { key: 'orders' as const, label: 'Order Updates', desc: 'Receive updates about your orders' },
                      { key: 'newsletter' as const, label: 'Newsletter', desc: 'Weekly curated picks and new arrivals' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key]}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div className="bg-card rounded-3xl border border-border surface-elevated p-6">
                  <h3 className="font-heading font-semibold text-base mb-5 flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary" /> Appearance
                  </h3>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Use a dark color theme</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
