import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ReportSelectionForm = ({ onGenerate }) => {
  const [month, setMonth] = useState('');
  const [site, setSite] = useState('');
  const [time, setTime] = useState('');
  const [command, setCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [hasImproved, setHasImproved] = useState(false);

  const handleGenerate = async () => {
    if (!month || !site || !time || !command) {
      toast.error("❗ Please fill all fields before generating the report.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/getreportdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month, site, time, command }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch report data');
      }

      const data = await response.json();
      onGenerate(data);
      toast.success('✅ Report generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error(`🚫 Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImproveCommand = () => {
    if (!command.trim()) {
      toast.error("⚠️ Please enter a command to improve.");
      return;
    }

    setIsImproving(true);
    setTimeout(() => {
      const improved = `${command.trim()} --smart=true`;
      setCommand(improved);
      setHasImproved(true);
      toast.success("✨ Command improved!");
      setIsImproving(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">🧠 Select Report Parameters</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Month</label>
          <select className="w-full p-2 border rounded" value={month} onChange={e => setMonth(e.target.value)}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="May">May</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Site</label>
          <select className="w-full p-2 border rounded" value={site} onChange={e => setSite(e.target.value)}>
            <option value="">Select Site</option>
            <option value="Site A">Site A</option>
            <option value="Site B">Site B</option>
            <option value="Construction Site 5">Construction Site 5</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Time</label>
          <select className="w-full p-2 border rounded" value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Select Time</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="1:52 PM">1:52 PM</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Command Prompt</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-black text-green-400 font-mono"
            placeholder="generate-report --site=SiteA --month=March"
            value={command}
            onChange={e => {
              setCommand(e.target.value);
              setHasImproved(false);
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? '⏳ Generating...' : '📝 Generate Report'}
        </button>

        <button
          onClick={handleImproveCommand}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          disabled={isImproving || hasImproved}
        >
          {isImproving ? '⏳ Improving...' : '✨ Improve Command'}
        </button>
      </div>
    </div>
  );
};

export default ReportSelectionForm;