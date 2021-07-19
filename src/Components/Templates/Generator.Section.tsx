import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import FormsList from "../Organism/Forms.List";
import CodeList from "../Organism/Code.List";

function GeneratorSection() {
    const isLoading = useSelector(
        (state: RootState) =>
            state.generator.layersLoading || state.generator.nodesLoading
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
        <>
            <Row className={"pt-5"}>
                <FormsList />
            </Row>
            <Row className={"pt-5 justify-content-center"}>
                <CodeList />
            </Row>
        </>
    );
}

export default GeneratorSection;
