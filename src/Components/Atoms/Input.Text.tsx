import React from "react";
import { Form } from "react-bootstrap";

type Props = {
    textValue: string;
    placeholder: string;
    onChange: (data: string) => void;
};

function InputText({ textValue, placeholder, onChange }: Props) {
    return (
        <Form.Control
            size="lg"
            type="text"
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            value={textValue}
        />
    );
}

export default InputText;
