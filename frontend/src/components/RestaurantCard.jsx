import React from 'react';
import { Star, Clock, MapPin, IndianRupee, Bike, Sparkles } from 'lucide-react';

export default function RestaurantCard({ restaurant, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(restaurant)}
      style={{
        background: isSelected ? 'rgba(30, 41, 64, 0.9)' : 'var(--bg-card)',
        border: `1.5px solid ${isSelected ? '#f59e0b' : 'var(--border-glass)'}`,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isSelected ? '0 10px 30px -10px rgba(245, 158, 11, 0.4)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'var(--border-glass)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Restaurant Image Banner */}
      <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(9, 13, 22, 0.9) 0%, transparent 60%)',
          }}
        />

        {/* Featured Badge */}
        {restaurant.isFeatured && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '800',
              padding: '4px 10px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            }}
          >
            <Sparkles size={12} />
            <span>FEATURED</span>
          </div>
        )}

        {/* Delivery Time Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-glass)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Clock size={13} color="#f59e0b" />
          <span>{restaurant.deliveryTimeMinutes} mins</span>
        </div>
      </div>

      {/* Details Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', lineHeight: 1.2 }}>
              {restaurant.name}
            </h3>
            <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '600', marginTop: '2px' }}>
              {restaurant.cuisineTypes}
            </p>
          </div>

          {/* Rating Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: '#047857',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '800',
            }}
          >
            <Star size={13} fill="#ffffff" />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.3 }}>
          "{restaurant.tagline}"
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
          <MapPin size={13} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {restaurant.address}
          </span>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-glass)',
            paddingTop: '10px',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}
        >
          <span style={{ color: '#94a3b8' }}>
            ₹{restaurant.priceForTwo} for two
          </span>
          <span
            style={{
              color: isSelected ? '#f59e0b' : '#38bdf8',
              fontWeight: '700',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            {isSelected ? '✓ Showing Dishes' : 'View Menu →'}
          </span>
        </div>
      </div>
    </div>
  );
}
