import { useDebugValue, useEffect, useState } from 'react';

function DurationInput ({ valueSetter }) {
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);
    const [isValidating, setIsValidating] = useState(false);

    function validateNumber (value, min, max) {
        let res = true;
        // Validate if the value is a whole number
        res = res && Number.isInteger(value);
        // Validate if the value is within the specified range
        if (min) { res = res && (value >= min); }
        if (max) { res = res && (value <= max); }
        return res;
    }

    function handleInputChange () {
        let hourCache = hour;
        let minuteCache = minute;
        let secondCache = second;
        // Validate hour input
        if(!validateNumber(hour, 0, undefined)) {
            console.log("Invalid hour input, resetting to 0");
            hourCache = 0;
        }
        // Validate minute input
        if(!validateNumber(minute, 0, 59)) {
            console.log("Invalid min input, resetting to 0");
            minuteCache = 0;
        }
        // Validate second input
        if(!validateNumber(second, 0, 59)) {
            console.log("Invalid sec input, resetting to 0");
            secondCache = 0;
        }

        valueSetter({
            hour: hourCache,
            minute: minuteCache,
            second: secondCache,
        })

        setHour(hourCache);
        setMinute(minuteCache);
        setSecond(secondCache);
    }

    useEffect(() => {
        handleInputChange();
    }, [hour, minute, second]);

    return (
        <div>
            {/* Hour input */}
            <input
                onChange={(e) => {
                    setHour(parseInt(e.target.value, 10));
                }}
                type='number'
                min={0}
                placeholder="Hour..."
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
                disabled={isValidating}
                value={hour.toString()}
            />
            <div>:</div>
            {/* Min input */}
            <input
                onChange={(e) => {
                    setMinute(parseInt(e.target.value, 10));
                }}
                type='number'
                min={0}
                max={59}
                placeholder="Minute..."
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
                disabled={isValidating}
                value={minute.toString()}
            />
            <div>:</div>
            {/* Second input */}
            <input
                onChange={(e) => {
                    setSecond(parseInt(e.target.value, 10));
                }}
                type='number'
                min={0}
                max={59}
                placeholder="Second..."
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
                disabled={isValidating}
                value={second.toString()}
            />
        </div>
    )
}

export default DurationInput;