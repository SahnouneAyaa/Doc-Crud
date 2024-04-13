import { useEffect, useState } from 'react';
import { format, addDays } from 'date-fns';

export default function Home() {
  const [scheduleData, setScheduleData] = useState([]);
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch('/api/schedule/write the token here/route'); // Change the endpoint to match your API route
        const data = await response.json();
        setScheduleData(data.map(date => ({ ...date, count: 0 }))); // Add count property to each date object
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    
    fetchScheduleData();
  }, []);

  // Process schedule data to extract days the user works on
  const workingDays = scheduleData.map(schedule => schedule.day);

  // Get the next 30 days from the current date
  const today = new Date();
  const next30Days = Array.from({ length: 30 }, (_, index) => addDays(today, index));

  // Filter the working days from the next 30 days
  const upcomingWorkingDays = next30Days.filter(date => {
    const dayOfWeek = format(date, 'EEEE'); // Get the day of the week
    return workingDays.includes(dayOfWeek);
  });

  // Handle booking functionality
  const handleDateClick = (date) => {
    // Here, you would typically send a request to your backend to book the appointment for the user
    // and update the database accordingly. For simplicity, we'll just update the frontend state here.

    // Find the date object in scheduleData
    const bookedDate = scheduleData.find(item => item.date === date);

    // Increment the count for the booked date
    if (bookedDate && bookedDate.count < 10) {
      bookedDate.count++;
    }

    // Remove the date from the frontend table when count reaches 10
    if (bookedDate && bookedDate.count === 10) {
      const updatedScheduleData = scheduleData.filter(item => item.date !== date);
      setScheduleData(updatedScheduleData);
    }
  };

  // Render table with upcoming working days
  return (
    <div>
      <h1>Upcoming Working Days for the Next 30 Days</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {upcomingWorkingDays.map(({ date, count }) => (
            <tr key={date}>
              <td onClick={() => handleDateClick(date)}>{format(date, 'EEEE, MMMM do')}</td>
              <td>{format(date, 'EEEE')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
