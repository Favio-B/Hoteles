import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

// items: Array<{ label: string, to?: string }>
const Breadcrumb = ({ items = [] }) => {
  if (!items.length) return null;
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="breadcrumb-sep">/</span>}
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className="breadcrumb-current" aria-current="page">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;

