import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import client from "../../services/graphql";
import {Data, FetchAllLayersQuery,} from "./FetchAllLayers.query";
import {Store as LayerStore} from "./types";
import normalize from "../../utils/Normalize";

const INITIAL_STATE: LayerStore = {
    loading: false,
    entities: null,
    ids: [],
    layersOrder: [],
};

export const fetchAllLayers = createAsyncThunk(
    "layers/fetchAll",
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

export type ChooseLevelWithValue = {
    levelID: string;
    value: string;
};

const layers = createSlice({
    name: "layers",
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
                state.entities?.[action.payload.levelID]?.children &&
                state.entities?.[action.payload.levelID]?.children?.length > 0
            ) {
                //  Extract first children from layer options
                const childID =
                    state.entities?.[action.payload.levelID]?.children[0].id; // current solution based on only one child layer - when it will be more, should solve in other way

                state.layersOrder[currentLayerIndex + 1] = [childID, ""];

                // if (
                //     state.entities?.[childID].options[0].__typename ===
                //     "ComponentInputsSelect"
                // ) {
                //     const data = state.entities?.[childID]
                //         .options[0] as ComponentInputsSelect;
                // }
            }

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLayers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAllLayers.fulfilled, (state, action) => {
                state.entities = normalize(action.payload.layers, "id");
                state.ids = action.payload.layers.map((x) => x.id);
                const initialLayer = action.payload.layers.find(
                    (x) => x.isMain
                );
                initialLayer && state.layersOrder.push([initialLayer.id, ""]);
                state.loading = false;
            });
    },
});

export const { reducer, actions } = layers;
