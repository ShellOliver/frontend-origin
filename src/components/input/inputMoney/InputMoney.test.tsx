import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputMoney } from './InputMoney';

describe('InputMoney', () => {
  it('should get formatted number without decimals', () => {
    render(<InputMoney onChange={jest.fn()} data-testid="input-money" />);
    const inputMoney = screen.getByTestId('input-money');
    userEvent.type(inputMoney, '1000');
    expect(inputMoney).toHaveValue('1,000');

    inputMoney.blur();
    expect(inputMoney).toHaveValue('1,000');
  });

  it('should get rid of "." only after blur when its alone in the end', () => {
    render(<InputMoney onChange={jest.fn()} data-testid="input-money" />);
    const inputMoney = screen.getByTestId('input-money');
    userEvent.type(inputMoney, '1000.');
    expect(inputMoney).toHaveValue('1,000.');
    inputMoney.blur();
    expect(inputMoney).toHaveValue('1,000');
  });

  it('should complete decimal with 0 when its missing a second decimal', () => {
    render(<InputMoney onChange={jest.fn()} data-testid="input-money" />);
    const inputMoney = screen.getByTestId('input-money');
    userEvent.type(inputMoney, '1000.6');
    expect(inputMoney).toHaveValue('1,000.6');
    inputMoney.blur();
    expect(inputMoney).toHaveValue('1,000.60');
  });

  it('should not allow more than 2 decimals', () => {
    render(<InputMoney onChange={jest.fn()} data-testid="input-money" />);
    const inputMoney = screen.getByTestId('input-money');
    userEvent.type(inputMoney, '10000000.6623');
    expect(inputMoney).toHaveValue('10,000,000.66');
    inputMoney.blur();
    expect(inputMoney).toHaveValue('10,000,000.66');
  });
});
