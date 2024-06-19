import React, { useState } from "react";
import {
  TextField,
  Dropdown,
  IDropdownOption,
  DatePicker,
  DayOfWeek,
  IDatePickerStrings,
  PrimaryButton,
  Stack,
  registerIcons,
} from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import IIBBForm from "../interfaces/IIBBForm";
import dbmapIBB from "../dbmap/dbmap-IBB";
import { TSetRecord, TShwRecord } from "../types";

import { CalendarIcon } from "@fluentui/react-icons-mdl2";

interface IPropsBBForm {
  addRecord: TSetRecord;
  shwRecord: TShwRecord;
  IdFocus: number;
}

const BBDetail: React.FC<IPropsBBForm> = ({
  addRecord,
  shwRecord,
  IdFocus,
}) => {
  const zRec = {
    id: "",
    dateOfBirth: undefined as Date | undefined,
    sire: "",
    dam: "",
    gender: "",
  } as IIBBForm;

  if (IdFocus !== 0) {
    const record = shwRecord(IdFocus);
    zRec.id = String(record.id);
    if (record.dateOfBirth) zRec.dateOfBirth = new Date(record.dateOfBirth);
    zRec.gender = record.gender;
    if (record.dam) zRec.dam = String(record.dam);
    if (record.sire) zRec.dam = String(record.sire);
  }
  const [formData, setFormData] = useState<IIBBForm>(zRec);

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const { name } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleDateChange = (date: Date | null | undefined) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date ?? undefined,
    }));
  };

  const handleDropdownChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    const { key } = option || {};
    setFormData((prev) => ({
      ...prev,
      gender: key as string,
    }));
  };

  const handleSubmit = () => {
    addRecord(dbmapIBB(formData));
  };

  React.useEffect(() => {
    initializeIcons();

    registerIcons({
      icons: {
        calender: <CalendarIcon />,
      },
    });
  }, []);

  return (
    <form>
      <Stack
        tokens={{ childrenGap: 20 }}
        styles={{ root: { maxWidth: 400, margin: "0 auto" } }}
      >
        <TextField
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          required
          type="number"
        />
        <DatePicker
          label="Date of Birth"
          value={formData.dateOfBirth}
          onSelectDate={handleDateChange}
          isRequired
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DayPickerStrings}
        />
        <TextField
          label="Sire"
          name="sire"
          value={formData.sire}
          onChange={handleInputChange}
          type="number"
        />
        <TextField
          label="Dam"
          name="dam"
          value={formData.dam}
          onChange={handleInputChange}
          type="number"
        />
        <Dropdown
          label="Gender"
          selectedKey={formData.gender}
          onChange={handleDropdownChange}
          options={[
            { key: "Buck", text: "Buck" },
            { key: "Doe", text: "Doe" },
          ]}
          required
        />
        {IdFocus === 0 ? (
          <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
        )}
      </Stack>
    </form>
  );
};

// Date Picker strings (you may need to adjust based on localization requirements)
const DayPickerStrings: IDatePickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDays: ["S", "M", "T", "W", "T", "F", "S"],
  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker",
  isRequiredErrorMessage: "Field is required.",
  invalidInputErrorMessage: "Invalid date format.",
};

export default BBDetail;
