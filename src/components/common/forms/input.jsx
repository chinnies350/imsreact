import classnames from 'classnames';
import { asField } from 'informed';
import React, {  Fragment } from 'react';
import FormHelper from "./helper";


export const Input = asField(({ fieldState, fieldApi, ...props }) => {
    const { value } = fieldState;

    const { setValue, setTouched } = fieldApi;
    const { field, onChange, onBlur, initialValue, forwardedRef,icon,faClass,className, ...rest } = props;
    return (
        <Fragment>
            <div className="form-group">
                {/* {props.label && <label htmlFor={field}>{props.label}</label>} */}
                {faClass && <i className={faClass}></i>}&nbsp;
          {props.label && (
            <label htmlFor={field}>
              {icon && icon}&nbsp;
              {props.label} 
              {props.required && <i style={{ color: "red" }}>*</i>}
            </label>
          )}

                {/* { "is-invalid": fieldState.error, "is-valid": fieldState.touched && !fieldState.error } */}
                <input
                    {...rest}
                  
                    id={field}
                    ref={forwardedRef}
                    value={!value && value !== 0 ? '' : value}
                    className={classnames(`form-control ${className}`, { "is-invalid": fieldState.error })}
                    onChange={e => {
                        setValue(e.target.value);
                        if (onChange) {
                            onChange(e);
                        }
                    }}
                    onBlur={e => {
                        setTouched();
                        if (onBlur) {
                            onBlur(e);
                        }
                    }}
                // style={fieldState.error ? { border: 'solid 1px red' } : null}
                />
                {props.helper && <FormHelper content={props.helper} />}

                {fieldState.error ? (<div className="invalid-field">{fieldState.error}</div>) : null}
            </div>
        </Fragment>
    );
});