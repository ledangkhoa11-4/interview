export interface ISelectOption {
  value: string;
  label: string;
}

export interface IConfirmModal {
  isOpen: boolean;
  title: string;
  description: string;
  onSubmit: (...args: any) => void;
}