import { Store as NodeSelectStore } from "./types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../services/graphql";
import {
    FetchAllNodeSelectsQuery,
    GetAllNodes,
} from "./FetchAllNodeSelects.query";
import normalize from "../../utils/Normalize";

const INITIAL_STATE: NodeSelectStore = {
    loading: false,
    entities: null,
    ids: [],
};

export const fetchAllNodeSelects = createAsyncThunk(
    "nodeSelects/fetchAll",
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

const nodeSelects = createSlice({
    name: "nodeSelects",
    reducers: {},
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNodeSelects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllNodeSelects.fulfilled, (state, action) => {
                state.ids = action.payload.nodeSelects.map((x) => x.id);
                state.entities = normalize(action.payload.nodeSelects, "id");
                state.loading = false;
            });
    },
});

export const { reducer, actions } = nodeSelects;
