import React from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/global.css';

export default function ToastNotifications() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div key={toast.id} className={`toast-card toast-${toast.type}`}>
            <span className="toast-icon">
              {isSuccess && <CheckCircle size={18} />}
              {isWarning && <AlertTriangle size={18} />}
              {!isSuccess && !isWarning && <Info size={18} />}
            </span>
            
            <p className="toast-message">{toast.message}</p>
            
            <button 
              className="toast-close" 
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 10000;
          pointer-events: none;
          max-width: 320px;
          width: 100%;
        }

        .toast-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--color-card);
          border-radius: var(--border-radius-md);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border-left: 5px solid var(--color-primary);
          pointer-events: all;
          transform: translateX(-40px);
          opacity: 0;
          animation: toast-slide-in 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transition: var(--transition-smooth);
        }

        .toast-message {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text);
          flex-grow: 1;
        }

        .toast-close {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: var(--transition-smooth);
        }

        .toast-close:hover {
          background-color: var(--color-border);
          color: var(--color-accent);
        }

        /* Success Type */
        .toast-success {
          border-left-color: var(--color-success);
        }
        .toast-success .toast-icon {
          color: var(--color-success);
        }

        /* Warning Type */
        .toast-warning {
          border-left-color: var(--color-warning);
        }
        .toast-warning .toast-icon {
          color: var(--color-warning);
        }

        /* Info / Default Type */
        .toast-info {
          border-left-color: var(--color-primary);
        }
        .toast-info .toast-icon {
          color: var(--color-primary);
        }

        @keyframes toast-slide-in {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
