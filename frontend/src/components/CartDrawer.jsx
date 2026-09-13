import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 30;
  const taxes = Math.round((subtotal * 0.05) * 100) / 100;
  const discount = subtotal > 500 ? 50 : 0;
  const finalTotal = Math.max(0, subtotal + deliveryFee + taxes - discount);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 2500,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-toast w-100-mobile"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#0b1120',
          borderLeft: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
          borderRadius: '24px 0 0 24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
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
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={18} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>Your Order</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </p>
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

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '40px 20px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#f59e0b',
                }}
              >
                <ShoppingBag size={36} />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                Explore delicious South Indian, Maharashtrian, Chinese & Western dishes and add them to your cart!
              </p>
              <button
                onClick={onClose}
                className="gradient-btn"
                style={{ padding: '10px 24px', borderRadius: '12px', fontSize: '14px' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map(({ food, quantity, specialInstructions }) => (
              <div
                key={food.id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-glass)',
                }}
              >
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  style={{ width: '65px', height: '65px', borderRadius: '12px', objectFit: 'cover' }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '4px' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', lineHeight: 1.2 }}>
                      {food.name}
                    </h5>
                    <button
                      onClick={() => onRemoveItem(food.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {specialInstructions && (
                    <p style={{ fontSize: '11px', color: '#f59e0b', fontStyle: 'italic', marginTop: '2px' }}>
                      Note: {specialInstructions}
                    </p>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>
                      ₹{food.price * quantity}
                    </span>

                    {/* Stepper */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        borderRadius: '8px',
                        padding: '2px 6px',
                        border: '1px solid var(--border-glass)',
                      }}
                    >
                      <button
                        onClick={() => onUpdateQuantity(food.id, quantity - 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f59e0b',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', minWidth: '14px', textAlign: 'center' }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(food.id, quantity + 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f59e0b',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill Breakdown & Checkout */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border-glass)',
              background: 'rgba(15, 23, 42, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Promo banner */}
            {discount > 0 ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                <Sparkles size={14} />
                <span>FEAST50 Coupon applied! You saved ₹50</span>
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Add ₹{Math.max(0, 501 - subtotal)} more to get <strong>₹50 OFF + FREE Delivery</strong>!
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Items Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>GST & Taxes (5%)</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: '700' }}>
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '8px',
                  marginTop: '4px',
                  fontSize: '16px',
                  fontWeight: '900',
                  color: '#ffffff',
                }}
              >
                <span>Grand Total</span>
                <span className="gradient-text">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="gradient-btn"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
