import { Layer } from "./FetchAllLayers.query";
import { NodeSelect } from "./FetchAllNodeSelects.query";

export type Store = {
    layersLoading: boolean;
    layersEntities: null | { [key: string]: Layer };
    layersIds: string[];
    layersOrder: Array<[string, string | undefined]>;
    nodesLoading: boolean;
    nodesEntities: null | { [key: string]: NodeSelect };
    nodesIds: string[];
};
