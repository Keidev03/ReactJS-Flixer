import React from 'react';

const formatDate: React.FC<string> = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

interface DateProps {
  text: string
  date: string
}

const DateDisplay: React.FC<DateProps> = ({ text, date }) => {
  return (
    <div>
      <strong>{text}: </strong>
      <span>{formatDate(date)}</span>
    </div>
  );
};

export default DateDisplay