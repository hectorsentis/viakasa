import * as React from 'react';

export interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Gold top accent border. @default false */
  accent?: boolean;
  style?: React.CSSProperties;
}

/** Service / value proposition card with a framed navy icon tile. */
export function ServiceCard(props: ServiceCardProps): JSX.Element;
