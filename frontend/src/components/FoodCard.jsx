import React from 'react';
import { Star, Clock, Flame, Plus, Minus, Info } from 'lucide-react';

export default function FoodCard({
  food,
  quantityInCart = 0,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
}) {
  const spiceIcons = [];
  for (let i = 0; i < (food.spiceLevel || 0); i++) {
    spiceIcons.push(<Flame key={i} size={12} color="#ef4444" fill="#ef4444" />);
  }

  return (
    <div className="food-card">
      {/* Image Container */}
      <div className="food-card-img-wrap" onClick={() => onOpenDetails(food)} style={{ cursor: 'pointer' }}>
        <img src={food.imageUrl} alt={food.name} loading="lazy" />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          {food.isVeg ? (
            <div className="badge-veg" title="100% Pure Vegetarian" style={{ background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(4px)' }}>
              <div className="badge-veg-dot"></div>
            </div>
          ) : (
            <div className="badge-nonveg" title="Non-Vegetarian" style={{ background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(4px)' }}>
              <div className="badge-nonveg-dot"></div>
            </div>
          )}

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(6px)',
              border: '1px solid var(--border-glass)',
              color: '#e2e8f0',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '700',
            }}
          >
            {food.category}
          </div>
        </div>

        {/* Rating badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            border: '1px solid var(--border-glass)',
            color: '#fbbf24',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <Star size={12} fill="#fbbf24" />
          <span>{food.rating || 4.8}</span>
        </div>

        {/* Prep Time pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            background: 'rgba(9, 13, 22, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#cbd5e1',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Clock size={11} color="#94a3b8" />
          <span>{food.preparationTimeMinutes || 20}m prep</span>
        </div>
      </div>

      {/* Body Details */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
            <h3
              onClick={() => onOpenDetails(food)}
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: '#ffffff',
                cursor: 'pointer',
                lineHeight: 1.3,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f59e0b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              {food.name}
            </h3>
            {spiceIcons.length > 0 && (
              <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }} title={`Spicy Level ${food.spiceLevel}/3`}>
                {spiceIcons}
              </div>
            )}
          </div>

          {food.restaurant && (
            <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '600', marginTop: '2px' }}>
              by {food.restaurant.name}
            </p>
          )}
        </div>

        <p
          style={{
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {food.description}
        </p>

        {/* Footer with Price and Add to Cart */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Price
            </span>
            <span style={{ fontSize: '19px', fontWeight: '900', color: '#ffffff' }}>
              ₹{food.price}
            </span>
          </div>

          {/* Cart Actions */}
          {quantityInCart > 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid #f59e0b',
                borderRadius: '12px',
                padding: '4px 8px',
              }}
            >
              <button
                onClick={() => onRemoveFromCart(food)}
                style={{
                  background: '#f59e0b',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '6px',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: '800',
                }}
              >
                <Minus size={14} />
              </button>
              <span style={{ fontWeight: '800', fontSize: '14px', color: '#ffffff', minWidth: '16px', textAlign: 'center' }}>
                {quantityInCart}
              </span>
              <button
                onClick={() => onAddToCart(food)}
                style={{
                  background: '#f59e0b',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '6px',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: '800',
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(food)}
              className="gradient-btn"
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Plus size={15} />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
