export interface Option {
    label: string;
    value: string | number;
  }
  
  export interface SelectProps {
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    placeholder?: string;
    disabled?: boolean;
  }