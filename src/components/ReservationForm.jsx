import { useState } from 'react';
import './ReservationForm.css';

const initialForm = {
  name: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
};

function ReservationForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError('');
    setConfirmation('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError('');
    setConfirmation('');

    if (!form.name.trim()) {
      setError('Please enter your name, not just spaces.');
      return;
    }

    const requestedDate = new Date(`${form.date}T${form.time}`);

    if (
      Number.isNaN(requestedDate.getTime()) ||
      requestedDate <= new Date()
    ) {
      setError('Please choose a future date and time.');
      return;
    }

    setConfirmation(
      `Thanks, ${form.name.trim()}! Your demo request is for ${
        form.guests
      } guests on ${form.date} at ${form.time}. No real booking was made.`
    );
  }

  return (
    <section id="reservation" className="reservation">
      <h2>Reserve a Table</h2>

      <p>Gather your favorite people around our table.</p>

      <p id="reservation-help" className="reservation-note">
        Practice form: details are not sent or saved. Sample booking
        times are 12:00–21:00, using your device’s local time.
      </p>

      <form
        className="reservation-form"
        onSubmit={handleSubmit}
        aria-describedby="reservation-help"
      >
        <div className="reservation-field">
          <label htmlFor="reservation-name">Full name</label>
          <input
            id="reservation-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="reservation-field">
          <label htmlFor="reservation-email">Email address</label>
          <input
            id="reservation-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="reservation-field">
          <label htmlFor="reservation-date">Date</label>
          <input
            id="reservation-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="reservation-field">
          <label htmlFor="reservation-time">Time</label>
          <input
            id="reservation-time"
            name="time"
            type="time"
            min="12:00"
            max="21:00"
            step="1800"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="reservation-field">
          <label htmlFor="reservation-guests">Number of guests</label>
          <input
            id="reservation-guests"
            name="guests"
            type="number"
            min="1"
            max="8"
            step="1"
            value={form.guests}
            onChange={handleChange}
            required
          />
        </div>

        <button className="reservation-submit" type="submit">
          Send Demo Request
        </button>
      </form>

      {error && (
        <p className="reservation-error" role="alert">
          {error}
        </p>
      )}

      <p className="reservation-confirmation" role="status">
        {confirmation}
      </p>
    </section>
  );
}

export default ReservationForm;