import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import casual from 'casual';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';

import gql from 'graphql-tag';

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
    Date: () =>
        `${casual.day_of_month}/${casual.month_number}/${casual.integer(2023, 2024)}`,
    String: () => casual.short_description,
    Query: () => ({
        allDays: () => [...new Array(casual.integer(1, 5))]
        // Works in Apollo v2 only
        // allDays: () => new MockList([1, 15])
    })
};

const server = new ApolloServer<MyContext>({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        mocks
    })
});

startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 }
}).then(({ url }) => {
    console.log(`Server running at ${url}`);
});
