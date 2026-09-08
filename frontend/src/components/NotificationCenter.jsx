import React from 'react';
import { CheckCircle2, AlertCircle, Info, Bell, X, Flame } from 'lucide-react';

export default function NotificationCenter({ notifications, onDismiss }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '420px',
        width: 'calc(100% - 40px)',
        pointerEvents: 'none',
      }}
    >
      {notifications.map((msg) => {
        const isSuccess = msg.type === 'success';
        const isOrder = msg.type === 'order';
        const isError = msg.type === 'error';

        const borderColor = isSuccess ? '#10b981' : isOrder ? '#f59e0b' : isError ? '#ef4444' : '#3b82f6';
        const bgGradient = isSuccess 
          ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(15, 23, 42, 0.95))' 
          : isOrder 
          ? 'linear-gradient(135deg, rgba(120, 53, 15, 0.95), rgba(15, 23, 42, 0.95))' 
          : isError
          ? 'linear-gradient(135deg, rgba(127, 29, 29, 0.95), rgba(15, 23, 42, 0.95))'
          : 'linear-gradient(135deg, rgba(30, 58, 138, 0.95), rgba(15, 23, 42, 0.95))';

        return (
          <div
            key={msg.id}
            className="animate-toast"
            style={{
              pointerEvents: 'auto',
              background: bgGradient,
              backdropFilter: 'blur(16px)',
              border: `1px solid ${borderColor}`,
              boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 15px ${borderColor}33`,
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                marginTop: '2px',
                background: `${borderColor}22`,
                padding: '8px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: borderColor,
              }}
            >
              {isSuccess && <CheckCircle2 size={20} />}
              {isOrder && <Flame size={20} />}
              {isError && <AlertCircle size={20} />}
              {!isSuccess && !isOrder && !isError && <Bell size={20} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>
                  {msg.title || (isOrder ? 'Order Notification' : isSuccess ? 'Success' : 'Message')}
                </h4>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: `${borderColor}33`,
                    color: borderColor,
                    fontWeight: '600',
                  }}
                >
                  LIVE
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.4 }}>
                {msg.text}
              </p>
            </div>

            <button
              onClick={() => onDismiss(msg.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              title="Close message"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
