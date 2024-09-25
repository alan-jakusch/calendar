import React, { useState } from "react";

import { DateNavigator, CalendarGrid } from "components";
import Modal from "components/Modal/Modal";
import { ModalProvider } from "context/ModalContext";
import { getCurrentDate } from "utils/dateUtils";

const Calendar = () => {
  const { month, year, date } = getCurrentDate();
  const [selectedDate, setSelectedDate] = useState({ date, month, year });

  return (
    <ModalProvider>
      <div className="container">
        <DateNavigator
          date={selectedDate?.date}
          handleDateChange={setSelectedDate}
        />
        <CalendarGrid date={selectedDate?.date} />
        <Modal />
      </div>
    </ModalProvider>
  );
};

export default Calendar;
