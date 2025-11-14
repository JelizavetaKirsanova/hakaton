'use client'
export function Modal({ children, isOpen, onClose }: { children: React.ReactNode, isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow">
          {children}
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  }
  