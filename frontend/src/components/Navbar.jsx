import React from 'react';
import { ShoppingBag, MapPin, Search, User, LogOut, Sparkles, Clock, History, BellRing, Heart } from 'lucide-react';

export default function Navbar({
  user,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAuth,
  onLogout,
  searchQuery,
  onSearchChange,
  isVegOnly,
  onToggleVeg,
  onOpenOrders,
  onTriggerDemoMsg,
}) {
  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      <div className="container-fluid flex-wrap-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '78px', gap: '1rem', padding: '10px 1rem' }}>

        {/* Brand Logo & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
              }}
            >
              <Sparkles color="#ffffff" size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>Feast</span>
                <span className="gradient-text" style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>Flow</span>
              </div>
              <p style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '700' }}>
                Gourmet Food Ordering
              </p>
            </div>
          </div>

          {/* Location Badge */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              fontSize: '13px',
              color: '#cbd5e1',
            }}
            className="d-md-flex"
          >
            <MapPin size={15} color="#f59e0b" />
            <span>FC Road, Pune</span>
            <span style={{ color: '#64748b' }}>•</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>25-35 min delivery</span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="w-100-mobile order-last-mobile" style={{ flex: 1, maxWidth: '420px', minWidth: '260px', position: 'relative' }}>
          <Search
            size={18}
            color="#94a3b8"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search Dosa, Misal Pav, Dim Sum, Burgers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 16px 11px 42px',
              borderRadius: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-glass)',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              transition: 'var(--transition-smooth)',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#f59e0b')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Actions & Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Veg Only Toggle */}
          <button
            onClick={onToggleVeg}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '12px',
              background: isVegOnly ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${isVegOnly ? '#10b981' : 'var(--border-glass)'}`,
              color: isVegOnly ? '#10b981' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'var(--transition-smooth)',
            }}
            title="Toggle Pure Veg Dishes"
          >
            <span className="badge-veg">
              <span className="badge-veg-dot"></span>
            </span>
            <span className="d-none-mobile" style={{ display: 'inline' }}>Veg Only</span>
          </button>

          {/* Test Msg Button */}
          <button
            onClick={onTriggerDemoMsg}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fbbf24',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'var(--transition-smooth)',
            }}
            title="Show me msg notification preview"
          >
            <BellRing size={16} />
            <span className="d-none-mobile">Show Msg</span>
          </button>

          {/* Orders History Button */}
          {user && (
            <button
              onClick={onOpenOrders}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-glass)',
                color: '#cbd5e1',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
              }}
              title="My Order History & Live Tracker"
            >
              <History size={16} />
              <span className="d-none-mobile">Orders</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="gradient-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 18px',
              borderRadius: '12px',
              fontSize: '14px',
              position: 'relative',
            }}
          >
            <ShoppingBag size={18} />
            <span className="d-none-mobile">Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: '#ffffff',
                  color: '#ea580c',
                  fontWeight: '800',
                  fontSize: '12px',
                  borderRadius: '10px',
                  padding: '2px 8px',
                  marginLeft: '2px',
                }}
              >
                {cartCount} • ₹{cartTotal}
              </span>
            )}
          </button>

          {/* User Auth / Profile */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-glass)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '13px',
                    color: '#ffffff',
                  }}
                >
                  {user.fullName ? user.fullName[0].toUpperCase() : user.username[0].toUpperCase()}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', lineHeight: 1.1 }}>
                    {user.fullName || user.username}
                  </p>
                  <p style={{ fontSize: '10px', color: '#10b981' }}>Logged In</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  padding: '8px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-glass)',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'var(--amber-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'var(--border-glass)';
              }}
            >
              <User size={18} color="#f59e0b" />
              <span className="d-none-mobile">Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
