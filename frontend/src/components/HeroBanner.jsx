import React from 'react';
import { Sparkles, Zap, ShieldCheck, Flame, Tag, ArrowRight } from 'lucide-react';

export default function HeroBanner({ onSelectCuisine, activeCuisine }) {
  const cuisineHighlights = [
    { name: 'South Indian', icon: '🥥', tag: 'Dosa & Podi Idli', color: '#10b981' },
    { name: 'Maharashtrian', icon: '🌶️', tag: 'Misal Pav & Puran Poli', color: '#f59e0b' },
    { name: 'Chinese', icon: '🥢', tag: 'Dim Sums & Hakka Wok', color: '#ef4444' },
    { name: 'Western', icon: '🍔', tag: 'Burgers & Truffle Pizza', color: '#8b5cf6' },
  ];

  return (
    <div style={{ padding: '2rem 0 1rem' }}>
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          padding: '2.5rem',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
        }}
      >
        {/* Glow ambient circle */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Left Text */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '30px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fbbf24',
                fontSize: '13px',
                fontWeight: '700',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={15} />
              <span>AUTHENTIC CUISINES & INSTANT DELIVERY</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '900', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '1rem' }}>
              Craving <span className="gradient-text">South Indian, Maharashtrian, Chinese</span> or Western?
            </h1>

            <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '520px' }}>
              Order from top specialty restaurants delivering hot, freshly cooked regional authentic flavors right to your doorstep in under 30 minutes.
            </p>

            {/* Quick Cuisine Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {cuisineHighlights.map((c) => (
                <button
                  key={c.name}
                  onClick={() => onSelectCuisine(c.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '14px',
                    background: activeCuisine === c.name ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : 'rgba(255, 255, 255, 0.06)',
                    border: `1px solid ${activeCuisine === c.name ? '#f59e0b' : 'var(--border-glass)'}`,
                    color: activeCuisine === c.name ? '#ffffff' : '#cbd5e1',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCuisine !== c.name) {
                      e.currentTarget.style.borderColor = c.color;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCuisine !== c.name) {
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Promo Card & Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Promo Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.25), rgba(180, 83, 9, 0.15))',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: '18px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#ea580c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Tag size={20} color="#ffffff" />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>Flat ₹50 DISCOUNT</h4>
                  <p style={{ fontSize: '13px', color: '#fdba74' }}>On all orders above ₹500 • Code: <strong>FEAST50</strong></p>
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#ffffff',
                  letterSpacing: '0.5px',
                }}
              >
                AUTO-APPLIED
              </div>
            </div>

            {/* Feature Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Zap size={20} color="#f59e0b" />
                <div>
                  <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>25 Min Express</h5>
                  <p style={{ fontSize: '11px', color: '#94a3b8' }}>Live kitchen tracking</p>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <ShieldCheck size={20} color="#10b981" />
                <div>
                  <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>100% Quality</h5>
                  <p style={{ fontSize: '11px', color: '#94a3b8' }}>Certified hygiene</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
