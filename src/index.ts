import { ApolloServer, gql } from 'apollo-server';
import casual from 'casual';

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
    date
    id
    task
  }
}
 */

// const resolvers = {};

const mocks = {
    Date: () => '1/2/2024',
    String: () => 'Cool Data',
    Query: () => ({
        allDays: () => [...new Array(casual.integer(1, 5))]
        // Works in Apollo v2 only
        // allDays: () => new MockList([1, 15])
    })
};

const server = new ApolloServer({
    typeDefs,
    // resolvers,
    mocks
});

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
});
