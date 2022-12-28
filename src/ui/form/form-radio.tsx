import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

const RadioBlock = styled.div<{ readonly: boolean }>`
  pointer-events: ${(props) => (props.readonly ? 'none' : 'unset')};
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;

  &:checked + label:before {
    position: absolute;
    content: '';
    display: inline-block;
    background-color: ${({ theme }) => theme.color.PP500};
    color: ${({ theme }) => theme.color.G0};
    border-color: ${({ theme }) => theme.color.PP500};
    opacity: 1;
  }
`;

const Radio = styled.label`
  display: inline-block;
  position: relative;
  user-select: none;
  padding-left: 1.875rem;
  line-height: 1.25rem;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.G60};
  cursor: pointer;
  height: 1.25rem;

  &::before {
    content: '';
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    line-height: 1.25rem;
    margin: -2px 8px 0 0;
    text-align: center;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0.125rem;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 5%), inset 0px -15px 10px -12px rgb(0 0 0 / 5%);
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 0;
    opacity: 0.6;
    box-shadow: none;
    transition: all 0.08s;
  }
`;

const RadioIcon = styled.i`
  position: absolute;
  left: 7px;
  top: 4px;
  width: 6px;
  height: 10px;
  border: 2px solid #fff;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  z-index: 1;
`;

interface FormRadioProps {
  label: string;
  id: string;
  name: string;
  value: string;
  readOnly: boolean;
  defaultChecked?: boolean;
  register?: UseFormRegisterReturn;
}

function FormRadio({ label, id, register, name, value, readOnly, defaultChecked }: FormRadioProps) {
  return (
    <RadioBlock readonly={readOnly}>
      <Input type="radio" id={id} name={name} value={value} {...register} defaultChecked={defaultChecked} />
      <Radio htmlFor={id}>
        {value && <RadioIcon />}
        {label}
      </Radio>
    </RadioBlock>
  );
}

export default FormRadio;
