"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var typeDefs = gql(__makeTemplateObject(["\n    type ProgrammingDay {\n        id: ID!\n        date: String!\n        task: String!\n        conditions: Conditions\n    }\n\n    enum Conditions {\n        BUSY\n        NORMAL\n        BORING\n    }\n\n    type Query {\n        totalDays: Int!,\n        allDays: [ProgrammingDay!]!\n    }\n"], ["\n    type ProgrammingDay {\n        id: ID!\n        date: String!\n        task: String!\n        conditions: Conditions\n    }\n\n    enum Conditions {\n        BUSY\n        NORMAL\n        BORING\n    }\n\n    type Query {\n        totalDays: Int!,\n        allDays: [ProgrammingDay!]!\n    }\n"]));
var resolvers = {};
var server = new ApolloServer({
    typeDefs: typeDefs,
    mocks: true
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Server running at ".concat(url));
});
