import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { ReminderRequest, ReminderResponse } from '../../types/remindersProps';

type ChildrenProps = {
  children: ReactNode;
};

interface IReminderContext {
  reminderSelected: ReminderResponse | null;
  setReminderSelected: Dispatch<SetStateAction<ReminderResponse | null>>;
  reminders: ReminderResponse[] | null;
  setReminders: Dispatch<SetStateAction<ReminderResponse[] | null>>;
  newReminder: ReminderRequest | null;
  setNewReminder: Dispatch<SetStateAction<ReminderRequest | null>>;
}
const initialdata = {
  reminderSelected: null,
  setReminderSelected: () => {},
  reminders: null,
  setReminders: () => {},
  newReminder: null,
  setNewReminder: () => {},
};

export const ReminderContext = createContext<IReminderContext>(initialdata);

export const ReminderProvider = ({ children }: ChildrenProps) => {
  const [reminderSelected, setReminderSelected] =
    useState<ReminderResponse | null>(initialdata.reminderSelected);
  const [reminders, setReminders] = useState<ReminderResponse[] | null>(
    initialdata.reminders
  );
  const [newReminder, setNewReminder] = useState<ReminderRequest | null>(
    initialdata.newReminder
  );

  return (
    <ReminderContext.Provider
      value={{
        reminderSelected,
        setReminderSelected,
        reminders,
        setReminders,
        newReminder,
        setNewReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
