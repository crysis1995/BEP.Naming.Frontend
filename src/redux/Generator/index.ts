import { Store } from "./types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../services/graphql";
import { Data, FetchAllLayersQuery } from "./FetchAllLayers.query";
import {
    FetchAllNodeSelectsQuery,
    GetAllNodes,
} from "./FetchAllNodeSelects.query";
import normalize from "../../utils/Normalize";

const INITIAL_STATE: Store = {
    layersIds: [],
    layersOrder: [],
    layersEntities: null,
    layersLoading: false,
    nodesEntities: null,
    nodesIds: [],
    nodesLoading: false,
};

export type ChooseLevelWithValue = {
    levelID: string;
    value: string | undefined;
};

export const fetchAllLayers = createAsyncThunk(
    "generator/fetchAllLayers",
    async (projectID: number) => {
        const response = await client.query<Data>({
            query: FetchAllLayersQuery,
            variables: {
                project: projectID,
            },
        });
        if (response.data) return response.data;
        throw new Error(response?.error?.message);
    }
);
export const fetchAllNodeSelects = createAsyncThunk(
    "generator/fetchAllNodeSelects",
    async (projectID: number) => {
        const response = await client.query<GetAllNodes>({
            query: FetchAllNodeSelectsQuery,
            variables: {
                project: projectID,
            },
        });
        if (response.data) return response.data;
        throw new Error(response?.error?.message);
    }
);

const generator = createSlice({
    name: "generator",
    initialState: INITIAL_STATE,
    reducers: {
        SelectValuesOfLayer: (
            state,
            action: PayloadAction<ChooseLevelWithValue>
        ) => {
            // extract index of current layer
            const currentLayerIndex = state.layersOrder.findIndex(
                (x) => x[0] === action.payload.levelID
            );

            if (currentLayerIndex >= 0)
                //set value in tuple => [layerID, layerValue]
                state.layersOrder[currentLayerIndex][1] = action.payload.value;

            // check if any children exist in current Layer
            if (
                state.layersEntities?.[action.payload.levelID]?.children &&
                state.layersEntities?.[action.payload.levelID]?.children
                    ?.length > 0
            ) {
                //  Extract first children from layer options
                const childID =
                    state.layersEntities?.[action.payload.levelID]?.children[0]
                        .id; // current solution based on only one child layer - when it will be more, should solve in other way

                state.layersOrder[currentLayerIndex + 1] = [childID, undefined];
            }

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLayers.pending, (state, action) => {
                state.layersLoading = true;
            })
            .addCase(fetchAllLayers.fulfilled, (state, action) => {
                state.layersEntities = normalize(action.payload.layers, "id");
                state.layersIds = action.payload.layers.map((x) => x.id);
                const initialLayer = action.payload.layers.find(
                    (x) => x.isMain
                );
                initialLayer && state.layersOrder.push([initialLayer.id, ""]);
                state.layersLoading = false;
            });
        builder
            .addCase(fetchAllNodeSelects.pending, (state) => {
                state.nodesLoading = true;
            })
            .addCase(fetchAllNodeSelects.fulfilled, (state, action) => {
                state.nodesIds = action.payload.nodeSelects.map((x) => x.id);
                state.nodesEntities = normalize(
                    action.payload.nodeSelects,
                    "id"
                );
                state.nodesLoading = false;
            });
    },
});
export const { reducer, actions } = generator;
