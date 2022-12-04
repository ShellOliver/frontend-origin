import { useMemo, useRef, useState } from 'react';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow-left.svg';
import style from './InputDate.module.css';

type Props = {
  id?: string;
};

const addZeroBeforeNumber = (val: number) => {
  return val.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const getMonthYear = (date: Date): [string, number] => {
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return [month, year];
};

// a11y pattern https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/

export const InputDate = ({ id }: Props): JSX.Element => {
  const currentDate = useMemo(() => new Date(), []);
  const [date, setDate] = useState(currentDate);
  const ref = useRef<HTMLInputElement>(null);
  const [selectedMonth, selectedYear] = getMonthYear(date);

  const prevIsDisabled =
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  const previous = () => {
    if (prevIsDisabled) return;
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const next = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['ArrowUp', 'ArrowRight'].includes(event.key)) {
      next();
      return;
    }
    if (['ArrowDown', 'ArrowLeft'].includes(event.key)) previous();
  };

  return (
    <div className={style.wrapper}>
      <div className={style.inputDate} onClick={() => ref.current?.focus()}>
        <button
          tabIndex={-1}
          aria-label="previous month"
          onClick={previous}
          disabled={prevIsDisabled}
        >
          <ArrowIcon />
        </button>
        <div className={style.date}>
          <span className={style.month}>{selectedMonth}</span>
          <span className={style.year}>{selectedYear}</span>
        </div>
        <button tabIndex={-1} onClick={next} aria-label="next month">
          <ArrowIcon className={style.rotateToRight} />
        </button>
      </div>
      <input /* makes input date behave as spinbutton for a11y purpose */
        ref={ref}
        role="spinbutton"
        data-testid="input-date"
        aria-valuetext={`${selectedMonth} - ${selectedYear}`}
        aria-valuenow={date.getMonth()}
        type="month"
        readOnly
        className={style.nativeInputDate}
        onKeyDown={handleKeypress}
        value={`${selectedYear}-${addZeroBeforeNumber(date.getMonth() + 1)}`}
        id={id}
      />
    </div>
  );
};
