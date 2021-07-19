import React from "react";
import { Form } from "react-bootstrap";

type Props = {
    textValue: string;
    defaultValue?: string;
    placeholder: string;
    onChange: (data: string) => void;
    isValid: boolean | undefined;
};

function InputText({
    defaultValue = "",
    textValue,
    placeholder,
    onChange,
    isValid,
}: Props) {
    return (
        <Form.Control
            size="lg"
            type="text"
            defaultValue={defaultValue}
            isValid={isValid === true}
            isInvalid={isValid === false}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            value={textValue}
        />
    );
}

export default InputText;
