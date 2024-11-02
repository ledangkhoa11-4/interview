import { EToastStatus } from 'configs/enums';
import { ToastOptions, toast } from 'react-toastify';

interface ToastProps {
  status: EToastStatus;
}

const getTypeToast = (status: EToastStatus) => {
  switch (status) {
    case EToastStatus.Info:
      return 'info';
    case EToastStatus.Error:
      return 'error';
    case EToastStatus.Success:
      return 'success';
    case EToastStatus.Warning:
      return 'warning';
    default:
      return 'info';
  }
};

const show = (message: React.ReactNode, props: ToastProps) => {
  const options: ToastOptions = {
    autoClose: 800,
    type: getTypeToast(props?.status),
    hideProgressBar: true,
    position: 'bottom-right',
    pauseOnHover: true,
    className: 'toast-grade',
  };
  toast(message, options);
};

const error = (message: React.ReactNode, props?: ToastProps) => {
  show(message, { ...props, status: EToastStatus.Error });
};

const success = (message: React.ReactNode, props?: ToastProps) => {
  show(message, { ...props, status: EToastStatus.Success });
};

const info = (message: React.ReactNode, props?: ToastProps) => {
  show(message, { ...props, status: EToastStatus.Info });
};

const warning = (message: React.ReactNode, props?: ToastProps) => {
  show(message, { ...props, status: EToastStatus.Warning });
};

const toastService = { error, success, info, warning };

export default toastService;
