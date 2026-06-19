import * as React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  variant?: 'gold' | 'navy' | 'neutral' | 'success' | 'warning' | 'danger';
  /** @default "soft" */
  tone?: 'solid' | 'soft' | 'line';
  style?: React.CSSProperties;
}

/** Compact status / category label in the brand caps face. */
export function Badge(props: BadgeProps): JSX.Element;
