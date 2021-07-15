import React, { useEffect } from "react";
import Label from "../Atoms/Label";
import { LayerWithSelectOptions } from "../../redux/Layers/FetchAllLayers.query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import InputSelect from "../Atoms/Input.Select";
import { actions as LayerActions } from "../../redux/Layers";

type Props = {
    layer: LayerWithSelectOptions;
    index:number
};

const LayerOptionsSelector = createSelector(
    (state: RootState) => state.nodeSelects.entities,
    (state: RootState, componentProps: Props) => componentProps.layer.options,
    (nodes, options) => {
        if (nodes && options && options.length > 0) {
            return options[0].options.map((item) => ({
                id: nodes[item.id]?.id,
                name: nodes[item.id]?.description,
            }));
        }
        return [];
    }
);

function FormSelect(props: Props) {
    const dispatch = useDispatch();
    const layerOptions = useSelector((state: RootState) =>
        LayerOptionsSelector(state, props)
    );
    const layerValue = useSelector(
        (state: RootState) =>
            state.layers.layersOrder.find(
                (x) => x[0] === props.layer.id
            )?.[1] || ""
    );

    const defaultValueID = props.layer.options[0].defaultOption?.id;
    const defaultValueFromSelectNodes = useSelector((state: RootState) =>
        defaultValueID ? state.nodeSelects.entities?.[defaultValueID] : null
    );

    useEffect(() => {
        if (defaultValueFromSelectNodes) {
            handleSelectOption(defaultValueFromSelectNodes.id);
        }
    }, []);

    function handleSelectOption(data: string) {
        dispatch(
            LayerActions.SelectValuesOfLayer({
                value: data,
                levelID: props.layer.id,
            })
        );
    }
    return (
        <>
            <Label message={props.layer.description} index={props.index + 1}/>
            <InputSelect
                selectValue={layerValue}
                options={layerOptions}
                withNonValueOption={true}
                onSelect={handleSelectOption}
            />
        </>
    );
}

export default FormSelect;
