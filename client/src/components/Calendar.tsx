import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, parseISO, addMonths, subMonths, getDay, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  availableDates: string[]; // Array of available dates in 'yyyy-MM-dd' format
  onDateSelect: (date: string) => void; // Callback function when a date is selected
  selectedDate: string | null; // Currently selected date in 'yyyy-MM-dd' format
  currentMonth: Date; // The month currently displayed
  onMonthChange: (newMonth: Date) => void; // Callback when month changes
  maxDate?: Date; // Optional: Maximum selectable date
}

const Calendar: React.FC<CalendarProps> = ({ availableDates, onDateSelect, selectedDate, currentMonth, onMonthChange, maxDate }) => {

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start, end });
  const today = startOfDay(new Date()); // Get start of today

  // Get the day of the week for the first day of the month (0 for Sunday, 6 for Saturday)
  const firstDayOfWeek = getDay(start);

  // Create padding days at the start of the month
  const paddingDaysStart = Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`pad-start-${i}`} className="p-2"></div>);

  const handleDateClick = (date: Date | null) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      // Allow selection only if it's today or later AND it's in the availableDates list
      if (!isBefore(date, today) && availableDates.includes(dateString)) {
        onDateSelect(dateString);
      }
    }
  };

  const handlePrevMonth = () => {
    // Prevent going to previous months
    if (isBefore(currentMonth, startOfMonth(new Date()))) {
      return;
    }
    onMonthChange(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    // Prevent going beyond the maxDate
    if (maxDate && isBefore(maxDate, addMonths(currentMonth, 1))) {
      return;
    }
    onMonthChange(addMonths(currentMonth, 1));
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-300">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          // Disable going to past months relative to the current real-world month
          disabled={isBefore(currentMonth, startOfMonth(new Date()))}
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-gray-200"
          disabled={maxDate ? isBefore(maxDate, addMonths(currentMonth, 1)) : false} // Disable if beyond maxDate
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 font-medium mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {paddingDaysStart}
        {daysInMonth.map((day) => {
          const dateString = format(day, 'yyyy-MM-dd');
          const isAvailable = availableDates.includes(dateString);
          const isPast = isBefore(day, today);
          const isSelected = selectedDate ? isSameDay(day, parseISO(selectedDate)) : false;
          const isCurrentDay = isToday(day);

          let dayClasses = 'p-2 rounded-md transition-colors duration-150 ease-in-out '; // Added transition

          if (isPast) {
            dayClasses += 'text-gray-400 cursor-not-allowed'; // Style past dates
          } else if (isAvailable) {
            dayClasses += 'cursor-pointer '; // Base style for available dates
            if (isSelected) {
              dayClasses += 'bg-orange-500 text-white font-semibold hover:bg-orange-600'; // Selected date style
            } else {
              // Highlight available, non-selected dates
              dayClasses += 'bg-green-100 text-green-800 hover:bg-green-200 ';
              if (isCurrentDay) {
                dayClasses += 'border border-orange-500'; // Add border for today if available and not selected
              }
            }
          } else {
            dayClasses += 'text-gray-400 cursor-not-allowed'; // Style unavailable future dates
          }

          return (
            <div
              key={dateString}
              className={dayClasses}
              onClick={() => handleDateClick(day)}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
