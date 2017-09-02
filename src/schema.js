export default`
# Date type to format the date in UTC format, e.g. 2017-07-23T19:25:29.143Z
scalar Date

type Auth {
  token: String!
}

type User {
  _id: ID!
  username: String!
  email: String!
  firstName: String!
  lastName: String
  avatar: String
  createdAt: Date!
  updatedAt: Date!
}

type Me {
  _id: ID!
  username: String
  email: String
  firstName: String
  lastName: String
  avatar: String
  createdAt: Date!
  updatedAt: Date!
}

type Query {
  # Get the details of the user.
  me: Me
  # Search users
  search(query: String!): [User]
}

type Mutation {
  signup(
    email: String!
    fullName: String!
    password: String!
    username: String!
    avatar: String
  ): Auth
  login(username: String!, password: String!): Auth
}

schema {
  query: Query
  mutation: Mutation
}
`;
