import React from "react";
import { Form } from "react-bootstrap";

type Props = {
    message: string;
};

function Label(props: Props) {
    return <Form.Label >{props.message}</Form.Label>;
}

export default Label;
