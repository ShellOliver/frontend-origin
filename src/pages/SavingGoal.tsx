import { ReactComponent as OriginIcon } from '../assets/icons/origin.svg';
import { ReactComponent as BuyAHouseIcon } from '../assets/icons/buy-a-house.svg';
import style from './SavingGoal.module.css';
import { InputField } from '../components/input/inputField/InputField';
import {
  rawNumber,
  InputMoney,
  numberFormat,
} from '../components/input/inputMoney/InputMoney';
import { InputDate } from '../components/input/inputDate/InputDate';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

const getDateDiff = (goalDate: Date) => {
  const current = dayjs().set('date', 1);
  return dayjs(goalDate).set('date', 2).diff(current, 'month');
};

export function SavingGoal(): JSX.Element {
  const [goalDate, setReachGoal] = useState<Date>(new Date());
  const [money, setMoney] = useState<string>();

  const totalOutput = useMemo(() => {
    const monthlyDeposits = getDateDiff(goalDate);
    const totalAmount = rawNumber(money) || 0;
    const monthlyAmount = totalAmount
      ? Number((totalAmount / monthlyDeposits).toFixed(2))
      : 0;

    return {
      totalAmount: monthlyDeposits === 0 ? totalAmount : monthlyAmount,
      monthlyDeposits,
    };
  }, [goalDate, money]);

  return (
    <div>
      <nav className={style.nav}>
        <a className={style.rootLink} href="/">
          <OriginIcon />
        </a>
      </nav>
      <div className={style.container}>
        <span className={style.title}>
          Let`s plan your <b>saving goal.</b>
        </span>
        <div className={style.card}>
          <div className={style.groupTitle}>
            <BuyAHouseIcon />
            <div className={style.cardTitle}>
              <h2>Buy a house</h2>
              <span>Saving goal</span>
            </div>
          </div>
          <div className={style.fieldsSideBySide}>
            <InputField htmlFor="amount" label="Total amount">
              <InputMoney id="amount" onChange={setMoney} />
            </InputField>
            <InputField htmlFor="reachDate" label="Reach goal by">
              <InputDate
                id="reachDate"
                onChange={setReachGoal}
                value={goalDate}
              />
            </InputField>
          </div>
          <div className={style.amountBox}>
            <div className={style.monthlyAmount}>
              <span className={style.monthlyAmountLabel}>Monthly amount</span>
              <span
                className={style.monthlyAmountValue}
                data-testid="monthly-amount-value"
              >
                ${numberFormat(totalOutput.totalAmount)}
              </span>
            </div>
            <div
              data-testid="message-output"
              className={style.monthlyAmountAlert}
            >
              You’re planning{' '}
              <b>{totalOutput.monthlyDeposits} monthly deposits</b> to reach
              your <b>${numberFormat(totalOutput.totalAmount)}</b> goal by{' '}
              <b>{dayjs(goalDate).format('MMMM YYYY').toString()}</b>.
            </div>
          </div>
          <div className={style.confirm}>
            <button type="submit" className={style.primaryButton}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
