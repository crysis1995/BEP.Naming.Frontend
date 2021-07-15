import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import FormSelect from "./Form.Select";
import {
    LayerWithInputOptions,
    LayerWithSelectOptions,
} from "../../redux/Layers/FetchAllLayers.query";
import FormInput from "./Form.Input";

type Props = {
    layerID: string;
    index: number;
};

function FormCollector(props: Props) {
    console.log(props.index);
    const layer = useSelector(
        (state: RootState) => state.layers.entities?.[props.layerID]
    );
    if (layer?.options && layer?.options?.length > 0) {
        if (layer.options[0].__typename === "ComponentInputsSelect") {
            return (
                <FormSelect
                    layer={layer as LayerWithSelectOptions}
                    index={props.index}
                />
            );
        } else if (layer.options[0].__typename === "ComponentInputsText") {
            return (
                <FormInput
                    layer={layer as LayerWithInputOptions}
                    index={props.index}
                />
            );
        } else {
            return <p>Nie znaleziono</p>;
        }
    }
    return null;
}

export default FormCollector;
