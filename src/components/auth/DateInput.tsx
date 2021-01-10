import { FormInput, SVGWrapper, TextField } from "components/FormInput"
import { useEffect, useRef, useState } from "react";
import { IoCalendarClear } from "react-icons/io5"
import styled from "styled-components";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useOnClickOutside } from "hooks";
import { rgba } from "polished";
import { getTextColor } from "helpers";
import { FaCalendarAlt } from "react-icons/fa";

const CalendarWrapper = styled.div`
    position: absolute;
    right: 0;
    border-radius: 1.5em;
    border: 2px solid ${({ theme }) => rgba(theme.navy, 0.15)};
    background-color: var(--layout-content-background); 
    box-shadow: 0px 10px 35px ${rgba(0, 0, 0, 0.15)};

    & .react-datepicker {
        border: 0;
        background: transparent;
        color: ${({ theme }) => rgba(getTextColor(theme.layoutContentBg), 0.85)};
    }
    & .react-datepicker__navigation{
        top: 1em;
        opacity: 0.8;
    }

    & .react-datepicker__header{
        border: 0;
        padding: 0;
        background: transparent;

    }

    //Year Dropdown
    & .react-datepicker__header__dropdown{
        position: absolute;
        top: 0;
        left: 15%;
        height: 3em;
        width: 70%;
    }

    & .react-datepicker__year-read-view{
        width: 70%;
        height: 3em;
        position: absolute;
        top: 0;
        left: 15%;
        z-index: 20;
        visibility: hidden;
        opacity: 0;
    }

    & .react-datepicker__year-dropdown{
        border-radius: .5em;
        border: 2px solid ${({ theme }) => rgba(theme.navy, 0.15)};
        background-color: var(--layout-content-background); 
    }

    & .react-datepicker__year-read-view--down-arrow {
        display: none;
    }

    & .react-datepicker__navigation--years-upcoming{
        top: 0;
        transform: translateY(-3px)
    }

    & .react-datepicker__navigation--years-previous{
        top: 0;
        transform: translateY(3px)
    }

    // Month
    & .react-datepicker__current-month{
        display: flex;
        justify-content:center;
        align-items: center;
        height: 2.5rem;
        color: ${({ theme }) => rgba(getTextColor(theme.layoutContentBg), 0.85)};
    }

    
    // Weekday stylings
    & .react-datepicker__day-name{
        color: ${({ theme }) => rgba(getTextColor(theme.layoutContentBg), 0.25)};
    }

    //Day stylings
    & .react-datepicker__day{
        outline: none;
        color: ${({ theme }) => rgba(getTextColor(theme.layoutContentBg), 0.7)};
        border-radius: 50%; 
    }

    & .react-datepicker__day--outside-month,
    & .react-datepicker__day--disabled {
        opacity: 0.4;
    }

    & .react-datepicker__day--selected,
    & .react-datepicker__day--keyboard-selected,
    & .react-datepicker__day:hover {
        opacity: 1;
        background:var(--primary);
        color: ${({ theme }) => getTextColor(theme.primary)};
        transition: all 0.2s; 
    }

    & .react-datepicker__day--disabled:hover {
        opacity: 0.4;
        color: ${({ theme }) => rgba(getTextColor(theme.layoutContentBg), 0.7)};
        background: transparent;
    }    
`;

interface DateInputProps {
    date: Date | null;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const DateInput: React.FC<DateInputProps> = ({ date, setDate }) => {
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>()
    useOnClickOutside(ref, () => setCalendarOpen(false))

    return (
        <FormInput style={{ position: "relative" }}>
            Date Of Birth
            <TextField>
                <span
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    onKeyDown={() => setCalendarOpen(!calendarOpen)}
                >
                    {date ? date.toString().slice(4, 15) : "Select a date"}
                </span>
                <SVGWrapper
                    clickable
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    onKeyDown={() => setCalendarOpen(!calendarOpen)}
                >
                    <FaCalendarAlt />
                </SVGWrapper>
            </TextField>
            {calendarOpen &&
                <CalendarWrapper ref={ref}>
                    <DatePicker
                        inline
                        selected={date}
                        showYearDropdown
                        minDate={new Date("01-01-1900")}
                        maxDate={new Date()}
                        onChange={(newdate) => {
                            setDate(newdate);
                            setCalendarOpen(false)
                        }}
                    />
                </CalendarWrapper>}
        </FormInput>
    )
}
