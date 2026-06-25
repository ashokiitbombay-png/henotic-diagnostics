import React from "react";
import Modal from "@/components/ui/Modal";
import BookingForm from "@/components/forms/BookingForm";

export default function BookAppointmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BookingForm />
    </Modal>
  );
}