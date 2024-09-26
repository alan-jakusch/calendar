import { useState, useEffect } from "react";

const useAgenda = () => {
  const [agenda, setAgenda] = useState(() => {
    try {
      const storedAgenda = localStorage.getItem("agenda");
      return storedAgenda ? JSON.parse(storedAgenda) : {};
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to parse agenda from localStorage", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("agenda", JSON.stringify(agenda));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to save agenda to localStorage", error);
    }
  }, [agenda]);

  const saveAgenda = (newAgenda) => {
    setAgenda(newAgenda);
  };

  const addReminder = (date, reminder) => {
    const newAgenda = { ...agenda };

    if (!newAgenda[date]) {
      newAgenda[date] = [];
    }

    newAgenda[date].push(reminder);
    saveAgenda(newAgenda);
  };

  const removeReminder = (date, reminderIndex) => {
    const newAgenda = { ...agenda };

    if (newAgenda[date]) {
      newAgenda[date].splice(reminderIndex, 1);
      if (newAgenda[date].length === 0) {
        delete newAgenda[date];
      }
      saveAgenda(newAgenda);
    }
  };

  const editReminder = (date, reminderIndex, newReminder) => {
    const newAgenda = { ...agenda };

    if (newAgenda[date] && newAgenda[date][reminderIndex]) {
      newAgenda[date][reminderIndex] = newReminder;
      saveAgenda(newAgenda);
    }
  };

  const getReminders = (date) => {
    return agenda[date] || [];
  };

  return {
    addReminder,
    removeReminder,
    editReminder,
    getReminders,
    agenda,
  };
};

export default useAgenda;
