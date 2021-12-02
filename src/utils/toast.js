import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  width: 375px;
  .toast {
    background-color: black;
  }
  button {
    color: white;
  }
  .body {
    color: white;
    font-size: 18px;
  }
  .progress {
    color: #1face1;
  }
`;

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

export {
  StyledToastContainer,
  successToast,
  errorToast,
  loadingToast,
  loadingCompletedToast,
};
