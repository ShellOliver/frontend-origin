import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputDate } from './InputDate';

// Date.now = jest.fn(() => new Date(Date.UTC(2022, 1, 10)).valueOf());
// assuming the current date is 10th of January 2022

const currentMonth = 'November';
const currentYear = '2022';

jest.useFakeTimers('modern').setSystemTime(new Date('2022-11-05'));

describe('InputDate', () => {
  it('should find the current year and month when render', () => {
    render(<InputDate />);
    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it('should still see current month and year when try to select a previous date', () => {
    render(<InputDate />);

    fireEvent.keyDown(screen.getByTestId('input-date'), {
      key: 'ArrowLeft',
    });

    userEvent.click(screen.getByLabelText('previous month'));

    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it('should alternate between next and previous date when click the next and previous button', () => {
    render(<InputDate />);

    userEvent.click(screen.getByLabelText('next month'));
    userEvent.click(screen.getByLabelText('next month'));
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('previous month'));

    expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('should alternate between next and previous date when click left and right keys', () => {
    render(<InputDate />);

    fireEvent.keyDown(screen.getByTestId('input-date'), { key: 'ArrowRight' });
    fireEvent.keyDown(screen.getByTestId('input-date'), { key: 'ArrowRight' });

    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByTestId('input-date'), { key: 'ArrowLeft' });
    expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });
});
