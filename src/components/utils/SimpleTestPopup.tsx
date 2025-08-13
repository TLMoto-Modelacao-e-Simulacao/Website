interface SimpleTestPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleTestPopup({ isOpen, onClose }: SimpleTestPopupProps) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginBottom: '20px', color: 'black' }}>Test Popup</h2>
        <p style={{ marginBottom: '20px', color: 'black' }}>This is a simple test popup to verify functionality.</p>
        <button 
          onClick={onClose}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
