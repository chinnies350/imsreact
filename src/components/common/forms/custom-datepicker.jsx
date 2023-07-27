import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DRP, SDP } from 'components/common/forms/dp';
import { asField } from 'informed';
import Joi from 'joi-browser';
import moment from 'moment';
import React, {  Fragment } from 'react';


export const customDateRangeSchema = {
    startDate: Joi.any().required().label('Start Date'),
    endDate: Joi.any().required().label('End Date')
}

const fridendlyDisplayFormay = (startDate, endDate) => {
    const s = moment(startDate);
    const e = moment(endDate);

    const days = e.diff(s, 'days');
    const format = "MMMM DD YYYY";
    const sd = s.format(format)
    const ed = s.format(format)

    return days === 1 ? `1 date. Starting on ${sd}` : `${days} dates. Starting ${sd} through ${ed}`
}

const dateToMoment = (date, format = "DD/MM/YYYY") => {
    if (!date) return null

    return moment(date, format)
}
 const returnYears = () => {
    let years = []
    for(let i = moment().year() - 100; i <= moment().year(); i++) {
        years.push(<option value={i}>{i}</option>);
    }
    return years;
}

const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) =>
<div style={{ display: 'flex', justifyContent: 'center' }}>
    <div>
        <select
            value={month.month()}
            onChange={(e) => onMonthSelect(month, e.target.value)}
        >
            {moment.months().map((label, value) => (
                <option value={value}>{label}</option>
            ))}
        </select>
    </div>
    <div>
        <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
            {returnYears()}
        </select>
    </div>
</div>


export const CustomDateRangePicker = asField(({ fieldState, fieldApi, ...props }) => {
    const { value } = fieldState;
    const { setValue, setTouched } = fieldApi;
    const { field, onChange, onBlur, initialValue, forwardedRef, label, id, children, ...rest } = props;
    console.log("date",this.props,fieldState,fieldApi)
    return (
        <Fragment>
            <div className="form-group">
                {props.label && <label htmlFor={field}>{props.label}</label>}

                <DRP
                    value={value}
                    {...rest}
                    startDate={value && value['startDate'] ? dateToMoment(value['startDate']) : null}
                    endDate={value && value['endDate'] ? dateToMoment(value['endDate']) : null}
required={true}
                    onChange={({ startDate, endDate }) => {
                        setValue({ startDate, endDate });
                        setTouched();
                        if (onChange) {
                            onChange({ startDate, endDate });
                        }
                    }}
                    onBlur={e => {
                        setTouched();
                        if (onBlur) {
                            onBlur(e);
                        }
                    }}
                />
                {value && value.startDate && value.endDate &&
                    <small className="form-text text-muted">{fridendlyDisplayFormay(value.startDate, value.endDate)}</small>
                }
                {fieldState.error ? (<div className="invalid-field">{fieldState.error}</div>) : null}
            </div>
        </Fragment>
    );
});

export const CustomDatePicker = asField(({ fieldState, fieldApi, ...props }) => {
    const { value } = fieldState;
    const { setValue, setTouched } = fieldApi;
    const { field, onChange, onBlur, initialValue, forwardedRef, label, id, children, ...rest } = props;

    return (
      
        <Fragment>
            <div className="form-group">
                {props.label && <label htmlFor={field}>{props.label}</label>}
                { console.log(props,fieldState,fieldApi)}
                <SDP
                    value={value}
                    {...rest}
                    id={field}
                    displayFormat="YYYY MMM D"
                    renderMonthElement={renderMonthElement}
                    {...rest}
                    // date={value ? dateToMoment(value) : null}
                    onChange={date => {
                        setValue(date);
                        setTouched();
                        if (onChange) {
                            onChange(date);
                        }
                    }}
                    onBlur={e => {
                        setTouched();
                        if (onBlur) {
                            onBlur(e);
                        }
                    }}
                   
                />
                {/* <SingleDatePicker                   
                    {...rest}
                    //showClearDate
                    small
                    displayFormat="YYYY MMM D"
                    id={id}
                    renderMonthElement={this.renderMonthElement}
                    // numberOfMonths={numberOfMonths ? numberOfMonths : 1}
                    onDateChange={date => {
                        onChange(date)
                    }}
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => {
                        this.setState({ focused });
                        onBlur(focused);
                    }}
                /> */}
                {fieldState.error ? (<div className="invalid-field">{fieldState.error}</div>) : null}
            </div>
        </Fragment>
    );
});
