import { gql } from "@apollo/client";

export const FetchAllLayersQuery = gql`
    query getData($project: ID) {
        layers(sort: "id:ASC", where: { project: $project }) {
            id
            parent {
                id
            }
            children {
                id
            }
            description
            isMain
            isOptional
            options {
                ... on ComponentInputsSelect {
                    id
                    defaultOption: default {
                        id
                    }
                    options {
                        id
                    }
                }
                ... on ComponentInputsText {
                    id
                    default
                    placeholder
                    regex
                }
            }
        }
    }
`;

export interface Data {
    layers: Layer[];
}

export type Layer = LayerWithSelectOptions | LayerWithInputOptions;

export interface LayerWithSelectOptions extends LayerBase {
    options: ComponentInputsSelect[];
}
export interface LayerWithInputOptions extends LayerBase {
    options: ComponentInputsText[];
}

export interface LayerBase {
    id: string;
    parent: {
        id: string;
    };
    children: {
        id: string;
    }[];
    description: string;
    isMain: boolean;
    isOptional: boolean;
}

export interface ComponentInputsSelect {
    __typename: "ComponentInputsSelect";
    defaultOption: {
        id: string;
    } | null;
    options: { id: string }[];
}
export interface ComponentInputsText {
    __typename: "ComponentInputsText";
    default: null | string;
    placeholder: string | null;
    regex: string | null;
}
