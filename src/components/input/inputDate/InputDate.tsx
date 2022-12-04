import { useRef } from 'react';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow-left.svg';
import style from './InputDate.module.css';

type Props = {
  id?: string;
  onChange: (date: Date) => void;
  value?: Date;
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

export const InputDate = ({
  id,
  value = new Date(),
  onChange,
}: Props): JSX.Element => {
  const currentDate = new Date();
  const ref = useRef<HTMLInputElement>(null);
  const [selectedMonth, selectedYear] = getMonthYear(value);

  const prevIsDisabled =
    value.getMonth() === currentDate.getMonth() &&
    value.getFullYear() === currentDate.getFullYear();

  const previous = () => {
    if (prevIsDisabled) return;
    const newDate = new Date(value);
    newDate.setMonth(newDate.getMonth() - 1);
    onChange(newDate);
  };

  const next = () => {
    const newDate = new Date(value);
    newDate.setMonth(newDate.getMonth() + 1);
    onChange(newDate);
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
      <div
        className={style.inputDate}
        onClick={(e) => {
          ref.current?.focus();
        }}
      >
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
        aria-valuenow={value.getMonth()}
        type="month"
        readOnly
        className={style.nativeInputDate}
        onKeyDown={handleKeypress}
        value={`${selectedYear}-${addZeroBeforeNumber(value.getMonth() + 1)}`}
        id={id}
      />
    </div>
  );
};
