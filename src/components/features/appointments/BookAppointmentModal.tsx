export default function BookAppointmentModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
        <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}