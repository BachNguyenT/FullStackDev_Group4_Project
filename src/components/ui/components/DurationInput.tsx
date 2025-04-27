import { useEffect, useState } from "react";
import { TimeDuration } from "@/types/Types";

interface DurationInputProps {
  value: TimeDuration;
  label: string;
  required: boolean;
  valueSetter: React.Dispatch<
    React.SetStateAction<{ hour: number; minute: number; second: number }>
  >;
}

const DurationInput: React.FC<DurationInputProps> = ({
  value,
  label,
  required,
  valueSetter,
}) => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  useEffect(() => {
    setHour(value.hour);
    setMinute(value.minute);
    setSecond(value.second);
  }, [value]);

  function validateNumber(value: number, min?: number, max?: number): boolean {
    let res = true;
    res = res && Number.isInteger(value);
    if (min !== undefined) {
      res = res && value >= min;
    }
    if (max !== undefined) {
      res = res && value <= max;
    }
    return res;
  }

  function handleInputChange() {
    let hourCache = hour;
    let minuteCache = minute;
    let secondCache = second;

    if (!validateNumber(hour, 0)) {
      console.log("Invalid hour input, resetting to 0");
      hourCache = 0;
    }
    if (!validateNumber(minute, 0, 59)) {
      console.log("Invalid minute input, resetting to 0");
      minuteCache = 0;
    }
    if (!validateNumber(second, 0, 59)) {
      console.log("Invalid second input, resetting to 0");
      secondCache = 0;
    }

    valueSetter({
      hour: hourCache,
      minute: minuteCache,
      second: secondCache,
    });

    setHour(hourCache);
    setMinute(minuteCache);
    setSecond(secondCache);
  }

  useEffect(() => {
    handleInputChange();
  }, [hour, minute, second]);

  return (
    <div className="">
      <label className="mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-row items-center justify-between gap-4 py-3">
        <input
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setHour(Number.isNaN(value) ? 0 : value);
          }}
          type="number"
          min={0}
          placeholder="Hour..."
          className="border-2 border-gray-300 rounded-md p-2 w-full font-light text-sm"
          disabled={isValidating}
          value={hour}
        />
        <div>:</div>
        <input
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setMinute(Number.isNaN(value) ? 0 : value);
          }}
          type="number"
          min={0}
          max={59}
          placeholder="Minute..."
          className="border-2 border-gray-300 rounded-md p-2 w-full font-light text-sm"
          disabled={isValidating}
          value={minute.toString()}
        />
        <div>:</div>
        {/* Second input */}
        <input
          onChange={(e) => {
            if (Number.isNaN(e.target.value)) {
              setSecond(0);
            } else {
              setSecond(parseInt(e.target.value, 10));
            }
          }}
          type="number"
          min={0}
          max={59}
          placeholder="Second..."
          className="border-2 border-gray-300 rounded-md p-2 w-full font-light text-sm"
          disabled={isValidating}
          value={second.toString()}
        />
      </div>
    </div>
  );
};

export default DurationInput;
