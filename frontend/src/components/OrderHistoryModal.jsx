import React from 'react';
import { X, CheckCircle2, Clock, Bike, PackageCheck, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';

export default function OrderHistoryModal({
  isOpen,
  onClose,
  orders = [],
  onUpdateStatus,
}) {
  if (!isOpen) return null;

  const getStatusStep = (status) => {
    switch (status) {
      case 'CONFIRMED': return 1;
      case 'PREPARING': return 2;
      case 'OUT_FOR_DELIVERY': return 3;
      case 'DELIVERED': return 4;
      default: return 1;
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'CONFIRMED': return 'PREPARING';
      case 'PREPARING': return 'OUT_FOR_DELIVERY';
      case 'OUT_FOR_DELIVERY': return 'DELIVERED';
      default: return 'DELIVERED';
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
          maxWidth: '680px',
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
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>Your Orders & Live Tracking</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Real-time updates on your delicious meals</p>
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

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ fontSize: '15px', color: '#94a3b8' }}>No orders placed yet.</p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Add items to cart and checkout to track your orders in real time!
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const step = getStatusStep(order.status);
              const nextStatus = getNextStatus(order.status);
              const isDelivered = order.status === 'DELIVERED';

              return (
                <div
                  key={order.id || order.orderNumber}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '18px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>
                          {order.orderNumber}
                        </h4>
                        <span
                          style={{
                            background: isDelivered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            color: isDelivered ? '#10b981' : '#f59e0b',
                            border: `1px solid ${isDelivered ? '#10b981' : '#f59e0b'}`,
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '10px',
                          }}
                        >
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                        From {order.restaurant?.name || 'Restaurant'} • {order.estimatedDeliveryMinutes || 25} mins ETA
                      </p>
                    </div>

                    <span style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff' }}>
                      ₹{order.finalAmount}
                    </span>
                  </div>

                  {/* Progress Tracker Bar */}
                  <div style={{ margin: '8px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '11px', fontWeight: '700' }}>
                      <span style={{ color: step >= 1 ? '#f59e0b' : '#64748b' }}>✓ Confirmed</span>
                      <span style={{ color: step >= 2 ? '#f59e0b' : '#64748b' }}>🍳 Kitchen</span>
                      <span style={{ color: step >= 3 ? '#f59e0b' : '#64748b' }}>🛵 On the Way</span>
                      <span style={{ color: step >= 4 ? '#10b981' : '#64748b' }}>🎉 Delivered</span>
                    </div>

                    <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${(step / 4) * 100}%`,
                          background: isDelivered ? '#10b981' : 'linear-gradient(90deg, #f59e0b, #ea580c)',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div style={{ fontSize: '12px', color: '#cbd5e1', background: 'rgba(0, 0, 0, 0.2)', padding: '10px 14px', borderRadius: '10px' }}>
                      <p style={{ fontWeight: '700', color: '#94a3b8', marginBottom: '4px' }}>Dishes:</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.quantity}x {item.foodName}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Simulation Button for User Demonstration */}
                  {!isDelivered && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => onUpdateStatus(order.id, nextStatus)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(245, 158, 11, 0.15)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          color: '#fbbf24',
                          padding: '6px 12px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                        title="Simulate driver and kitchen update"
                      >
                        <RefreshCw size={13} />
                        <span>Simulate Next Step ({nextStatus.replace(/_/g, ' ')})</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
