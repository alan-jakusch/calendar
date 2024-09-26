import { Card, CardContent } from "@material-ui/core";
import ReminderForm from "components/Forms/ReminderForm";
import Reminder from "components/Reminder/Reminder";
import { useAgendaContext } from "context/AgendaContext";
import { useModal } from "context/ModalContext";
import PropTypes from "prop-types";
import { formatDate } from "utils/dateUtils";

const CalendarDay = ({ day, month, year, height, isEnabled = false }) => {
  const { openModal, closeModal } = useModal();
  const { addReminder, editReminder, removeReminder, getReminders } =
    useAgendaContext();

  const date = formatDate(day, month, year);
  const reminders =
    getReminders(date)?.sort((a, b) => {
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);

      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    }) || [];

  function handleAdd() {
    function onCreateReminder(reminder) {
      addReminder(reminder.date, reminder);
      closeModal();
    }
    openModal(
      <ReminderForm
        date={date}
        onSave={onCreateReminder}
        onCancel={closeModal}
      />,
      "Create Reminder"
    );
  }

  function handleEdit(index) {
    openModal(
      <ReminderForm
        date={reminders[index].date}
        time={reminders[index].time}
        reminder={reminders[index].reminder}
        city={reminders[index].city}
        onSave={(reminder) => {
          if (reminder.date !== reminders[index].date) {
            removeReminder(reminders[index].date, index);
            addReminder(reminder.date, reminder);
          } else {
            editReminder(reminder.date, index, reminder);
          }
          closeModal();
        }}
        onCancel={closeModal}
      />,
      "Edit Reminder"
    );
  }

  return (
    <Card
      variant="outlined"
      style={{ height }}
      className={
        isEnabled
          ? "calendar-day-card"
          : "calendar-day-card calendar-day-card--disabled"
      }
      onClick={handleAdd}
    >
      <CardContent className="calendar-day-content">
        <div className="calendar-day-content-grid">
          <div className="calendar-day-header">
            <p className="calendar-day-text calendar-day-header-text">{day}</p>
          </div>
          <div className="calendar-day-reminder-list">
            {reminders?.map((reminder, index) => (
              <Reminder
                key={`${reminder}-${index}`}
                date={reminder.date}
                time={reminder.time}
                text={reminder.reminder}
                city={reminder.city}
                onClick={(event) => {
                  event.stopPropagation();
                  handleEdit(index);
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number,
  year: PropTypes.number,
  height: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
};

export default CalendarDay;
