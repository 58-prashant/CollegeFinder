import React, { useState } from 'react';
import axios from 'axios';

const StartEventForm = () => {
  const [title, setTitle] = useState('');
  const [availableSlots, setAvailableSlots] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/events', {
        title,
        available_slots: availableSlots,
        start_time: startTime,
        end_time: endTime,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setTitle('');
      setAvailableSlots('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Start Event</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Available Slots:</label>
          <input
            type="number"
            value={availableSlots}
            onChange={(e) => setAvailableSlots(e.target.value)}
            required
            min="1"
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div>
          <button type="submit">Start Event</button>
        </div>
      </form>
    </div>
  );
};

export default StartEventForm;
