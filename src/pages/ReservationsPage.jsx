import ReservationForm from '../components/ReservationForm.jsx';

function ReservationsPage() {
  return (
    <>
      <div className="page-intro">
        <h1>Make time for a good meal.</h1>
        <p>A table for two or a gathering with friends.</p>
      </div>

      <ReservationForm />
    </>
  );
}

export default ReservationsPage;