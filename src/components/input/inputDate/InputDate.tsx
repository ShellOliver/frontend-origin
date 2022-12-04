import { useState } from 'react';

type Props = {
  id?: string;
};

// a11y rules https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/

export const InputDate = ({ id }: Props): JSX.Element => {
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const selectedMonth = date.toLocaleString('default', { month: 'long' });
  const selectedYear = date.getFullYear();

  const previous = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const next = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  return (
    <div>
      <button aria-label="previous month" onClick={previous}>
        previous
      </button>
      <div
        role="spinbutton"
        tabIndex={0}
        aria-valuetext={`${selectedMonth} - ${selectedYear}`}
        aria-valuenow={date.getMonth()}
        id={id}
        onKeyDown={(event) => {
          if (['ArrowUp', 'ArrowRight'].includes(event.key)) {
            next();
            return;
          }
          if (['ArrowDown', 'ArrowLeft'].includes(event.key)) previous();
        }}
      >
        <span>{selectedMonth}</span>
        <span>{selectedYear}</span>
      </div>
      <button onClick={next} aria-label="next month">
        next
      </button>
    </div>
  );
};
