import * as React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** @default "left" */
  align?: 'left' | 'center';
  /** Reverse colors for navy backgrounds. @default false */
  invert?: boolean;
  /** Show the short gold rule before the eyebrow. @default true */
  rule?: boolean;
  style?: React.CSSProperties;
}

/** Eyebrow + serif title + intro block — the section rhythm device. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
