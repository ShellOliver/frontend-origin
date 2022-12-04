import { ReactComponent as OriginIcon } from '../assets/icons/origin.svg';
import { ReactComponent as BuyAHouseIcon } from '../assets/icons/buy-a-house.svg';
import style from './SavingGoal.module.css';

export function SavingGoal(): JSX.Element {
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
            <div className={style.field}>
              <label htmlFor="total-amount">Total amount</label>
              <input id="total-amount" />
            </div>
            <div className={style.field}>
              <label htmlFor="reach-goal-by">Reach goal by</label>
              <input id="reach-goal-by" />
            </div>
          </div>
          <div className={style.amountBox}>
            <div className={style.monthlyAmount}>
              <label htmlFor="monthly-amount">Monthly amount</label>
              <span id="monthly-amount">$ 1,000</span>
            </div>
            <div className={style.monthlyAmountAlert}>
              You’re planning <b>48 monthly deposits</b> to reach your{' '}
              <b>$25,000</b> goal by <b>October 2020</b>.
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
