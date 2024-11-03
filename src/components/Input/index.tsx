import { forwardRef, memo } from "react";
import { OutlinedInput as MuiInput, InputProps as MuiInputProps } from "@mui/material";
import classes from "./styles.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends MuiInputProps {
  className?: string;
  textFieldRef?: UseFormRegisterReturn;
  [key: string]: any;
}

const Input: React.FC<InputProps & { ref?: React.Ref<HTMLInputElement> }> = memo(
  forwardRef((props: InputProps, ref: any) => {
    const { className, label, subLabel, textFieldRef, errorMessage, type, isOptional, ...rest } = props;

    const { ref: formRef, ...inputProps } = textFieldRef || { ref: null };

    return (
      <div className={classes.container}>
        <MuiInput {...inputProps} key={textFieldRef?.name} inputRef={formRef ?? ref} {...rest} size="small" />
      </div>
    );
  })
);

export default Input;
