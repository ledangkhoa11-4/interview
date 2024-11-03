import { forwardRef, memo } from "react";
import { OutlinedInput as MuiInput, InputProps as MuiInputProps } from "@mui/material";
import classes from "./styles.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

interface InputProps extends MuiInputProps {
  className?: string;
  textFieldRef?: UseFormRegisterReturn;
  [key: string]: any;
}

const Input: React.FC<InputProps & { ref?: React.Ref<HTMLInputElement> }> = memo(
  forwardRef((props: InputProps, ref: any) => {
    const { className, textFieldRef, errorMessage, type, ...rest } = props;

    const { ref: formRef, ...inputProps } = textFieldRef || { ref: null };

    return (
      <div className={clsx(classes.container, className)}>
        <MuiInput {...inputProps} key={textFieldRef?.name} inputRef={formRef ?? ref} type={type} size="small" {...rest} />
      </div>
    );
  })
);

export default Input;
