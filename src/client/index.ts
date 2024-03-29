// Direct imports are necessary if you're not using it in React but in standalone form
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache.js';
import { ApolloClient } from '@apollo/client/core/ApolloClient.js';
import { gql } from '@apollo/client/core/index.js';
import express from 'express';
import http from 'http';

const port = 4100;
const host = 'http://localhost';

const app = express();

app.use('/', (_req, res) => {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache()
    });

    client
        .query({
            query: gql`
                query {
                    allDays {
                        date
                        task
                        id
                    }
                }
            `
        })
        .then((result: unknown) => {
            res.json(result);
        });
});

const httpServer = http.createServer(app);

httpServer.listen({ port }, () => {
    console.log(`🚀 Client ready at ${host}:${port}`);
});
