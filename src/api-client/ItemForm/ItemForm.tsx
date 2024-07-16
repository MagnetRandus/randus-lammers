/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DatePicker,
  DayOfWeek,
  IComboBox,
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
import React, { useState } from "react";
import { Gender } from "Types/Gender";
import DatePickerStrings from "Interfaces/DatePickerStrings";

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
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<Partial<any>>>;
  validTagNrs: Array<string>;
}

const ItemForm: React.FC<IPropsBBDetail> = ({
  formData,
  setFormData,
  validTagNrs,
}) => {
  const [tagnr, setTagnr] = useState<string | undefined>(formData.tagnr);
  const [tagnrErrMsg, setTagnrErrMsg] = useState<string>("");

  const [gender, setGender] = useState<Gender | undefined>(
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
    setGender(option.key as Gender);
    setFormData((pV) => {
      return { ...pV, gender: option.key as Gender };
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
          strings={DatePickerStrings}
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

export default ItemForm;
