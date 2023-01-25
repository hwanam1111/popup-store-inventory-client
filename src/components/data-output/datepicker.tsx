/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import enUS from 'date-fns/locale/en-US';
import de from 'date-fns/locale/de';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';
import ja from 'date-fns/locale/ja';

registerLocale('ko', ko);
registerLocale('en-US', enUS);
registerLocale('de', de);
registerLocale('es', es);
registerLocale('fr', fr);
registerLocale('ja', ja);

interface DatepickerStylesProps {
  datepickerType: 'normal' | 'range';
}
const DatepickerStyles = createGlobalStyle<DatepickerStylesProps>`
  .react-datepicker__tab-loop {
    position: sticky !important;
    top: 1rem !important;
  }

  .react-datepicker-wrapper {
    display: none !important;
  }

  .react-datepicker-popper {
    padding: 0 !important;
    transform: unset !important;
    position: relative !important;
  }

  .react-datepicker {
    width: 37.5rem;
    border-radius: 0.625rem;
    border: 1px solid #ccc;
    box-shadow: 0px 3px 16px #00000017;
    position: relative !important;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__header {
    background-color: #fff;
    border-bottom: 0;
    border-radius: 0.625rem !important;
  }

  .custom-header {
    padding: 1.875rem 0;
  }

  .react-datepicker__navigation {
    top: 28px;
    border: 1px solid #ccc;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.25rem;
  }

  .react-datepicker__navigation--previous {
    left: 8rem !important;
  }

  .react-datepicker__navigation--next {
    right: 8rem !important;
  }

  .react-datepicker__navigation-icon::before {
    border-color: #222;
    border-style: solid;
    border-width: 2.5px 2.5px 0 0;
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    top: 5px;
  }

  .react-datepicker__current-month {
    font-size: 1.25rem;
    color: #222;
    font-weight: 500;
  }

  .react-datepicker__day-name {
    font-size: 0.875rem;
    width: 4.75rem;
    line-height: 2.5rem;
  }

  .react-datepicker__day-name:first-child {
    color: #FB3030;
  }

  .react-datepicker__day-name:last-child {
    color: #15ADEC;
  }

  .react-datepicker__day--today {
    font-weight: unset;
  }

  .react-datepicker__day {
    width: 4.75rem;
    line-height: 4.75rem;
    position: relative;
  }

  .react-datepicker__day:hover {
    border-radius: 50%;
  }

  .react-datepicker__day--outside-month {
    color: #CCCCCC;
  }

  .react-datepicker__day--selected {
    background-color: #1A7FCD !important;
    border-radius: 50%;
  }

  .dot::after {
    position: absolute;
    content: "";
    background-color: #1A7FCD;
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    left: 50%;
    bottom: 0.6rem;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .react-datepicker__day--selected.dot::after {
    background-color: #fff;
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

interface DataOutputDatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (selectedDate: Date | null) => void;
}

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  onClick?(): void;
  onChange?(): void;
}

function DataOutputDatePicker({ selectedDate, setSelectedDate }: DataOutputDatePickerProps) {
  const { locale } = useRouter();

  const CustomInput = React.forwardRef<HTMLInputElement>(({ onClick }: DatePickerProps, ref) => {
    const value = '';

    return <input ref={ref} onClick={onClick} value={value} readOnly hidden />;
  });

  return (
    <>
      <DatepickerStyles datepickerType="normal" />
      <DatePicker
        locale={locale}
        selected={selectedDate}
        customInput={<CustomInput />}
        showDisabledMonthNavigation
        open
        onChange={(date) => setSelectedDate(date)}
        disabledKeyboardNavigation
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth, customHeaderCount }) => (
          <div className="custom-header">
            <button
              type="button"
              aria-label="Previous Month"
              className={`
                react-datepicker__navigation
                react-datepicker__navigation--previous
                navigation-prev-index-${customHeaderCount} 
              `}
              onClick={decreaseMonth}
            >
              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
                {'<'}
              </span>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString(locale, {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              type="button"
              aria-label="Next Month"
              className={`
                react-datepicker__navigation
                react-datepicker__navigation--next
                navigation-next-index-${customHeaderCount}
              `}
              onClick={increaseMonth}
            >
              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">{'>'}</span>
            </button>
          </div>
        )}
      />
    </>
  );
}

export default DataOutputDatePicker;
