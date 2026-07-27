import React from 'react';
import '../css/global.css';

// Loading Spinner Component
export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="pink-spinner"></div>
      
      <style>{`
        .spinner-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          width: 100%;
        }

        .pink-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--color-border);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Product Loading Skeleton Card
export function ProductSkeleton() {
  return (
    <div className="skeleton-card glass-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-row skeleton-category"></div>
        <div className="skeleton-row skeleton-title"></div>
        <div className="skeleton-row skeleton-desc"></div>
        <div className="skeleton-row skeleton-footer"></div>
      </div>

      <style>{`
        .skeleton-card {
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          background-color: var(--color-card);
        }

        .skeleton-image {
          width: 100%;
          padding-top: 100%;
          background: linear-gradient(90deg, #FFF0F5 25%, #FCE8F0 50%, #FFF0F5 75%);
          background-size: 200% 100%;
          animation: pulse-shimmer 1.5s infinite;
        }

        .skeleton-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-row {
          height: 16px;
          border-radius: 8px;
          background: linear-gradient(90deg, var(--color-bg) 25%, var(--color-border) 50%, var(--color-bg) 75%);
          background-size: 200% 100%;
          animation: pulse-shimmer 1.5s infinite;
        }

        .skeleton-category {
          width: 40%;
          height: 12px;
        }

        .skeleton-title {
          width: 80%;
          height: 20px;
        }

        .skeleton-desc {
          width: 100%;
          height: 32px;
        }

        .skeleton-footer {
          width: 100%;
          height: 24px;
          margin-top: 10px;
        }

        @keyframes pulse-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
