import { memo } from "react";
import classes from "./styles.module.scss";
import ReactSelect, { components, CSSObjectWithLabel, GroupBase, MultiValueProps, OptionProps, SingleValueProps, StylesConfig } from "react-select";
import clsx from "clsx";
import { CheckIcon } from "assets";

const styles = (): StylesConfig<any, boolean, GroupBase<unknown>> => ({
  indicatorSeparator: () =>
    ({
      display: "none",
    } as CSSObjectWithLabel),
  indicatorsContainer: (provided, state) =>
    ({
      ...provided,
      "> div:last-child": { color: state.hasValue ? "var(--text)" : "var(--filterColorBlur)", padding: "8px 16px 8px 4px" },
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
      maxWidth: 250,
      borderRadius: 16,
      boxShadow: "none",
      background: state.hasValue || state.isFocused ? "var(--filterBackgroundActive)" : "var(--filterBackground)",
      border: '1px solid var(--darkGray)',
      "&:hover": {
        background: "var(--filterBackgroundActive)",
        ".react-select__placeholder": {
          color: "var(--text)",
        },
        ".react-select__dropdown-indicator": {
          color: "var(--text)",
        },
        ".react-select__single-value": {
          color: "var(--text)",
        },
      },
      ...(state.isFocused
        ? {
            ".react-select__placeholder": {
              color: "var(--text)",
            },
            ".react-select__dropdown-indicator": {
              color: "var(--text)",
            },
            ".react-select__single-value": {
              color: "var(--text)",
            },
          }
        : {}),
    } as CSSObjectWithLabel),
  clearIndicator: (provided) =>
    ({
      ...provided,
      padding: "8px 4px 8px 8px !important",
      color: "var(--filterColorBlur)",
      "&:hover": {
        color: "var(--text)",
      },
    } as CSSObjectWithLabel),
  valueContainer: (provided, state) =>
    ({
      ...provided,
      paddingLeft: 0,
      color: state.hasValue ? "var(--text)" : "var(--filterColorBlur)",
      fontSize: 14,
      fontWeight: 600,
    } as CSSObjectWithLabel),
  placeholder: (provided, state) =>
    ({
      ...provided,
      color: state.hasValue ? "var(--text)" : "var(--filterColorBlur)",
      fontSize: 14,
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
  multiValueLabel: (provided, state) =>
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
  option: (provided) =>
    ({
      ...provided,
      cursor: "pointer",
      color: "var(--text)",
      background: "var(--white)",
      borderRadius: 4,
      wordBreak: "break-all",
      fontSize: 14,
      fontWeight: 600,
      transition: "all 0.2s",
      "text-transform": "capitalize",
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

  const MultiValue = (props: MultiValueProps) => {
    const { index, getValue, selectProps } = props;

    const valueCount = getValue().length;

    return <>{valueCount === 0 ? `${selectProps.placeholder}` : index === 0 ? `${props.selectProps.placeholder} (${valueCount})` : null}</>;
  };

  const Option = ({ children, ...props }: OptionProps) => {
    return (
      <components.Option {...props}>
        {props.isSelected ? (
          <div className={classes.optionSelected}>
            <span>{children}</span>
            <CheckIcon />
          </div>
        ) : (
          children
        )}
      </components.Option>
    );
  };

  return (
    <ReactSelect
      className={clsx(className, { [classes.active]: active })}
      classNamePrefix="react-select"
      isSearchable={false}
      isClearable={true}
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
      components={{ SingleValue, Option, MultiValue }}
      {...rest}
    />
  );
});

export default Select;
