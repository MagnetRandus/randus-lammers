/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DatePicker,
  DayOfWeek,
  IComboBox,
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

import {
  Dispatch,
  FC,
  FocusEvent,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { BuckDoe } from "Types/BuckDoe";
import DatePickerStrings from "Interfaces/DatePickerStrings";
import { TSPListBaseCreate } from "Interfaces/LISTS/base/IGraphListItemCustomField";
import IdTagNr from "Interfaces/IdTagNr";
import { HorizStack } from "Ux/StackHorizontal";
import ThemeColor from "Ux/ColorScheme";

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
  setFormData: Dispatch<SetStateAction<Partial<TSPListBaseCreate> | undefined>>;
  validTagNrs: Array<IdTagNr>;
  SetPageIsValid: Dispatch<SetStateAction<boolean>>;
}

const ItemForm: FC<IPropsBBDetail> = ({
  formData,
  setFormData,
  validTagNrs,
  SetPageIsValid,
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

  const [gender, setGender] = useState<BuckDoe | undefined>(formData.gender);
  const [dob, setDob] = useState<Date>(formData.dateOfBirth);
  const [dobT, setDobT] = useState<Date>(formData.dateOfBirth);

  const [sire, setSire] = useState<string | undefined>(siretagNr);
  const [sireErrMsg, setSireErrMsg] = useState<string>("");
  const [dam, setDam] = useState<string | undefined>(damtagNr);
  const [damErrMsg, setDamErrMsg] = useState<string>("");

  const Validate = () => {
    const a = tagnrErrMsg === undefined || tagnrErrMsg === "";
    const b = sireErrMsg === undefined || sireErrMsg === "";
    const c = damErrMsg === undefined || damErrMsg === "";
    SetPageIsValid(a && b && c);
  };

  const handleTagNr = (
    ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const value = ev.target.value;
    if (value) {
      if (validTagNrs.findIndex((j) => j.TagNr === value) === -1) {
        setTagnr(value);
        setFormData((pV) => {
          return { ...pV, tagnr: value };
        });
        setTagNrErrMsg(``);
      } else {
        setTagNrErrMsg(`Tag Nr [${value} is already allocated]`);
      }
    } else {
      setTagNrErrMsg(`Provide a Tag Nr`);
    }

    Validate();
  };

  const handleBuckDoeChange = (
    event: FormEvent<HTMLInputElement>,
    option: IChoiceGroupOption
  ) => {
    setGender(option.key as BuckDoe);
    setFormData((pV) => {
      return { ...pV, gender: option.key as BuckDoe };
    });
  };

  const handledobChange = (date: Date) => {
    setDob(date);
    setDobT(date);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: date };
    });
  };

  const handleTimeChange = (ev: FormEvent<IComboBox>, value: Date) => {
    setDobT(value);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: value };
    });
  };

  const validTagsFor = (buckDoe: BuckDoe): string => {
    return validTagNrs
      .filter((j) => j.Gender === buckDoe)
      .sort((a, b) => {
        return parseInt(a.TagNr, 10) - parseInt(b.TagNr, 10);
      })
      .map((j) => j.TagNr)
      .join(",");
  };

  const handleDamChange = (
    ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
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
          setDamErrMsg(`Can only be a doe [${validTagsFor("Doe")}]`);
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
    ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
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
          setSireErrMsg(`Can only be a buck [${validTagsFor("Buck")}]`);
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

  const [StackHorizStyles, stackHorizToken] = HorizStack({
    bgColor: ThemeColor.almondCream,
    bordercolor: ThemeColor.peachBeige,
    gap: 0,
    childrenGap: 0,
    marginBottom: 0,
  });

  return (
    <>
      <Stack horizontal styles={StackHorizStyles} tokens={stackHorizToken}>
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
          disabled={formData.tagnr !== "0"}
        />
        <ChoiceGroup
          label="Gender"
          selectedKey={gender}
          onChange={handleBuckDoeChange}
          options={[
            { key: "Buck", text: "Buck" },
            { key: "Doe", text: "Doe" },
          ]}
          styles={styleRadioButtons}
          onBlur={() => Validate()}
        />
        <DatePicker
          label="Date of Birth"
          style={{ width: "190px" }}
          value={dob}
          onSelectDate={handledobChange}
          isRequired
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DatePickerStrings}
          onBlur={() => Validate()}
        />
        <TimePicker
          label="Time of Birth"
          value={dobT}
          onChange={handleTimeChange}
          disabled={!dob}
          onBlur={() => Validate()}
        />
        <TextField
          label="Sire"
          name="sire"
          onChange={handleSireChange}
          type="number"
          value={sire?.toString()}
          errorMessage={sireErrMsg}
          styles={styledisablespinner}
          onBlur={() => Validate()}
        />
        <TextField
          label="Dam"
          name="dam"
          onChange={handleDamChange}
          type="number"
          value={dam?.toString()}
          errorMessage={damErrMsg}
          styles={styledisablespinner}
          onBlur={() => Validate()}
          onKeyUp={(ev) => {
            console.log(ev.key);
            if (ev.key === "Backspace") {
              (ev.target as HTMLInputElement).value = "undefined";
            }
          }}
        />
      </Stack>
    </>
  );
};

export default ItemForm;
