import React from 'react';
import { Utensils } from 'lucide-react';

export default function CuisineTabs({ activeCuisine, onSelectCuisine, counts = {} }) {
  const categories = [
    { id: 'All', label: 'All Dishes', icon: '🍽️', desc: 'Full Menu' },
    { id: 'South Indian', label: 'South Indian', icon: '🥥', desc: 'Dosa, Idli & Vada' },
    { id: 'Maharashtrian', label: 'Maharashtrian', icon: '🌶️', desc: 'Misal, Pav Bhaji & Puran Poli' },
    { id: 'Chinese', label: 'Chinese', icon: '🥢', desc: 'Dim Sum, Hakka & Schezwan' },
    { id: 'Western', label: 'Western', icon: '🍔', desc: 'Burgers, Pizza & Pastas' },
  ];

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Explore By <span className="gradient-text">Cuisine Variety</span>
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Select your favorite regional or international culinary style
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCuisine === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCuisine(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '16px',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))'
                  : 'var(--bg-card)',
                border: `1.5px solid ${isActive ? 'var(--amber-primary)' : 'var(--border-glass)'}`,
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 8px 20px -6px rgba(245, 158, 11, 0.35)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--border-glass)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '26px' }}>{cat.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: '800', fontSize: '15px' }}>{cat.label}</span>
                  {count > 0 && (
                    <span
                      style={{
                        fontSize: '11px',
                        background: isActive ? 'var(--amber-primary)' : 'rgba(255, 255, 255, 0.1)',
                        color: isActive ? '#000000' : '#cbd5e1',
                        fontWeight: '700',
                        padding: '1px 6px',
                        borderRadius: '10px',
                      }}
                    >
                      {count}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '11px', color: isActive ? '#fde68a' : '#94a3b8' }}>
                  {cat.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
