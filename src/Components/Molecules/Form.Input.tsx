import React, { useState } from "react";
import { LayerWithInputOptions } from "../../redux/Generator/FetchAllLayers.query";
import Label from "../Atoms/Label";
import InputText from "../Atoms/Input.Text";
import ValidatorText from "../Atoms/Validator.Text";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { actions as GeneratorActions } from "../../redux/Generator";

type Props = {
    layer: LayerWithInputOptions;
    index: number;
};

function FormInput(props: Props) {
    const dispatch = useDispatch();
    const layerValue = useSelector(
        (state: RootState) =>
            state.generator.layersOrder.find(
                (x) => x[0] === props.layer.id
            )?.[1]
    );

    // const [inputValue, setInputValue] = useState<string | undefined>(
    //     props.layer.options[0].default || layerValue
    // );
    const [validatyStatus, setValidatyStatus] = useState<boolean | undefined>(
        CheckIsValueIsValid(layerValue)
    );

    function HandleChangeValue(data: string) {
        dispatch(
            GeneratorActions.SelectValuesOfLayer({
                value: data,
                levelID: props.layer.id,
            })
        );
        setValidatyStatus(CheckIsValueIsValid(data));
    }

    function CheckIsValueIsValid(data: string | undefined) {
        if (data === undefined) return props.layer.isOptional;
        const regex = props.layer.options[0].regex;
        if (regex) return new RegExp(regex).test(data);
    }

    return (
        <>
            <Label message={props.layer.description} index={props.index + 1} />
            <InputText
                isValid={validatyStatus}
                defaultValue={props.layer.options[0].default || ""}
                textValue={layerValue || ""}
                placeholder={props.layer.options[0].placeholder || ""}
                onChange={HandleChangeValue}
            />
            {!validatyStatus && (
                <ValidatorText
                    message={"Popraw wartość!"}
                    isValid={Boolean(validatyStatus)}
                />
            )}
        </>
    );
}

export default FormInput;
