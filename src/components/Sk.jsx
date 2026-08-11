// =============================================
// SKELETON BLOCK — reusable shimmer placeholder
// Usage: <Sk className="sk-line" style={{ width: '60%' }} />
// =============================================
import React from 'react';
import '../styles/Skeleton.css';

const Sk = ({ className = '', style = {}, ...props }) => (
  <div className={`skeleton-box ${className}`} style={style} {...props} />
);

export default Sk;
