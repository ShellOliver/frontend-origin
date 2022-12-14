import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { InputDate } from './InputDate';

const currentMonth = 'November';
const currentYear = '2022';

jest.useFakeTimers('modern').setSystemTime(new Date('2022-11-05'));

const InputDateWithState = () => {
  const [value, setValue] = useState(new Date());
  return <InputDate onChange={setValue} value={value} />;
};

describe('InputDate', () => {
  it('should find the current year and month when render', () => {
    render(<InputDateWithState />);
    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it('should still see current month and year when try to select a previous date', () => {
    render(<InputDateWithState />);

    fireEvent.keyDown(screen.getByTestId('input-date'), {
      key: 'ArrowLeft',
    });

    userEvent.click(screen.getByLabelText('previous month'));

    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it('should alternate between next and previous date when click the next and previous button', () => {
    render(<InputDateWithState />);

    userEvent.click(screen.getByLabelText('next month'));
    userEvent.click(screen.getByLabelText('next month'));
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('previous month'));

    expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('should alternate between next and previous date when click left and right keys', () => {
    render(<InputDateWithState />);

    fireEvent.keyDown(screen.getByTestId('input-date'), { key: 'ArrowRight' });
    fireEvent.keyDown(screen.getByTestId('input-date'), { key: 'ArrowRight' });

    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByTestId('input-date'), { key: 'ArrowLeft' });
    expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });
});
