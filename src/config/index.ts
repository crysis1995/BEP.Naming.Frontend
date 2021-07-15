const config = {
    url: {
        graphQL:
            process.env.NODE_ENV === "development"
                ? "http://localhost:1337/graphql"
                : "https://bep-naming-backend.herokuapp.com/graphql",
    },
};

export default config;
