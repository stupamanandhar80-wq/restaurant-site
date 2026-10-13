export const initialReservationState = {
  step: 'details',
  form: {
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
  },
  error: '',
};

export function reservationReducer(state, action) {
  switch (action.type) {
    case 'field_changed':
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: action.value,
        },
        error: '',
      };

    case 'validation_failed':
      return {
        ...state,
        error: action.message,
      };

    case 'review':
      return {
        ...state,
        step: 'review',
        error: '',
      };

    case 'edit':
      return {
        ...state,
        step: 'details',
        error: '',
      };

    case 'complete':
      return {
        ...state,
        step: 'complete',
        error: '',
      };

    case 'reset':
      return initialReservationState;

    default:
      throw new Error(`Unknown reservation action: ${action.type}`);
  }
}