import { useEffect, useReducer, useRef } from "react";
import {
  initialReservationState,
  reservationReducer,
} from "../reducers/reservationReducer.js";
import "./ReservationForm.css";

const fields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "date",
    label: "Date",
    type: "date",
  },
  {
    name: "time",
    label: "Time",
    type: "time",
    min: "12:00",
    max: "21:00",
    step: 1800,
  },
  {
    name: "guests",
    label: "Number of guests",
    type: "number",
    min: 1,
    max: 8,
    step: 1,
  },
];

const stepTitles = {
  details: "1. Your details",
  review: "2. Review your request",
  complete: "3. Demo complete",
};

function validateReservation(form) {
  if (!form.name.trim()) {
    return "Please enter your name, not just spaces.";
  }

  const requestedDate = new Date(`${form.date}T${form.time}`);

  if (Number.isNaN(requestedDate.getTime()) || requestedDate <= new Date()) {
    return "Please choose a future date and time.";
  }

  return "";
}

function ReservationForm() {
  const [state, dispatch] = useReducer(
    reservationReducer,
    initialReservationState,
  );

  const stepHeadingRef = useRef(null);
  const previousStep = useRef(state.step);

  useEffect(() => {
    if (previousStep.current !== state.step) {
      stepHeadingRef.current?.focus();
    }

    previousStep.current = state.step;
  }, [state.step]);

  function handleChange(event) {
    dispatch({
      type: "field_changed",
      name: event.target.name,
      value: event.target.value,
    });
  }

  function handleReview(event) {
    event.preventDefault();

    const message = validateReservation(state.form);

    if (message) {
      dispatch({ type: "validation_failed", message });
      return;
    }

    dispatch({ type: "review" });
  }

  function handleComplete() {
    const message = validateReservation(state.form);

    if (message) {
      dispatch({ type: "validation_failed", message });
      return;
    }

    dispatch({ type: "complete" });
  }

  return (
    <section id="reservation" className="reservation">
      <h2>Reserve a Table</h2>

      <p id="reservation-help" className="reservation-note">
        Booking times: 12:00–21:00, using your device’s local time. This
        demonstration does not send or save a reservation.
      </p>

      <h3
        className="reservation-step-heading"
        ref={stepHeadingRef}
        tabIndex={-1}
      >
        {stepTitles[state.step]}
      </h3>

      {state.step === "details" && (
        <form
          className="reservation-form"
          onSubmit={handleReview}
          aria-describedby="reservation-help"
        >
          {fields.map((field) => (
            <div className="reservation-field" key={field.name}>
              <label htmlFor={`reservation-${field.name}`}>{field.label}</label>

              <input
                id={`reservation-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                min={field.min}
                max={field.max}
                step={field.step}
                value={state.form[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button className="reservation-submit" type="submit">
            Review request
          </button>
        </form>
      )}

      {state.step === "review" && (
        <div className="reservation-review">
          <p>Check your details before completing the demo.</p>

          <dl className="reservation-summary">
            <div>
              <dt>Name</dt>
              <dd>{state.form.name.trim()}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{state.form.email}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{state.form.date}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{state.form.time}</dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{state.form.guests}</dd>
            </div>
          </dl>

          <div className="reservation-actions">
            <button
              className="reservation-secondary"
              type="button"
              onClick={() => dispatch({ type: "edit" })}
            >
              Edit details
            </button>

            <button
              className="reservation-submit"
              type="button"
              onClick={handleComplete}
            >
              Complete demo request
            </button>
          </div>
        </div>
      )}

      {state.step === "complete" && (
        <div className="reservation-success">
          <p>
            Thanks, {state.form.name.trim()}! You completed the reservation
            demonstration for {state.form.guests} guests on {state.form.date} at{" "}
            {state.form.time}.
          </p>

          <p>No booking was made and no email was sent.</p>

          <button
            className="reservation-secondary"
            type="button"
            onClick={() => dispatch({ type: "reset" })}
          >
            Start another request
          </button>
        </div>
      )}

      {state.error && (
        <p className="reservation-error" role="alert">
          {state.error}
        </p>
      )}
    </section>
  );
}

export default ReservationForm;
