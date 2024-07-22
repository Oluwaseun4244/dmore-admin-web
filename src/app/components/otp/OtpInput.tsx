
import React, { useRef, useState, useEffect } from 'react';

interface OtpInputProps {
  numOfBoxes?: number;
  onOtpChange?: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ numOfBoxes = 6, onOtpChange }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<string[]>(Array(numOfBoxes).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Call the onOtpChange callback with the joined value whenever it changes
    if (onOtpChange) {
      onOtpChange(values.join(''));
    }
  }, [values, onOtpChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < numOfBoxes - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div className="gap-2 flex">
      {[...Array(numOfBoxes)].map((_, index) => (
        <div
          key={index}
          className={`w-[50px] h-[50px] md:w-[64px] md:h-[64px] border-[1.5px] border-solid border-custom-gray rounded-2xl overflow-hidden flex items-center justify-center ${values[index] ? 'bg-light-purple border-dark-purple' : ''}  ${focusedIndex === index ? 'border-dark-purple' : ''}`}
        >
          <input
            type='text'
            maxLength={1}
            className={`h-full font-bold text-[16px] border-none outline-none text-center ${values[index] ? 'bg-light-purple' : ''}`}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
          />
        </div>
      ))
      }
    </div >
  );
};

export default OtpInput;
