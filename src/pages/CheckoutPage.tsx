import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Truck, MapPin, ShieldCheck } from 'lucide-react';

import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/data/products';

const steps = ['Address', 'Shipping', 'Payment', 'Review'];
const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");


const CheckoutPage = () => {
  const { cart, cartTotal, placeOrder } = useStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);

const shippingOptions = [
  { label: 'Express Delivery', price: 0 },
  { label: 'Standard Delivery', price: 0 },
  { label: 'Same Day Delivery', price: 149 }
];

const paymentMethods = [
  'Credit/Debit Card',
  'UPI',
  'Net Banking',
  'Cash on Delivery'
];

const handlePlaceOrder = () => {
  const orderData = {
    paymentMethod: paymentMethods[selectedPayment],
    deliveryPrice: shippingOptions[selectedShipping].price,
    deliveryType: shippingOptions[selectedShipping].label
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  placeOrder();
  navigate('/view-order');
};

  if (cart.length === 0) {
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
                    <input placeholder="First Name"  className="px-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary/30 transition-colors" />
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
                   { label: 'Express Delivery', desc: 'Get it by tomorrow', price: 'Free' },
                  { label: 'Standard Delivery', desc: '3-5 business days', price: 'Free' },
                  //  { label: 'Same Day Delivery', desc: 'Order before 2 PM', price: '₹149' },
          ].map((opt, i) => (
                     <label
              key={i}
    onClick={() => setSelectedShipping(i)}
    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
      selectedShipping === i
        ? 'border-primary bg-primary/5'
        : 'border-border hover:border-primary/30'
    }`}
  >
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
      selectedShipping === i ? 'border-primary' : 'border-muted-foreground/30'
    }`}>
       {selectedShipping === i && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
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
          <label
     key={i}
           onClick={() => setSelectedPayment(i)}
         className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
         selectedPayment === i
               ? 'border-primary bg-primary/5'
        : 'border-border hover:border-primary/30'
    }`}
  >
         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${  
       selectedPayment === i ? 'border-primary' : 'border-muted-foreground/30'
    }`}>
      {selectedPayment === i && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
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
                    <span className="font-medium">
                        {shippingOptions[selectedShipping].price === 0
                           ? 'Free'
                                     : `₹${shippingOptions[selectedShipping].price}`}
                                   </span>
                  </div>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono">{formatPrice(cartTotal() + shippingOptions[selectedShipping].price)}</span>
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
