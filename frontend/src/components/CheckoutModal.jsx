import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, QrCode, Banknote, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  user,
  cartItems,
  onOrderSuccess,
  onRequireAuth,
}) {
  if (!isOpen) return null;

  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || 'Flat 402, Sunshine Heights, FC Road, Pune');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+91 9876543210');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 30;
  const taxes = Math.round((subtotal * 0.05) * 100) / 100;
  const discount = subtotal > 500 ? 50 : 0;
  const finalTotal = Math.max(0, subtotal + deliveryFee + taxes - discount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }

    if (!deliveryAddress.trim()) {
      setErrorMsg('Please provide a delivery address.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMsg('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Group items or pick the restaurant ID from first item
      const restaurantId = cartItems[0]?.food?.restaurant?.id || 1;

      const orderPayload = {
        restaurantId,
        items: cartItems.map((item) => ({
          foodItemId: item.food.id,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || '',
        })),
        deliveryAddress,
        contactPhone,
        paymentMethod,
        customerNotes,
      };

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ea580c', '#10b981', '#ffffff'],
        });
      } catch (err) {}

      await onOrderSuccess(orderPayload);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in w-100-mobile"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0f172a',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>Confirm & Pay</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Review delivery details & payment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-glass)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {errorMsg && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                fontSize: '13px',
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Delivery Address */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Delivery Address
            </label>
            <textarea
              rows={2}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              placeholder="House/Flat number, Street name, Landmark, City"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-glass)',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Contact Phone Number
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
              placeholder="+91 9876543210"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-glass)',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
              Select Payment Method
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'UPI', label: 'UPI / GPay', icon: <QrCode size={18} /> },
                { id: 'CARD', label: 'Credit/Debit', icon: <CreditCard size={18} /> },
                { id: 'COD', label: 'Cash on Del.', icon: <Banknote size={18} /> },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '14px',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1.5px solid ${isSelected ? '#f59e0b' : 'var(--border-glass)'}`,
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '700',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <span style={{ color: isSelected ? '#f59e0b' : '#94a3b8' }}>{method.icon}</span>
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary Snapshot */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>TOTAL AMOUNT PAYABLE</span>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>₹{finalTotal.toFixed(2)}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700', display: 'block' }}>
                {cartItems.length} items
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>⚡ Fast 25-30m Delivery</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="gradient-btn"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Placing Order...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Place Order & Pay ₹{finalTotal.toFixed(2)}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
