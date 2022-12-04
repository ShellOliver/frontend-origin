import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SavingGoal } from './SavingGoal';

describe('SavingGoal', () => {
  it('should get the current value and date as output of monthly amount', () => {
    render(<SavingGoal />);
    const monthlyAmount = screen.getByLabelText('Total amount');
    userEvent.type(monthlyAmount, '1000');
    expect(screen.getByTestId('monthly-amount-value')).toHaveTextContent(
      '$1,000'
    );
    expect(screen.getByTestId('message-output')).toHaveTextContent(
      'You’re planning 0 monthly deposits to reach your $1,000 goal by December 2022.'
    );
  });

  it('should get amount divided by two when there are two months forward', () => {
    render(<SavingGoal />);
    const monthlyAmount = screen.getByLabelText('Total amount');
    userEvent.type(monthlyAmount, '1000');
    const reachGoal = screen.getByLabelText('Reach goal by');
    fireEvent.keyDown(reachGoal, { key: 'ArrowRight' });
    fireEvent.keyDown(reachGoal, { key: 'ArrowRight' });
    expect(screen.getByTestId('monthly-amount-value')).toHaveTextContent(
      '$500'
    );
    expect(screen.getByTestId('message-output')).toHaveTextContent(
      'You’re planning 2 monthly deposits to reach your $500 goal by February 2023.'
    );
  });

  it('should get amount divided by tree when there are three months forward and get formatted numbers', () => {
    render(<SavingGoal />);
    const monthlyAmount = screen.getByLabelText('Total amount');
    userEvent.type(monthlyAmount, '1000.55');
    const reachGoal = screen.getByLabelText('Reach goal by');
    fireEvent.keyDown(reachGoal, { key: 'ArrowRight' });
    fireEvent.keyDown(reachGoal, { key: 'ArrowRight' });
    fireEvent.keyDown(reachGoal, { key: 'ArrowRight' });
    expect(screen.getByTestId('monthly-amount-value')).toHaveTextContent(
      '$333.52'
    );
    expect(screen.getByTestId('message-output')).toHaveTextContent(
      'You’re planning 3 monthly deposits to reach your $333.52 goal by March 2023.'
    );
  });
});
