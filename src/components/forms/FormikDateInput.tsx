import { CalendarWrapper } from "components/auth/DateInput"
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker"
import { CSSTransition } from "react-transition-group";
import { StyledFormInput, StyledTextField, SVGWrapper, StyledMetaInputInfo } from ".";
import { useOnClickOutside } from "hooks";
import { useRef, useState } from "react";
import { useField } from "formik";
import { capitalized, getFormattedDate } from "helpers";

export const FormikDateInput = ({ label, minDate, maxDate, optional = false, style, className, ...restProps }: any) => {
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [field, meta, helpers] = useField(restProps);
    const showsError: boolean = meta.touched && meta.error ? true : false

    const ref = useRef<HTMLDivElement>()
    useOnClickOutside(ref, () => setCalendarOpen(false));

    return (
        <StyledFormInput style={{ position: "relative", ...style }} className={className}>
            <StyledMetaInputInfo>
                {label}{optional && " (optional)"}
                <CSSTransition in={showsError} classNames="error" timeout={250} unmountOnExit>
                    <span>{meta.error}</span>
                </CSSTransition>
            </StyledMetaInputInfo>
            <StyledTextField hasError={showsError}>
                <span>
                    {!field.value ? "Select Your Birthday ➜" : capitalized(field.value)}
                </span>
                <SVGWrapper
                    clickable
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    onKeyDown={() => setCalendarOpen(!calendarOpen)}
                >
                    <FaCalendarAlt />
                </SVGWrapper>
            </StyledTextField>
            <CSSTransition in={calendarOpen} classNames="calendar" timeout={250} unmountOnExit>
                <CalendarWrapper ref={ref}>
                    <DatePicker
                        inline
                        selected={currentDate}
                        showYearDropdown
                        minDate={minDate}
                        // maxDate={maxDate}
                        onChange={(newdate: Date) => {
                            helpers.setValue(getFormattedDate(newdate))
                            setCurrentDate(newdate)
                            setCalendarOpen(false)
                        }}
                    />
                </CalendarWrapper>
            </CSSTransition>
        </StyledFormInput>
    )
}