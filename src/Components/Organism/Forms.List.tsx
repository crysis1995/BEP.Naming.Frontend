import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import FormCollector from "../Molecules/Form.Collector";
import { Col } from "react-bootstrap";

type Props = {};
function FormsList(props: Props) {
    const layersOrder = useSelector(
        (state: RootState) => state.layers.layersOrder
    );

    return (
        <>
            {layersOrder.map(([layerID], index) => {
                return (
                    <Col key={index}>
                        <FormCollector layerID={layerID} index={index} />
                    </Col>
                );
            })}
        </>
    );
}
export default FormsList;
