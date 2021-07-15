import React from "react";
import { Form } from "react-bootstrap";

type Props = {
    message: string;
    isValid: boolean;
};

function ValidatorText(props: Props) {
    return (
        <Form.Control.Feedback type={props.isValid ? "valid" : "invalid"}>
            {props.message}
        </Form.Control.Feedback>
    );
}

export default ValidatorText;
