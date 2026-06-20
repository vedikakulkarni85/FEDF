import React from 'react';

const DashboardCard = ({ title, value, type = 'default' }) => {
  const cardClass = type === 'warning' ? 'card card-warning' : 'card';
  return (
    <div className={cardClass}>
      <h3>{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default DashboardCard;