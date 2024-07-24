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
import { FocusEvent, useState } from "react";
import ThemeColor from "Ux/ColorScheme";
import Styledisablespinner from "Ux/SpinnerStyle";
import { HorizStack } from "Ux/StackHorizontal";

interface IPropsTraceWeight {
  formData: TSPLBWeightCreate;
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<TSPLBWeightCreate> | undefined>
  >;
}

const TraceWeight: React.FC<IPropsTraceWeight> = ({
  setFormData,
  formData,
}) => {
  const [weight, SetWeight] = useState<number | undefined>(formData.bbWeight);

  const [weightErr, SetWeightErr] = useState<string | undefined>();
  const [bbDate, SetBbDate] = useState<Date | undefined>(formData.bbDate);

  const blurWeight = (
    ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const value = parseFloat(ev.target.value);
    if (value > 0) {
      SetWeight(value);
      setFormData((pV) => {
        return {
          ...pV,
          bbWeight: value,
        };
      });
      SetWeightErr(``);
    } else {
      SetWeightErr(`Weight must be greater than 0.0`);
    }
  };

  const handleBbDateChange = (dateV: Date) => {
    SetBbDate(dateV);
    setFormData((pV) => {
      return { ...pV, bbDate: dateV };
    });
  };

  const handleBbDateTChange = (ev: React.FormEvent<IComboBox>, dateV: Date) => {
    SetBbDate(dateV);
    setFormData((pV) => {
      return { ...pV, bbDate: dateV };
    });
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
          label="Weight"
          name="weight"
          title="Weight in kilogram"
          onChange={(ev, v) => {
            if (v) SetWeight(parseFloat(v));
          }}
          type="number"
          value={String(weight)}
          errorMessage={weightErr}
          styles={Styledisablespinner}
          onFocus={() => {
            [];
          }}
          onBlur={(ev) => blurWeight(ev)}
          autoFocus
          description="kg"
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

export default TraceWeight;
