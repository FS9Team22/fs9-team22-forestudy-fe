import './PasswordModal.css';

export function PasswordModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="password-modal-overlay" onClick={onClose}>
      <div
        className="password-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
