import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function successToast(text) {
  return toast.success(text, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

function errorToast(text) {
  return toast.error(text, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

function loadingToast(text) {
  return toast.loading(text, {
    position: toast.POSITION.TOP_CENTER,
  });
}

function loadingCompletedToast(text, alert) {
  return toast.update(alert, {
    render: text,
    type: 'success',
    isLoading: false,
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
}

function profileUpdating() {
  return toast.loading('Updating Profile...', {
    position: toast.POSITION.TOP_CENTER,
  });
}

function profileUpdateComplete(alert) {
  return toast.update(alert, {
    render: 'Updated Successfully',
    type: 'success',
    isLoading: false,
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
}

export {
  successToast,
  errorToast,
  loadingToast,
  loadingCompletedToast,
  profileUpdating,
  profileUpdateComplete,
};
