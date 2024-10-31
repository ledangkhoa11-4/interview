import { memo } from "react";
import classes from "./styles.module.scss";
import ReactSelect, { components, CSSObjectWithLabel, GroupBase, SingleValueProps, StylesConfig } from "react-select";
import clsx from "clsx";

const styles = (): StylesConfig<any, boolean, GroupBase<unknown>> => ({
  indicatorSeparator: () =>
    ({
      display: "none",
    } as CSSObjectWithLabel),
  indicatorsContainer: (provided, state) =>
    ({
      ...provided,
      "> div": { color: state.hasValue ? "var(--text)" : "var(--filterColorBlur)", padding: "8px 16px 8px 4px" },
    } as CSSObjectWithLabel),
  container: (provided) =>
    ({
      ...provided,
      margin: 0,
    } as CSSObjectWithLabel),
  control: (provided, state) =>
    ({
      ...provided,
      paddingLeft: 16,
      cursor: "pointer",
      width: "fit-content",
      minWidth: 150,
      maxWidth: 200,
      border: "none",
      borderRadius: 16,
      boxShadow: "none",
      background: state.hasValue ? "var(--filterBackgroundActive)" : "var(--filterBackground)",
      "&:hover": {
        ".react-select__placeholder": {
          color: "var(--text)",
        },
        ".react-select__indicator": {
          color: "var(--text)",
        },
        ".react-select__single-value": {
          color: "var(--text)",
        },
      },
    } as CSSObjectWithLabel),
  valueContainer: (provided) =>
    ({
      ...provided,
      paddingLeft: 0,
    } as CSSObjectWithLabel),
  placeholder: (provided, state) =>
    ({
      ...provided,
      color: state.hasValue ? "var(--text)" : "var(--filterColorBlur)",
      fontSize: 13,
      fontWeight: 600,
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    } as CSSObjectWithLabel),
  singleValue: (provided, state) =>
    ({
      ...provided,
      color: state.hasValue ? "var(--text)" : "var(--filterColorBlur)",
      fontSize: 12,
      fontWeight: 600,
      margin: 0,
    } as CSSObjectWithLabel),
  menuPortal: (provided) =>
    ({
      ...provided,
      zIndex: 9999,
    } as CSSObjectWithLabel),
  menuList: (provided) =>
    ({
      ...provided,
      padding: 0,
    } as CSSObjectWithLabel),
  menu: (provided) =>
    ({
      ...provided,
      background: "var(--white)",
      boxShadow: "var(--dropdownBoxShadow)",
      padding: "16px 8px",
      margin: 0,
      width: 250,
    } as CSSObjectWithLabel),
  option: (provided, state) =>
    ({
      ...provided,
      cursor: "pointer",
      color: `var(--text)`,
      background: "var(--white)",
      borderRadius: 4,
      wordBreak: "break-all",
      fontSize: 12,
      fontWeight: 600,
      transition: "all 0.2s",
      "&:hover": {
        background: "var(--rowBackground)",
        transition: "all 0.2s",
      },
    } as CSSObjectWithLabel),
  noOptionsMessage: (provided) =>
    ({
      ...provided,
      fontSize: 14,
    } as CSSObjectWithLabel),
});

interface SelectProps {
  className?: string;
  label?: string;
  isMulti?: boolean;
  bindValue?: string;
  bindLabel?: string;
  active?: boolean;
  [key: string]: any;
}

const Select: React.FC<SelectProps> = memo((props: SelectProps) => {
  const { className, label, isMulti, active, bindValue, bindLabel, ...rest } = props;

  const SingleValue = ({ children, ...props }: SingleValueProps) => (
    <components.SingleValue {...props}>{label ? `${label} ${children}` : children}</components.SingleValue>
  );

  return (
    <ReactSelect
      className={clsx(className, { [classes.active]: active })}
      classNamePrefix="react-select"
      isSearchable={false}
      closeMenuOnSelect={!isMulti}
      hideSelectedOptions={false}
      blurInputOnSelect={false}
      backspaceRemovesValue={false}
      styles={styles()}
      isMulti={isMulti}
      menuPortalTarget={document.querySelector("body")}
      getOptionValue={(option: any) => option?.[bindValue || "value"]}
      getOptionLabel={(option: any) => option?.[bindLabel || "label"]}
      noOptionsMessage={() => "No results found"}
      components={{ SingleValue }}
      {...rest}
    />
  );
});

export default Select;
