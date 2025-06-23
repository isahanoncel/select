import React, { useState, useEffect, useRef } from "react";
import styles from "./Select.module.scss";
import { Option, SelectProps } from "./Select.types";
import { useClickOutside } from "../../hooks/useClickOutside";

function Select({ options, value = [], onChange, placeholder }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const selectOption = (option: Option) => {
    if (value.find((v) => v.value === option.value)) {
      onChange(value.filter((v) => v.value !== option.value));
    } else {
      onChange([...value, option]);
    }
    setInputValue("");
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newOption = {
        label: inputValue,
        value: inputValue.toLowerCase().replace(/\s/g, "-"),
      };
      if (!options.some((o) => o.value === newOption.value) && !value.some((v) => v.value === newOption.value)) {
        onChange([...value, newOption]);
      }
      setInputValue("");
      e.preventDefault();
    }
  };

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={styles.selectContainer} ref={containerRef}>
      <div className={styles.select} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.selectedValue}>
          {value.map((v) => (
            <span key={v.value} className={styles.tag}>
              {v.label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={styles.removeTag}
              >
                &times;
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={value.length === 0 ? (placeholder || "Select...") : ""}
            className={styles.input}
            onFocus={() => setIsOpen(true)}
          />
        </div>
        <span className={`${styles.caret} ${isOpen ? styles.open : ""}`}></span>
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => selectOption(option)}
              className={`${styles.option} ${
                value.find((v) => v.value === option.value) ? styles.selected : ""
              }`}
            >
              {option.label}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className={styles.optionDisabled}>No options found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export { Select };
