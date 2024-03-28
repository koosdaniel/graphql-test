"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type ProgrammingDay {\n    id: ID!\n    date: String!\n    task: String!\n    conditions: Conditions\n  }\n\n  enum Conditions {\n    BUSY\n    NORMAL\n    BORING\n  }\n\n  type Query {\n    totalDays: Int!\n    allDays: [ProgrammingDay!]!\n  }\n"], ["\n  type ProgrammingDay {\n    id: ID!\n    date: String!\n    task: String!\n    conditions: Conditions\n  }\n\n  enum Conditions {\n    BUSY\n    NORMAL\n    BORING\n  }\n\n  type Query {\n    totalDays: Int!\n    allDays: [ProgrammingDay!]!\n  }\n"])));
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    mocks: true,
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Server running at ".concat(url));
});
var templateObject_1;
