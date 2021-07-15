import { NodeSelect } from "./FetchAllNodeSelects.query";

export type Store = {
    loading: boolean;
    entities: null | { [key: string]: NodeSelect };
    ids: string[];
};
