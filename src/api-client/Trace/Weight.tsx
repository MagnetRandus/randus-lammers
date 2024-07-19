import { DatePicker, DayOfWeek, Stack, TextField } from "@fluentui/react";
import DatePickerStrings from "Interfaces/DatePickerStrings";
import { FocusEvent, useState } from "react";
import Styledisablespinner from "Ux/SpinnerStyle";
import { StackHorizStyles, stackHorizToken } from "Ux/StackHorizontal";

interface IPropsTraceWeight {
  start: boolean;
}

const TraceWeight: React.FC<IPropsTraceWeight> = () => {
  const [weight, SetWeight] = useState<string | undefined>();
  const [weightErr, SetWeightErr] = useState<string | undefined>();
  const [when, setWhen] = useState<Date | undefined>();
  const [whenT, setWhenT] = useState<Date | undefined>();

  const blurWeight = (
    ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    [ev];
  };

  const changeDob = (date: Date) => {
    setWhen(date);
    setWhenT(date);
    // setFormData((pV) => {
    //   return { ...pV, dateOfBirth: date };
    // });
  };

  return (
    <>
      <form
        onSubmit={() => {
          console.log("Submit Trace Weight");
        }}
      >
        <Stack horizontal styles={StackHorizStyles} tokens={stackHorizToken}>
          <TextField
            label="Weight Kilogram"
            name="weight"
            onChange={(ev, v) => {
              SetWeight(v);
            }}
            type="number"
            value={weight}
            errorMessage={weightErr}
            styles={Styledisablespinner}
            onFocus={() => {
              [];
            }}
            onBlur={(ev) => blurWeight(ev)}
            autoFocus
          />
          <DatePicker
            label="When"
            style={{ width: "190px" }}
            value={when}
            onSelectDate={changeDob}
            isRequired
            firstDayOfWeek={DayOfWeek.Sunday}
            strings={DatePickerStrings}
          />
        </Stack>
      </form>
    </>
  );
};

export default TraceWeight;
