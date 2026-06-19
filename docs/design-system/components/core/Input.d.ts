import * as React from 'react';

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconLeft?: React.ReactNode;
  hint?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

/** Labeled form input with optional leading icon, hint and error states. */
export function Input(props: InputProps): JSX.Element;
