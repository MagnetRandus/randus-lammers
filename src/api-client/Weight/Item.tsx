import {
  DatePicker,
  DayOfWeek,
  IComboBox,
  Stack,
  TextField,
  TimePicker,
} from "@fluentui/react";
import DatePickerStrings from "Interfaces/DatePickerStrings";
import { TSPLBWeightCreate } from "Interfaces/LISTS/trace/IGLICF-Weight";
import { useEffect, useState } from "react";
import ThemeColor from "Ux/ColorScheme";
import Styledisablespinner from "Ux/SpinnerStyle";
import { HorizStack } from "Ux/StackHorizontal";

interface IPropsTraceWeight {
  formData: TSPLBWeightCreate;
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<TSPLBWeightCreate> | undefined>
  >;
  SetPageIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeightItem: React.FC<IPropsTraceWeight> = ({
  setFormData,
  formData,
  SetPageIsValid,
}) => {
  const { bbDate, bbWeight } = formData;

  const [WeightErr, SetWeightErr] = useState<string | undefined>();

  useEffect(() => {
    if (bbWeight && bbWeight > 0) {
      SetWeightErr(``);
    } else {
      SetWeightErr(`Not valid`);
    }
    if (!isNaN(Date.parse(bbDate.toDateString()))) {
      SetWeightErr("");
    } else {
      SetWeightErr("Not valid");
    }
  }, [bbDate, bbWeight]);

  const handleWeightChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string | undefined
  ) => {
    setFormData((pV) => {
      return {
        ...pV,
        bbWeight: value ? parseFloat(value) : undefined,
      };
    });
  };

  const handleBbDateChange = (dateV: Date) => {
    setFormData((pV) => {
      return { ...pV, bbDate: dateV };
    });
  };

  const handleBbDateTChange = (ev: React.FormEvent<IComboBox>, dateV: Date) => {
    setFormData((pV) => {
      return { ...pV, bbDate: dateV };
    });
  };

  useEffect(() => {
    SetPageIsValid(WeightErr == undefined || WeightErr == "");
  }, [WeightErr, SetPageIsValid]);

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
          label="Weight"
          name="weight"
          title="Weight in kilogram"
          onChange={(ev, v) => handleWeightChange(ev, v)}
          type="number"
          value={bbWeight === 0 ? "" : String(bbWeight)}
          errorMessage={WeightErr}
          styles={Styledisablespinner}
          onKeyUp={(ev) => {
            if (ev.key === "Backspace") {
              setFormData((pV) => {
                return {
                  ...pV,
                  bbWeight: 0,
                };
              });
            }
          }}
          autoFocus
          description="#.## kg"
        />
        <DatePicker
          label="Measurement date"
          style={{ width: "190px" }}
          value={bbDate}
          onSelectDate={handleBbDateChange}
          isRequired
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DatePickerStrings}
        />
        <TimePicker
          label="Measurement time "
          value={bbDate}
          onChange={handleBbDateTChange}
        />
      </Stack>
    </>
  );
};

export default WeightItem;
