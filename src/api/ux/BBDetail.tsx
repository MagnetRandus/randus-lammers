import React, { useState } from "react";
import {
  TextField,
  Dropdown,
  IDropdownOption,
  DatePicker,
  DayOfWeek,
  IDatePickerStrings,
  Stack,
  registerIcons,
  IStackStyles,
  IStackTokens,
  DefaultButton,
  IIconProps,
} from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import {
  CalendarIcon,
  CancelIcon,
  SaveIcon,
  SaveAsIcon,
} from "@fluentui/react-icons-mdl2";

initializeIcons();

registerIcons({
  icons: {
    calender: <CalendarIcon />,
    iconCancel: <CancelIcon />,
    iconSave: <SaveIcon />,
    iconUpdate: <SaveAsIcon />,
  },
});
import IIBBForm from "../interfaces/IIBBForm";
import dbmapIBB from "../dbmap/dbmap-IBB";
import { dbCrudOps } from "../types";

import UXTextInBlock from "./Styles/UXTextInBlock";

import styles from "./BBDetail.module.scss";
import ModalConfirm from "./Components/modal";
import colorScheme from "./Styles/ColourScheme";

const updateIcon: IIconProps = {
  iconName: "iconUpdate",
  styles: { root: { color: colorScheme.coralOrange, fontSize: 20 } }, // Custom styles for the icon
};
const saveIcon: IIconProps = {
  iconName: "iconSave",
  styles: { root: { color: colorScheme.coralOrange, fontSize: 20 } }, // Custom styles for the icon
};
const iconCancel: IIconProps = {
  iconName: "iconCancel",
  styles: { root: { color: colorScheme.sageGreen, fontSize: 20 } }, // Custom styles for the icon
};

const stackStyles: IStackStyles = {
  root: [
    {
      // marginLeft: 10,
      marginRight: 10,
      // minHeight: 100,
      minWidth: 125,
    },
  ],
  inner: {
    overflow: "hidden",
  },
};

const exampleStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 0,
};

interface IPropsBBForm extends dbCrudOps {
  IdFocus: number;
  SetAddingStock: React.Dispatch<React.SetStateAction<boolean>>;
  SetIdfocus: React.Dispatch<React.SetStateAction<number>>;
}

const BBDetail: React.FC<IPropsBBForm> = ({
  addRecord,
  shwRecord,
  updRecord,
  IdFocus,
  SetAddingStock,
  SetIdfocus,
}) => {
  // const theme = useTheme();
  // const defaultFontSize = theme.fonts.medium.fontSize;
  // const defaultFontColor = theme.palette.neutralPrimary;
  // console.dir([defaultFontColor, defaultFontSize]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const isEditMode = IdFocus !== 0;
  const zRec = {
    id: "",
    dateOfBirth: undefined as Date | undefined,
    sire: "",
    dam: "",
    gender: "",
  } as IIBBForm;

  if (isEditMode) {
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

  const handleDateChange = (date: Date | undefined) => {
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
    setIsModalOpen(false);
    SetIdfocus(0); //Close BBDetailView;
  };

  const handleUpdate = () => {
    updRecord(dbmapIBB(formData));
    setIsModalOpen(false);
    SetIdfocus(0); //Close BBDetailView;
  };

  const Cancel = () => {
    SetIdfocus(0); //Close BBDetailView;
    SetAddingStock(false); //Close BBDetailView;
  };

  return (
    <form className={styles.BBDetail}>
      <Stack
        tokens={{ childrenGap: 20 }}
        styles={{ root: { maxWidth: 400, margin: "0 auto" } }}
      >
        {isEditMode ? (
          <UXTextInBlock Label="ID" Value={formData.id} />
        ) : (
          <TextField
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            required
            type="number"
            readOnly={isEditMode}
          />
        )}

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
        <Stack horizontal styles={stackStyles} tokens={exampleStackTokens}>
          {IdFocus === 0 ? (
            <Stack.Item>
              <DefaultButton
                title="Submit item"
                onClick={handleOpenModal}
                text="Submit"
                iconProps={saveIcon}
              />
              <ModalConfirm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAccept={handleSubmit}
                modalTitle="Are you sure?"
              />
            </Stack.Item>
          ) : (
            <Stack.Item>
              <DefaultButton
                title="Update item"
                onClick={handleOpenModal}
                text="Update"
                iconProps={updateIcon}
              />
              <ModalConfirm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAccept={handleUpdate}
                modalTitle="Are you sure?"
              />
            </Stack.Item>
          )}
          <Stack.Item>
            <DefaultButton
              title="Cancel"
              width={125}
              onClick={Cancel}
              iconProps={iconCancel}
            >
              Cancel
            </DefaultButton>
          </Stack.Item>
        </Stack>
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
