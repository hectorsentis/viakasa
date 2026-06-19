import * as React from 'react';

export interface PropertyFeature {
  icon?: React.ReactNode;
  value: React.ReactNode;
  label?: string;
}

/**
 * @startingPoint section="Property" subtitle="Listing card with status & features" viewport="380x440"
 */
export interface PropertyCardProps {
  image?: string;
  title: string;
  location?: string;
  price: string;
  priceNote?: string;
  status?: string;
  statusVariant?: 'gold' | 'navy' | 'neutral' | 'success' | 'warning' | 'danger';
  features?: PropertyFeature[];
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Signature Viakasa listing card — image, status, location, title, price, features. */
export function PropertyCard(props: PropertyCardProps): JSX.Element;
