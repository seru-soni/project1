import React from 'react';
import styles from './Card.module.css';

export function Card({
  children,
  variant = 'glass', // 'glass' | 'elevated' | 'default'
  padding = 'md',    // 'none' | 'sm' | 'md' | 'lg'
  interactive = false,
  className = '',
  id,
  onClick,
  ...props
}) {
  const surfaceClass =
    variant === 'elevated'
      ? styles.surfaceElevated
      : variant === 'default'
      ? styles.surfaceDefault
      : styles.surfaceGlass;

  const padClass =
    padding === 'none'
      ? styles.padNone
      : padding === 'sm'
      ? styles.padSm
      : padding === 'lg'
      ? styles.padLg
      : styles.padMd;

  const cardClasses = [
    styles.card,
    surfaceClass,
    padClass,
    interactive ? styles.interactive : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div id={id} className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, children, className = '' }) {
  return (
    <div className={`${styles.header} ${className}`.trim()}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`.trim()}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`${styles.footer} ${className}`.trim()}>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
