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
  DropdownBase,
  IDropdownOption,
  IDropdownStyleProps,
  IDropdownStyles,
} from "@fluentui/react";

import {
  Dispatch,
  FC,
  FocusEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IBuckDoe } from "Types/BuckDoe";
import DatePickerStrings from "Interfaces/DatePickerStrings";
import IdTagNr from "Interfaces/IBBIdent";
import { HorizStack } from "Ux/StackHorizontal";
import ThemeColor from "Ux/ColorScheme";
import {
  BBIdentFromItemId,
  BBIdentFromTagNr,
  validTagsFor,
} from "Tools/BBIdent";
import BaseSiresCreate from "Interfaces/BaseSires";
import { TSPListBaseCreate } from "Interfaces/LISTS/base/IGraphListItemCustomField";

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
  root: {
    marginTop: -5,
  },
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

const dropdownStyles: IStyleFunctionOrObject<
  IDropdownStyleProps,
  IDropdownStyles
> = {
  root: {
    display: "inline-block",
    width: 125,
  },
  label: {
    // width: "100%", // Adjust the width as needed
    display: "block",
    marginBottom: "8px", // Add some space between the label and the dropdown
  },
  dropdown: {
    // width: "100%",
    height: "auto",
    backgroundColor: ThemeColor.almondCreamLight,
    border: `1px solid ${ThemeColor.desertTan}`,
    padding: "5px",
    "margin-top": "-7px",
    selectors: {
      ":hover": { cursor: "pointer" },

      ".ms-Dropdown-title": {
        height: "32px",
        lineHeight: "32px",
        padding: "0 12px",
      },
      ".ms-Dropdown-caretDownWrapper": {
        height: "32px",
        lineHeight: "32px",
      },
      i: {
        float: "right",
      },
    },
  },
  dropdownItem: {
    height: "32px",
    lineHeight: "32px",
    padding: "0 12px",
    display: "block",
  },
  dropdownItemSelected: {
    height: "32px",
    lineHeight: "32px",
    padding: "0 12px",
  },
  dropdownOptionText: {
    // width: "100%",
    height: "32px",
    lineHeight: "32px",
  },
};

interface IPropsBBDetail {
  formData: TSPListBaseCreate;
  setFormData: Dispatch<SetStateAction<Partial<BaseSiresCreate> | undefined>>;
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
  const { damLookupId, dateOfBirth, bbSks, tagnr, bbWeight, bbStatus } =
    formData;

  const [bbident] = useState<IdTagNr | undefined>(
    BBIdentFromTagNr(BBIdents, tagnr)
  );

  const [sttValidateSireIds, SetValidateSireIds] = useState<boolean>(true);

  const [sttTagnrErrMsg, SetTagNrErrMsg] = useState<string | undefined>();
  const [sttWeightErrMsg, SetWeightErrMsg] = useState<string | undefined>();
  const [sttSireErrMsg, SetSireErrMsg] = useState<string>("");
  const [sttDamErrMsg, SetDamErrMsg] = useState<string>("");

  useEffect(() => {
    if (sttValidateSireIds) SetSireErrMsg("");
  }, [sttValidateSireIds, SetValidateSireIds]);

  const Validate = (): void => {
    const a = sttTagnrErrMsg === undefined || sttTagnrErrMsg === "";
    const b =
      sttSireErrMsg === "" || (sttSireErrMsg === "" && sttValidateSireIds);
    const c = sttDamErrMsg === undefined || sttDamErrMsg === "";
    const d = sttWeightErrMsg === undefined || sttWeightErrMsg === "";

    SetPageIsValid(a && b && c && d);
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

  const validateWeight = (
    ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const value = ev.target.value;

    if (!isNaN(parseFloat(value)) || parseFloat(value) >= 0) {
      setFormData((pV) => {
        return { ...pV, bbWeight: parseFloat(value) };
      });
      SetWeightErrMsg(``);
    } else {
      SetWeightErrMsg(`Not valid`);
    }
    Validate();
  };
  const handleStatusChange = (
    event: FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    console.log(`Index: ${index} Options: ${option?.text}`);
    // setFormData((pV) => {
    //   return { ...pV, bbSks: option.key as IBuckDoe };
    // });
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

  const [StackHorizStyles, stackHorizToken] = HorizStack({
    bgColor: ThemeColor.almondCream,
    bordercolor: ThemeColor.peachBeige,
    gap: 0,
    childrenGap: 0,
    marginBottom: 0,
  });

  const options = new Array<IDropdownOption<string>>();
  options.push({ key: "Alive", text: "Alive" });
  options.push({
    key: "Alive-NP",
    text: "Alive-NP",
    title: "Alive (Non-productive)",
  });
  options.push({ key: "Dead", text: "Dead" });
  options.push({ key: "Sold", text: "Sold" });

  return (
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
      <DropdownBase
        options={options}
        label="Status"
        defaultSelectedKey={options[0].key}
        defaultValue={bbStatus}
        onChange={handleStatusChange}
        styles={dropdownStyles}
      />
      <ChoiceGroup
        label="Sex"
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
      {bbident && (
        <TextField
          label="Weight"
          name="bbWeight"
          type="number"
          value={String(bbWeight)}
          errorMessage={sttWeightErrMsg}
          styles={styledisablespinner}
          onBlur={(ev) => validateWeight(ev)}
          onChange={(ev: FormEvent<HTMLInputElement>) => {
            setFormData((pV) => {
              return {
                ...pV,
                bbWeight: parseFloat((ev.target as HTMLInputElement).value),
              };
            });
          }}
          disabled
        />
      )}
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
  );
};

export default ItemForm;
