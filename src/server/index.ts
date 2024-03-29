import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import casual from 'casual';
import cors from 'cors';
import express from 'express';
import gql from 'graphql-tag';
import http from 'http';

interface MyContext {
    token?: string;
}

const typeDefs = gql`
    scalar Date

    """
    An object that describes the characteristics of a programming day
    """
    type ProgrammingDay {
        "A programming day unique identifier"
        id: ID!
        "The date that the day occured"
        date: Date!
        "The task that was completed on a day"
        task: String!
        conditions: Conditions
    }

    enum Conditions {
        BUSY
        NORMAL
        BORING
    }

    type Query {
        totalDays: Int!
        allDays: [ProgrammingDay!]!
    }

    input AddDayInput {
        date: Date!
        task: String!
        conditions: Conditions
    }

    type RemoveDayPayload {
        day: ProgrammingDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input: AddDayInput!): ProgrammingDay!
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: ProgrammingDay!
    }
`;

/*
Sample mutations:

mutation {
  addDay(input: {
    date: "22/05/1987"
    task: "Task"
    conditions: BORING
  }) {
      date
      id
      task
  }
}

mutation {
  removeDay(id: "3") {
    day {
      date
      id
      task
    }
  }
}
 */

const resolvers = {};

const mocks = {
    Date: () => `${casual.day_of_month}/${casual.month_number}/${casual.integer(2023, 2024)}`,
    String: () => casual.short_description,
    Query: () => ({
        allDays: () => [...new Array(casual.integer(1, 5))]
        // Works in Apollo v2 only

        // allDays: () => new MockList([1, 15])
    })
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        mocks
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

server.start().then(() => {
    app.use(
        '/graphql',
        cors<cors.CorsRequest>({ origin: ['https://localhost', 'http://localhost'] }),
        express.json(),
        expressMiddleware(server)
    );
});

httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
