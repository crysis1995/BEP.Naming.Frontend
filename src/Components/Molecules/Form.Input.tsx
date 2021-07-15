import React, { useEffect, useState } from "react";
import { LayerWithInputOptions } from "../../redux/Layers/FetchAllLayers.query";
import Label from "../Atoms/Label";
import InputText from "../Atoms/Input.Text";
import ValidatorText from "../Atoms/Validator.Text";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { actions as LayerActions } from "../../redux/Layers";

type Props = {
    layer: LayerWithInputOptions;
    index: number;
};

function FormInput(props: Props) {
    const dispatch = useDispatch();
    const layerValue = useSelector(
        (state: RootState) =>
            state.layers.layersOrder.find(
                (x) => x[0] === props.layer.id
            )?.[1] || ""
    );
    const [inputValue, setInputValue] = useState(layerValue);

    const [validatyStatus, setValidatyStatus] = useState<boolean | undefined>(
        undefined
    );
    // const [validatyMessage, setValidatyMessage] = useState("Ni");

    useEffect(() => {
        if (validatyStatus) {
            dispatch(
                LayerActions.SelectValuesOfLayer({
                    value: inputValue,
                    levelID: props.layer.id,
                })
            );
        }
        console.log(validatyStatus, inputValue);
    }, [validatyStatus, inputValue]);

    function HandleChangeValue(data: string) {
        setInputValue(data);
        setValidatyStatus(CheckIsValueIsValid(data));
    }

    function CheckIsValueIsValid(data: string) {
        const regex = props.layer.options[0].regex;
        if (regex) return new RegExp(regex).test(data);
    }

    return (
        <>
            <Label message={props.layer.description} index={props.index + 1} />
            <InputText
                isValid={validatyStatus}
                textValue={inputValue}
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
