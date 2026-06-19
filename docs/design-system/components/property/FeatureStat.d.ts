import * as React from 'react';

export interface FeatureStatProps {
  icon?: React.ReactNode;
  value: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
}

/** Icon + value + label stat used for property attributes (beds, baths, m²). */
export function FeatureStat(props: FeatureStatProps): JSX.Element;
