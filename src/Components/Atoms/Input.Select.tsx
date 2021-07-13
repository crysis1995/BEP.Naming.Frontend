import React from "react";
import { Form } from "react-bootstrap";

type Props = {
    withNonValueOption?: boolean;
    selectValue: string;
    options: { id: string; name: string }[];
    onSelect: (data: string) => void;
};

function InputSelect({
    withNonValueOption = true,
    selectValue,
    onSelect,
    options,
}: Props) {
    return (
        <Form.Control
            size="lg"
            as="select"
            value={selectValue}
            onChange={(e) => onSelect(e.target.value)}
        >
            {withNonValueOption && <option value={""}>Wybierz...</option>}
            {options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Form.Control>
    );
}

export default InputSelect;
