import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from "../../config";

const client = new ApolloClient({
    uri: config.url.graphQL,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
        },
    },
});

export default client;


