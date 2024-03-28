import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type ProgrammingDay {
    id: ID!
    date: String!
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
`;

// const resolvers = {};

const server = new ApolloServer({
  typeDefs,
  // resolvers,
  mocks: true,
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
