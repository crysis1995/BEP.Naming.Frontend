import { Layer } from "./FetchAllLayers.query";

export type Store = {
    loading: boolean;
    entities: null | { [key: string]: Layer };
    ids: string[];
    layersOrder: Array<[string, string]>;
};
