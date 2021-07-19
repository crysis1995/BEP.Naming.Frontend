import React from "react";
import { Form } from "react-bootstrap";

type Props = {
    message: string;
    index: number;
};

function Label(props: Props) {
    return (
        <Form.Label>
            <strong className={"text-muted mr-1"}>
                {props.index > 9 ? props.index : `0${props.index}`}
            </strong>
            <strong>{props.message}</strong>
        </Form.Label>
    );
}

export default Label;
