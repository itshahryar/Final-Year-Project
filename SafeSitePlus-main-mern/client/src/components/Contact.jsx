import { useState } from 'react';

export default function Contact({ listing }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const adminEmail = 'admin@example.com'; // Replace with admin's email
      const subject = `Regarding ${listing.name}`;
      const body = message;

      // Send email via mailto link or custom API
      window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;

      // Optional: Show success message or clear the message box
      setStatus('Message sent successfully!');
      setMessage('');
    } catch (error) {
      setStatus('Failed to send message, please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Message Box */}
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your message here..."
        className="w-full p-3 border rounded-lg"
      />

      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95"
      >
        Send Message to Admin
      </button>

      {/* Status Message */}
      {status && (
        <p className="mt-3 text-green-600">
          {status}
        </p>
      )}
    </div>
  );
}

