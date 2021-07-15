import React, { useEffect } from "react";
import Navbar from "../Components/Templates/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import { batch, useDispatch } from "react-redux";
import { fetchAllLayers } from "../redux/Layers";
import GeneratorSection from "../Components/Templates/Generator.Section";
import { fetchAllNodeSelects } from "../redux/Node.Selects";

function DefaultView() {
    const dispatch = useDispatch();

    useEffect(() => {
        batch(() => {
            dispatch(fetchAllLayers(2));
            dispatch(fetchAllNodeSelects(2));
        });
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <Container fluid className={"p-5"}>
                <Row>
                    <Col>
                        <h2>
                            <span>Generator nazewnictwa BEP dla projektu </span>
                            <br />
                            <strong className={"text-muted"}>
                                Centrum sportowo rekreacyjne w Płocku
                            </strong>
                        </h2>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={"p-5"}>
                <GeneratorSection />
            </Container>
        </>
    );
}

export default DefaultView;
