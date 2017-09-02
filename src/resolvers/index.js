import GraphQLDate from 'graphql-date';

import UserResolver from './user-resolver';

export default {
  Date: GraphQLDate,
  Query: {
    me: UserResolver.me,
    search: UserResolver.search,
  },
  Mutation: {
    signup: UserResolver.signup,
    login: UserResolver.login,
  },
};
