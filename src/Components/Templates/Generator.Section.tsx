import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import FormsList from "../Organism/Forms.List";

function GeneratorSection() {
    const isLoading = useSelector(
        (state: RootState) => state.layers.loading || state.nodeSelects.loading
    );
    if (isLoading)
        return (
            <Row>
                <Col
                    className={
                        "d-flex align-items-center justify-content-center"
                    }
                >
                    <Spinner animation="border" role="status" />
                </Col>
            </Row>
        );
    return (
        <Row className={"pt-5"}>
            <FormsList />
        </Row>
    );
}

export default GeneratorSection;
