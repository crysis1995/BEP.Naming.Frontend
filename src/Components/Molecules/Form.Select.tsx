import React, { useEffect } from "react";
import Label from "../Atoms/Label";
import { LayerWithSelectOptions } from "../../redux/Generator/FetchAllLayers.query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import InputSelect from "../Atoms/Input.Select";
import { actions as GeneratorActions } from "../../redux/Generator";

type Props = {
    layer: LayerWithSelectOptions;
    index: number;
};

const LayerOptionsSelector = createSelector(
    (state: RootState) => state.generator.layersEntities,
    (state: RootState) => state.generator.layersOrder,
    (state: RootState) => state.generator.nodesEntities,
    (state: RootState, componentProps: Props) => componentProps.layer,
    (layers, layersOrder, nodes, currentLayer) => {
        if (
            layers &&
            layersOrder &&
            nodes &&
            currentLayer &&
            currentLayer.options.length > 0
        ) {
            const currentLayerIndex = layersOrder.findIndex(
                (x) => x[0] === currentLayer.id
            );
            if (currentLayerIndex > 0) {
                const previousLayerArray = layersOrder[currentLayerIndex - 1];

                const currentLayerOptions = currentLayer.options[0].options.map(
                    (x) => x.id
                );

                // get previous layer id and  value
                const [, previousLayerValue] = previousLayerArray;

                if (
                    previousLayerValue !== undefined &&
                    nodes?.[previousLayerValue]?.children.length > 0
                ) {
                    return currentLayerOptions
                        .filter(
                            (id) => nodes[id].parent?.id === previousLayerValue
                        )
                        .map((id) => ({ id, name: nodes[id].description }));
                } else {
                    return currentLayerOptions
                        .filter((id) => nodes[id].parent === null)
                        .map((id) => ({ id, name: nodes[id].description }));
                }
            } else
                return currentLayer.options[0].options.map((item) => ({
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
    ).sort((a, b) => a?.name?.localeCompare(b?.name));
    const layerValue = useSelector(
        (state: RootState) =>
            state.generator.layersOrder.find(
                (x) => x[0] === props.layer.id
            )?.[1] || ""
    );

    const defaultValueID = props.layer.options?.[0].defaultOption?.id;
    const defaultValueFromSelectNodes = useSelector((state: RootState) =>
        defaultValueID ? state.generator.nodesEntities?.[defaultValueID] : null
    );

    console.log(defaultValueID);

    useEffect(() => {
        if (defaultValueFromSelectNodes) {
            handleSelectOption(defaultValueFromSelectNodes.id);
        }
    }, []);

    function handleSelectOption(data: string) {
        dispatch(
            GeneratorActions.SelectValuesOfLayer({
                value: data,
                levelID: props.layer.id,
            })
        );
    }
    return (
        <>
            <Label message={props.layer.description} index={props.index + 1} />
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
