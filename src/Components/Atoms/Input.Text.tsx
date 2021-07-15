import React from "react";
import { Form } from "react-bootstrap";

type Props = {
    textValue: string;
    placeholder: string;
    onChange: (data: string) => void;
    isValid: boolean | undefined;
};

function InputText({ textValue, placeholder, onChange, isValid }: Props) {
    return (
        <Form.Control
            size="lg"
            type="text"
            isValid={isValid}
            isInvalid={!isValid}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            value={textValue}
        />
    );
}

export default InputText;
