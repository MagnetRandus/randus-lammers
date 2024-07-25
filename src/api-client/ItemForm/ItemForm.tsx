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
import { IBuckDoe } from "Types/BuckDoe";
import DatePickerStrings from "Interfaces/DatePickerStrings";
import { TSPListBaseCreate } from "Interfaces/LISTS/base/IGraphListItemCustomField";
import IdTagNr from "Interfaces/IdTagNr";
import { HorizStack } from "Ux/StackHorizontal";
import ThemeColor from "Ux/ColorScheme";
import {
  BBIdentFromItemId,
  BBIdentFromTagNr,
  validTagsFor,
} from "Tools/BBIdent";

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
  BBIdents: Array<IdTagNr>;
  SetPageIsValid: Dispatch<SetStateAction<boolean>>;
  setStatusMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ItemForm: FC<IPropsBBDetail> = ({
  formData,
  setFormData,
  BBIdents,
  SetPageIsValid,
  setStatusMessage,
}) => {
  const { damLookupId, dateOfBirth, bbSks, sireLookupId, tagnr } = formData;

  const [sttTagnrErrMsg, SetTagNrErrMsg] = useState<string | undefined>();
  const [sttSireErrMsg, SetSireErrMsg] = useState<string>("");
  const [sttDamErrMsg, SetDamErrMsg] = useState<string>("");

  const Validate = () => {
    const a = sttTagnrErrMsg === undefined || sttTagnrErrMsg === "";
    const b = sttSireErrMsg === undefined || sttSireErrMsg === "";
    const c = sttDamErrMsg === undefined || sttDamErrMsg === "";
    SetPageIsValid(a && b && c);
  };

  const handleTagNr = (
    ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const value = ev.target.value;
    if (value) {
      const bbident = BBIdentFromTagNr(BBIdents, value);

      if (bbident === undefined) {
        setFormData((pV) => {
          return { ...pV, tagnr: value };
        });
        SetTagNrErrMsg(``);
      } else {
        SetTagNrErrMsg(`Tag Nr [${value} is already allocated]`);
      }

      Validate();
    }
  };

  const handleBuckDoeChange = (
    event: FormEvent<HTMLInputElement>,
    option: IChoiceGroupOption
  ) => {
    setFormData((pV) => {
      return { ...pV, bbSks: option.key as IBuckDoe };
    });
  };

  const handledobChange = (date: Date) => {
    // SetDob(date);
    // SetDobT(date);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: date };
    });
  };

  const handleTimeChange = (ev: FormEvent<IComboBox>, value: Date) => {
    // SetDobT(value);
    setFormData((pV) => {
      return { ...pV, dateOfBirth: value };
    });
  };

  const handleDamChange = (
    ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string | undefined
  ) => {
    if (value) {
      const bbident = BBIdentFromTagNr(BBIdents, value);

      if (bbident && bbident.Sks === "Doe") {
        setFormData((pV) => {
          return {
            ...pV,
            damLookupId: bbident.ItemId,
          };
        });
        SetDamErrMsg("");
        setStatusMessage("");
      } else {
        setStatusMessage(
          `Valid TagNrs (Doe): [${validTagsFor(BBIdents, "Doe")
            ?.map((j) => j.TagNr)
            .join(",")}]`
        );
        SetDamErrMsg(`Not Valid`);
      }
    } else {
      setFormData((pV) => {
        return {
          ...pV,
          damLookupId: undefined,
        };
      });
      SetDamErrMsg("");
    }
  };

  const handleSireChange = (
    ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    if (value) {
      const bbident = BBIdentFromTagNr(BBIdents, value);

      if (bbident && bbident.Sks === "Buck") {
        setFormData((pV) => {
          return {
            ...pV,
            sireLookupId: bbident.ItemId,
          };
        });
        SetSireErrMsg("");
        setStatusMessage("");
      } else {
        setStatusMessage(
          `Valid TagNrs (Buck): [${validTagsFor(BBIdents, "Buck")
            ?.map((j) => j.TagNr)
            .join(",")}]`
        );
        SetSireErrMsg(`Not Valid`);
      }
    } else {
      setFormData((pV) => {
        return {
          ...pV,
          damLookupId: undefined,
        };
      });
      SetDamErrMsg("");
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
          type="string"
          value={(() => {
            return tagnr === "0" ? undefined : tagnr;
          })()}
          errorMessage={sttTagnrErrMsg}
          styles={styledisablespinner}
          onBlur={(ev) => handleTagNr(ev)}
          onChange={(ev) => {
            setFormData((pV) => {
              return {
                ...pV,
                tagnr: (ev.target as HTMLInputElement).value,
              };
            });
          }}
          autoFocus={formData.tagnr === "0"}
          // disabled={formData.tagnr !== "0"}
        />
        <ChoiceGroup
          label="bbSks"
          selectedKey={bbSks}
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
          value={dateOfBirth}
          onSelectDate={handledobChange}
          isRequired
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DatePickerStrings}
          onBlur={() => Validate()}
        />
        <TimePicker
          label="Time of Birth"
          value={dateOfBirth}
          onChange={handleTimeChange}
          disabled={!dateOfBirth}
          onBlur={() => Validate()}
        />
        <TextField
          label="Sire"
          name="sire"
          onChange={handleSireChange}
          type="number"
          value={BBIdentFromItemId(BBIdents, sireLookupId)?.TagNr}
          errorMessage={sttSireErrMsg}
          styles={styledisablespinner}
          onBlur={() => Validate()}
        />
        <TextField
          label="Dam"
          name="dam"
          onChange={handleDamChange}
          type="number"
          value={BBIdentFromItemId(BBIdents, damLookupId)?.TagNr}
          errorMessage={sttDamErrMsg}
          styles={styledisablespinner}
          onBlur={() => Validate()}
          onKeyUp={(ev) => {
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
