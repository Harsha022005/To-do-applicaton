import React, { useState } from 'react';

function Calendarstreak() {
  const [completedDates, setCompletedDates] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDates = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const dates = [];

    for (let date = startOfMonth; date <= endOfMonth; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date)); 
    }

    return dates;
  };

  const toggleCompletion = (date) => {
    const dateKey = date.toDateString();
    setCompletedDates((prev) => ({
      ...prev,
      [dateKey]: !prev[dateKey],
    }));
  };

  const renderCalendar = () => {
    const monthDates = getMonthDates();
    const rows = [];
    let currentRow = [];

    monthDates.forEach((date, index) => {
      const isCompleted = completedDates[date.toDateString()] || false;
      const isToday = date.toDateString() === new Date().toDateString();

      currentRow.push(
        <div
          key={index}
          className={`w-16 h-16 flex items-center justify-center border ${
            isCompleted ? 'bg-green-500' : 'bg-gray-200'
          } ${isToday ? 'border-blue-500' : ''} cursor-pointer`}
          onClick={() => toggleCompletion(date)}
        >
          <span className={`${isToday ? 'text-blue-500' : 'text-gray-700'} font-bold`}>
            {date.getDate()}
          </span>
        </div>
      );

      if (currentRow.length === 7) {
        rows.push(<div key={index} className="flex">{currentRow}</div>);
        currentRow = [];
      }
    });

    if (currentRow.length > 0) {
   
      while (currentRow.length < 7) {
        currentRow.push(<div key={'empty' + currentRow.length} className="w-16 h-16 border" />);
      }
      rows.push(<div key="last-row" className="flex">{currentRow}</div>);
    }

    return rows;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="py-6">
        <h1 className="text-4xl font-bold text-white bg-yellow-500 px-6 py-3 rounded-lg shadow-md">
          Goal Tracker
        </h1>
      </div>

      <div className="mt-8">
        <div className="text-xl font-bold mb-4">{currentDate.toLocaleString('default', { month: 'long' })}</div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}

export default Calendarstreak;
