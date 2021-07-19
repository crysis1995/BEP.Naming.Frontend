import React, { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { Button, Col } from "react-bootstrap";

type Props = {};

const SEPARATOR = "-";

const codedValueSelector = createSelector(
    (state: RootState) => state.generator.layersOrder,
    (state: RootState) => state.generator.layersEntities,
    (state: RootState) => state.generator.nodesEntities,
    (layersOrder, layers, nodes) => {
        if (layers && nodes) {
            return layersOrder.reduce<{
                codes: string[];
                canBeCopied: boolean;
            }>(
                (prev, [layerID, value]) => {
                    const layerOption = layers?.[layerID].options[0];
                    if (layerOption.__typename === "ComponentInputsSelect") {
                        if (value !== undefined && nodes[value]) {
                            prev.codes.push(nodes[value].code);
                            prev.canBeCopied = prev.canBeCopied && true;
                        } else {
                            prev.canBeCopied = prev.canBeCopied && false;
                        }
                    } else {
                        if (value !== undefined && value) {
                            const regexp = layerOption?.regex;
                            let test = true;
                            if (regexp) {
                                test = new RegExp(regexp).test(value);
                            }
                            if (test) {
                                prev.codes.push(value);
                                prev.canBeCopied = prev.canBeCopied && true;
                            }
                        } else {
                            prev.canBeCopied =
                                prev.canBeCopied &&
                                layers?.[layerID].isOptional;
                        }
                    }
                    return prev;
                },
                { codes: [], canBeCopied: true }
            );
        }
    }
);

function CodeList(props: Props) {
    const codes = useSelector(codedValueSelector);
    const generatedCode = codes && codes.codes.join(SEPARATOR);
    const [possible, setPossible] = useState(Boolean(codes?.canBeCopied));

    useEffect(() => {
        setPossible(Boolean(codes?.canBeCopied));
    }, [codes?.codes, codes?.canBeCopied]);

    function HandleCopyButton() {
        if (generatedCode) {
            navigator.clipboard.writeText(generatedCode);
            alert("Skopiowano wygenerowany kod");
        }
    }

    if (!codes) return <></>;
    return (
        <>
            <Col />
            <Col className={"text-center"}>
                <h2>{generatedCode}</h2>
            </Col>
            <Col>
                <Button
                    onClick={HandleCopyButton}
                    disabled={!possible}
                    className={"float-right"}
                >
                    Kopiuj kod
                </Button>
            </Col>
        </>
    );
}

export default CodeList;
