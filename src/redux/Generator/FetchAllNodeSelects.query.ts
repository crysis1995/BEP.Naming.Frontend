import { gql } from "@apollo/client";

export const FetchAllNodeSelectsQuery = gql`
    query GetAllNodes($project: ID) {
        nodeSelects(where: { project: $project }) {
            id
            code
            description
            parent {
                id
            }
            children {
                id
            }
        }
    }
`;


export interface GetAllNodes {
    nodeSelects: NodeSelect[];
}

export interface NodeSelect {
    id:          string;
    code:        string;
    description: string;
    parent:      Child | null;
    children:    Child[];
}

export interface Child {
    id: string;
}
