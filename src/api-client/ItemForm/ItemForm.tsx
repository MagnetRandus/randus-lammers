/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DatePicker,
  DayOfWeek,
  IComboBox,
  IStackStyles,
  IStackTokens,
  Stack,
  TextField,
  TimePicker,
  ITextFieldStyles,
  ChoiceGroup,
  IChoiceGroupOption,
  IChoiceGroupStyleProps,
  IChoiceGroupStyles,
  IStyleFunctionOrObject,
  BaseButton,
} from "@fluentui/react";

import React, { useState } from "react";
import { Gender } from "Types/Gender";
import DatePickerStrings from "Interfaces/DatePickerStrings";
import { TSPListBaseCreate } from "Interfaces/LISTS/base/IGraphListItemCustomField";
import IdTagNr from "Interfaces/IdTagNr";
import colorScheme from "Ux/ColorScheme";
import { StackHorizStyles } from "Ux/StackHorizontal";

const stackHorizStyles: IStackStyles = {
  root: [
    {
      marginRight: 10,
      minWidth: 125,
      backgroundColor: colorScheme.almondCream,
      paddingBottom: 12,
      paddingLeft: 12,
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
  formData: TSPListBaseCreate;
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<TSPListBaseCreate> | undefined>
  >;
  validTagNrs: Array<IdTagNr>;
}

const ItemForm: React.FC<IPropsBBDetail> = ({
  formData,
  setFormData,
  validTagNrs,
}) => {
  const damtagNr = formData.damLookupId
    ? validTagNrs.filter(
        (j) => j.ItemId === formData.damLookupId?.toString()
      )[0].TagNr
    : undefined;
  const siretagNr = formData.sireLookupId
    ? validTagNrs.filter(
        (j) => j.ItemId === formData.sireLookupId?.toString()
      )[0].TagNr
    : undefined;

  const [tagnr, setTagnr] = useState<string | undefined>(formData.tagnr);
  const [tagnrErrMsg, setTagNrErrMsg] = useState<string | undefined>();

  const [gender, setGender] = useState<Gender | undefined>(formData.gender);
  const [dob, setDob] = useState<Date>(formData.dateOfBirth);
  const [dobT, setDobT] = useState<Date>(formData.dateOfBirth);

  const [sire, setSire] = useState<string | undefined>(siretagNr);
  const [sireErrMsg, setSireErrMsg] = useState<string>("");
  const [dam, setDam] = useState<string | undefined>(damtagNr);
  const [damErrMsg, setDamErrMsg] = useState<string>("");

  const handleTagNr = (
    ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const value = ev.target.value;
    if (validTagNrs.findIndex((j) => j.TagNr === value) === -1) {
      setTagnr(value);
      setFormData((pV) => {
        return { ...pV, tagnr: value };
      });
      setTagNrErrMsg(``);
    } else {
      setTagNrErrMsg(`Tag Nr [${value} is already allocated]`);
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

  const handledobChange = (date: Date) => {
    setDob(date);
    setDobT(date);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: date };
    });
  };

  const handleTimeChange = (ev: React.FormEvent<IComboBox>, value: Date) => {
    setDobT(value);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: value };
    });
  };

  const handleDamChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string | undefined
  ) => {
    if (value) {
      const bbRefIdx = validTagNrs.findIndex((j) => {
        return j.TagNr === value;
      });

      if (bbRefIdx !== -1) {
        if (validTagNrs[bbRefIdx].Gender === "Doe") {
          setDam(validTagNrs[bbRefIdx].TagNr);
          setFormData((pV) => {
            return {
              ...pV,
              damLookupId: parseInt(validTagNrs[bbRefIdx].ItemId, 10),
            };
          });
          setDamErrMsg("");
        } else {
          setDamErrMsg("Can only be a doe");
        }
      } else {
        setDam(undefined);
        setDamErrMsg(
          `Valid: ${validTagNrs
            .filter((j) => j.Gender === "Doe")
            .map((j) => j.TagNr)
            .join(",")}`
        );
      }
    } else {
      setDam(undefined);
      setFormData((pV) => {
        return {
          ...pV,
          damLookupId: null,
        };
      });
      setDamErrMsg("");
    }
  };

  const handleSireChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    if (value) {
      const bbRefIdx = validTagNrs.findIndex((j) => {
        return j.TagNr === value;
      });

      if (bbRefIdx !== -1) {
        if (validTagNrs[bbRefIdx].Gender === "Buck") {
          setSire(validTagNrs[bbRefIdx].TagNr);
          setFormData((pV) => {
            return {
              ...pV,
              sireLookupId: parseInt(validTagNrs[bbRefIdx].ItemId, 10),
            };
          });
          setSireErrMsg("");
        } else {
          setSire("Can only be a buck");
        }
      } else {
        setSire(undefined);
        setSireErrMsg(`Valid: ${validTagNrs.map((j) => j.TagNr).join(",")}`);
      }
    } else {
      setSire(undefined);
      setFormData((pV) => {
        return {
          ...pV,
          sireLookupId: null,
        };
      });
      setSireErrMsg("");
    }
  };

  return (
    <>
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
            autoFocus={formData.tagnr === "0"}
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
      {formData.tagnr !== "0" && (
        <Stack horizontal styles={StackHorizStyles} tokens={stackHorizToken}>
          <BaseButton
            onClick={() => {
              console.log("do weight stuff");
            }}
          >
            Weight
          </BaseButton>
          <BaseButton
            onClick={() => {
              console.log("do weight stuff");
            }}
          >
            Medicine
          </BaseButton>
        </Stack>
      )}
    </>
  );
};

export default ItemForm;
