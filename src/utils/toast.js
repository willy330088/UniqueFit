import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function signInToast() {
  return toast.success('Sign in successfully!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
}

function noTitleError() {
  return toast.error('Please fill in title', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

function noTargetMuscleGroupError() {
  return toast.error('Please choose target muscle group', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

function noEstimatedTrainingTimeError() {
  return toast.error('Please fill in estimated training time', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

function noDescriptionError() {
  return toast.error('Please fill in description', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

function noWorkoutsError() {
  return toast.error('Please add workouts', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

function noWeightOrRepsError() {
  return toast.error(`Please fill in weights and reps`, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

export {
  signInToast,
  noTitleError,
  noTargetMuscleGroupError,
  noEstimatedTrainingTimeError,
  noDescriptionError,
  noWorkoutsError,
  noWeightOrRepsError,
};
