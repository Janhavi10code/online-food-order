import React, { useState } from 'react';
import { X, Star, Clock, Flame, ShieldCheck, Plus, Minus, ChefHat, MessageSquare } from 'lucide-react';

export default function FoodDetailModal({
  food,
  onClose,
  onAddToCart,
  quantityInCart = 0,
}) {
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!food) return null;

  const spiceLabels = ['Mild', 'Medium Spicy', 'Very Spicy', 'Fiery Extreme'];
  const spiceLabel = spiceLabels[food.spiceLevel || 0] || 'Mild';

  const handleAdd = () => {
    onAddToCart(food, specialInstructions);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0f172a',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          borderRadius: '24px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--border-glass)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Image */}
        <div style={{ position: 'relative', height: '280px', width: '100%', overflow: 'hidden' }}>
          <img
            src={food.imageUrl}
            alt={food.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #0f172a 0%, transparent 60%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '24px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            {food.isVeg ? (
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                Pure Vegetarian
              </span>
            ) : (
              <span style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                Non-Vegetarian
              </span>
            )}
            <span style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', color: '#f59e0b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
              {food.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>
                {food.name}
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#047857',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '800',
                }}
              >
                <Star size={14} fill="#ffffff" />
                <span>{food.rating}</span>
              </div>
            </div>

            {food.restaurant && (
              <p style={{ fontSize: '14px', color: '#f59e0b', fontWeight: '600', marginTop: '4px' }}>
                Prepared by: {food.restaurant.name} ({food.restaurant.address})
              </p>
            )}
          </div>

          <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6 }}>
            {food.description}
          </p>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              padding: '16px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>PREPARATION</span>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Clock size={14} color="#f59e0b" />
                <span>{food.preparationTimeMinutes || 20} mins</span>
              </p>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>CALORIES</span>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginTop: '2px' }}>
                🔥 {food.calories || 350} kcal
              </p>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>SPICE LEVEL</span>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#ef4444', marginTop: '2px' }}>
                {spiceLabel}
              </p>
            </div>
          </div>

          {/* Special Cooking Instructions */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#e2e8f0', marginBottom: '8px' }}>
              <MessageSquare size={14} color="#f59e0b" />
              <span>Special Chef Instructions (Optional):</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Less spicy, extra green chutney, less oil..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
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

          {/* Bottom Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-glass)',
              marginTop: '8px',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>TOTAL PRICE</span>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>₹{food.price}</span>
            </div>

            <button
              onClick={handleAdd}
              className="gradient-btn"
              style={{
                padding: '12px 28px',
                borderRadius: '14px',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Plus size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
