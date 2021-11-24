import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function signInToast() {
  return toast.success('Sign in successfully!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
}

export { signInToast };
