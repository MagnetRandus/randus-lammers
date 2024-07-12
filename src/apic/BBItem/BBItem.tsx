import {
  DatePicker,
  DayOfWeek,
  IComboBox,
  IDatePickerStrings,
  IStackStyles,
  IStackTokens,
  registerIcons,
  Stack,
  TextField,
  TimePicker,
  ITextFieldStyles,
  ChoiceGroup,
  IChoiceGroupOption,
  IChoiceGroupStyleProps,
  IChoiceGroupStyles,
  IStyleFunctionOrObject,
} from "@fluentui/react";

import { initializeIcons } from "@fluentui/react/lib/Icons";
import {
  CalendarIcon,
  CancelIcon,
  SaveIcon,
  SaveAsIcon,
} from "@fluentui/react-icons-mdl2";
import { CloudBaseCU, CloudBaseR } from "iSurfaces/cloud-base-item";
import { BGender } from "iSurfaces/types";
import React, { useState } from "react";

initializeIcons();

registerIcons({
  icons: {
    calender: <CalendarIcon />,
    iconCancel: <CancelIcon />,
    iconSave: <SaveIcon />,
    iconUpdate: <SaveAsIcon />,
  },
});

const stackHorizStyles: IStackStyles = {
  root: [
    {
      marginRight: 10,
      minWidth: 125,
    },
  ],
  inner: {
    overflow: "hidden",
  },
};

const stackHorizToken: IStackTokens = {
  childrenGap: 10,
  padding: 0,
};

const styledisablespinner: Partial<ITextFieldStyles> = {
  fieldGroup: {
    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
      {
        "-webkit-appearance": "none",
        margin: 0,
      },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
  },
};

const styleRadioButtons: Partial<
  IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>
> = {
  flexContainer: {
    display: "flex",
    flexDirection: "row", // Ensure the radio buttons are in a row
    gap: "10px", // Add a gap between the radio buttons, you can adjust the value
  },
  field: {
    selectors: {
      div: {
        marginRight: "10px", // Add additional margin for spacing
      },
    },
  },
};

interface IPropsBBDetail {
  formData: Partial<CloudBaseR>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<CloudBaseCU>>>;
  validTagNrs: Array<string>;
}

const BBDetail: React.FC<IPropsBBDetail> = ({
  formData,
  setFormData,
  validTagNrs,
}) => {
  const [tagnr, setTagnr] = useState<string | undefined>(formData.tagnr);
  const [tagnrErrMsg, setTagnrErrMsg] = useState<string>("");

  const [gender, setGender] = useState<BGender | undefined>(
    formData.gender || "Buck"
  );
  const [dob, setDob] = useState<Date | undefined>();
  const [dobT, setDobT] = useState<Date | undefined>();

  const [sire, setSire] = useState<number>(0);
  const [sireErrMsg, setSireErrMsg] = useState<string>("");
  const [dam, setDam] = useState<number>(0);
  const [damErrMsg, setDamErrMsg] = useState<string>("");

  const handleTagNr = (
    ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const value = ev.target.value;
    if (validTagNrs.indexOf(value) === -1) {
      setTagnr(value);
      setFormData((pV) => {
        return { ...pV, tagnr: value };
      });
      setTagnrErrMsg("");
    } else {
      setTagnrErrMsg(`Please provide a valid value`);
    }
  };

  const handleGenderChange = (
    event: React.FormEvent<HTMLInputElement>,
    option: IChoiceGroupOption
  ) => {
    setGender(option.key as BGender);
    setFormData((pV) => {
      return { ...pV, gender: option.key as BGender };
    });
  };

  const handledobChange = (date: Date | undefined) => {
    setDob(date);
    setDobT(date);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: date };
    });
  };

  const handleTimeChange = (
    ev: React.FormEvent<IComboBox>,
    value: Date | undefined
  ) => {
    setDobT(value);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: value };
    });
  };

  const handleDamChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    const v = parseInt(value || "0", 10);
    const vI = isNaN(v) ? 0 : v;

    if (validTagNrs.includes(String(vI))) {
      setDam(vI);
      setFormData((pV) => {
        return { ...pV, damLookupId: vI };
      });
      setDamErrMsg("");
    } else {
      setDam(0);
      setDamErrMsg(`Valid selections are: ${validTagNrs.join(",")}`);
    }
  };

  const handleSireChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    const v = parseInt(value || "0", 10);
    const vI = isNaN(v) ? 0 : v;

    if (validTagNrs.includes(String(vI))) {
      setSire(vI);
      setFormData((pV) => {
        return { ...pV, sireLookupId: vI };
      });
      setSireErrMsg("");
    } else {
      setSire(0);
      setSireErrMsg(`Valid selections are: ${validTagNrs.join(",")}`);
    }
  };

  return (
    <Stack>
      <Stack horizontal styles={stackHorizStyles} tokens={stackHorizToken}>
        <TextField
          label="Tag Nr"
          name="tagnr"
          onChange={(ev, v) => setTagnr(v)}
          type="string"
          value={tagnr}
          errorMessage={tagnrErrMsg}
          styles={styledisablespinner}
          onFocus={() => setTagnr("")}
          onBlur={(ev) => handleTagNr(ev)}
          autoFocus
        />
        <ChoiceGroup
          label="Gender"
          selectedKey={gender}
          onChange={handleGenderChange}
          options={[
            { key: "Buck", text: "Buck" },
            { key: "Doe", text: "Doe" },
          ]}
          styles={styleRadioButtons}
        />
        <DatePicker
          label="Date of Birth"
          style={{ width: "190px" }}
          value={dob}
          onSelectDate={handledobChange}
          isRequired
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DayPickerStrings}
        />
        <TimePicker
          label="Time of Birth"
          value={dobT}
          onChange={handleTimeChange}
          disabled={!dob}
        />
        <TextField
          label="Sire"
          name="sire"
          onChange={handleSireChange}
          type="number"
          value={sire?.toString()}
          errorMessage={sireErrMsg}
          styles={styledisablespinner}
        />
        <TextField
          label="Dam"
          name="dam"
          onChange={handleDamChange}
          type="number"
          value={dam?.toString()}
          errorMessage={damErrMsg}
          styles={styledisablespinner}
        />
      </Stack>
    </Stack>
  );
};

export default BBDetail;
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-empty-function */
// import React, { useState } from "react";
// import {
//   TextField,
//   Dropdown,
//   IDropdownOption,
//   DatePicker,
//   DayOfWeek,
//   IDatePickerStrings,
//   Stack,
//   registerIcons,
//   IStackStyles,
//   IStackTokens,
//   DefaultButton,
//   IIconProps,
// } from "@fluentui/react";
// import { initializeIcons } from "@fluentui/react/lib/Icons";
// import {
//   CalendarIcon,
//   CancelIcon,
//   SaveIcon,
//   SaveAsIcon,
// } from "@fluentui/react-icons-mdl2";

// initializeIcons();

// registerIcons({
//   icons: {
//     calender: <CalendarIcon />,
//     iconCancel: <CancelIcon />,
//     iconSave: <SaveIcon />,
//     iconUpdate: <SaveAsIcon />,
//   },
// });

// import ModalConfirm from "../Ux/Modal/modal";
// import colorScheme from "../Styles/ColourScheme";
// import { CloudBaseR } from "iSurfaces/cloud-base-item";

// const updateIcon: IIconProps = {
//   iconName: "iconUpdate",
//   styles: { root: { color: colorScheme.coralOrange, fontSize: 20 } }, // Custom styles for the icon
// };
// const saveIcon: IIconProps = {
//   iconName: "iconSave",
//   styles: { root: { color: colorScheme.coralOrange, fontSize: 20 } }, // Custom styles for the icon
// };
// const iconCancel: IIconProps = {
//   iconName: "iconCancel",
//   styles: { root: { color: colorScheme.sageGreen, fontSize: 20 } }, // Custom styles for the icon
// };

// const stackStyles: IStackStyles = {
//   root: [
//     {
//       // marginLeft: 10,
//       marginRight: 10,
//       // minHeight: 100,
//       minWidth: 125,
//     },
//   ],
//   inner: {
//     overflow: "hidden",
//   },
// };

// const exampleStackTokens: IStackTokens = {
//   childrenGap: 10,
//   padding: 0,
// };

// interface IPropsBBDetail {
//   start: boolean;
// }

// const BBDetail: React.FC<IPropsBBDetail> = ({ start }) => {
//   [start];
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const [formData, setFormData] = useState<Partial<CloudBaseR>>({});

//   const handleInputChange = (
//     event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
//     newValue?: string
//   ) => {
//     const { name } = event.currentTarget;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: newValue,
//     }));
//   };

//   const handleDateChange = (date: Date | undefined) => {
//     // setFormData((prev) => {
//     //     return ({
//     //         ...prev,
//     //         dateOfBirth: date ?? undefined,
//     //     });
//     // });
//   };

//   const handleDropdownChange = (
//     event: React.FormEvent<HTMLDivElement>,
//     option?: IDropdownOption
//   ) => {};

//   const handleSubmit = () => {};

//   const handleUpdate = () => {};

//   const Cancel = () => {};

//   return (
//     <Stack
//       tokens={{ childrenGap: 20 }}
//       styles={{ root: { maxWidth: 400, margin: "0 auto" } }}
//     >
//       {/* {isEditMode ? (
//           <UXTextInBlock Label="ID" Value={formData.id} />
//         ) : (
//           <TextField
//             label="ID"
//             name="id"
//             value={formData.id}
//             onChange={handleInputChange}
//             required
//             type="number"
//             readOnly={isEditMode}
//           />
//         )} */}

//       <DatePicker
//         label="Date of Birth"
//         value={new Date()}
//         onSelectDate={handleDateChange}
//         isRequired
//         firstDayOfWeek={DayOfWeek.Sunday}
//         strings={DayPickerStrings}
//       />
//       <TextField
//         label="Sire"
//         name="sire"
//         value={"NADAH"}
//         onChange={handleInputChange}
//         type="number"
//       />
//       <TextField
//         label="Dam"
//         name="dam"
//         value={"NADAH"}
//         onChange={handleInputChange}
//         type="number"
//       />
//       <Dropdown
//         label="Gender"
//         selectedKey={formData.gender}
//         onChange={handleDropdownChange}
//         options={[
//           { key: "Buck", text: "Buck" },
//           { key: "Doe", text: "Doe" },
//         ]}
//         required
//       />
//       {/* <Stack horizontal styles={stackStyles} tokens={exampleStackTokens}>
//           {IdFocus === 0 ? (
//             <Stack.Item>
//               <DefaultButton
//                 title="Submit item"
//                 onClick={handleOpenModal}
//                 text="Submit"
//                 iconProps={saveIcon}
//               />
//               <ModalConfirm
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 onAccept={handleSubmit}
//                 modalTitle="Are you sure?"
//               />
//             </Stack.Item>
//           ) : (
//             <Stack.Item>
//               <DefaultButton
//                 title="Update item"
//                 onClick={handleOpenModal}
//                 text="Update"
//                 iconProps={updateIcon}
//               />
//               <ModalConfirm
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 onAccept={handleUpdate}
//                 modalTitle="Are you sure?"
//               />
//             </Stack.Item>
//           )}
//           <Stack.Item>
//             <DefaultButton
//               title="Cancel"
//               width={125}
//               onClick={Cancel}
//               iconProps={iconCancel}
//             >
//               Cancel
//             </DefaultButton>
//           </Stack.Item>
//         </Stack> */}
//     </Stack>
//   );
// };

// // Date Picker strings (you may need to adjust based on localization requirements)
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

// export default BBDetail;
