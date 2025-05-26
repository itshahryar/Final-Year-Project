import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000"; // Change to your FastAPI URL

export default function AlertDetails() {
  const { id } = useParams(); // Get the alert ID from the URL
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseDetails, setResponseDetails] = useState("");
  const [status, setStatus] = useState("Unresolved"); // Default status
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlertDetails() {
      try {
        const response = await fetch(`http://localhost:5000/alerts/specific/${id}`);
        const data = await response.json();
        setAlert(data);
      } catch (error) {
        console.error("Error fetching alert details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlertDetails();
  }, [id]);

  const handleMarkAsSpam = async () => {
    try {
      setSubmitting(true);
     
      await fetch(`http://localhost:5000/response/spam/${id}`, {
        method: "POST",
      });
      alert("Alert marked as spam successfully!");
    } catch (error) {
      console.error("Error marking as spam:", error);
    } finally {
      setSubmitting(false);
    }
    navigate("/dashboard/supervisor/viewalerts");
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(`http://localhost:5000/response/Updateresponse/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responseDetails, status }),
      });
      if (response.ok) {
        alert("Response submitted successfully!");
      } else {
        alert("Failed to submit response.");
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!alert) return <p className="text-center text-red-500">Alert not found!</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Alert Details</h2>
      <p className="text-gray-600 mt-2">{alert.description}</p>
      <p className="text-gray-500 mt-1 text-sm">Detected at: {new Date(alert.detectedAt).toLocaleString()}</p>

      <img
        src={`${API_BASE_URL}/alert-image/${id}.jpg`} 
        alt="Alert Snapshot"
        className="mt-4 w-full h-64 object-cover rounded-lg shadow-md"
      />

      {/* Mark as Spam Button */}
      <button
        onClick={handleMarkAsSpam}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        disabled={submitting}
      >
        {submitting ? "Processing..." : "Mark as Wrong Detection"}
      </button>

      {/* Response Form */}
      <form onSubmit={handleSubmitResponse} className="mt-6 bg-gray-100 p-4 rounded-lg">
        <label className="block text-gray-700 font-medium">Response Details:</label>
        <textarea
          className="w-full p-2 mt-2 border rounded-md"
          value={responseDetails}
          onChange={(e) => setResponseDetails(e.target.value)}
          required
        ></textarea>

        <label className="block mt-4 text-gray-700 font-medium">Status:</label>
        <select
          className="w-full p-2 mt-2 border rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Unresolved">Unresolved</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Response"}
        </button>
      </form>

      <Link to="/dashboard/supervisor/viewalerts" className="mt-4 inline-block text-blue-500">
        Back to Alerts
      </Link>
    </div>
  );
}
