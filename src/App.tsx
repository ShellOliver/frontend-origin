import { SavingGoal } from './pages/SavingGoal';

export function App(): JSX.Element {
  return (
    <div data-testid="greetings-container">
      <main>
        <SavingGoal></SavingGoal>
      </main>
    </div>
  );
}
