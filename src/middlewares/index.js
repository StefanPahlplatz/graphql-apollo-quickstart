// @flow

import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import GQLschema from '../schema';
import resolvers from '../resolvers';

import auth from './auth';
import { GRAPHQL_PATH } from '../utils/constants';

const schema = makeExecutableSchema({ typeDefs: GQLschema, resolvers });

/**
 * Wrap the server with the middlewares.
 * @param {*Object} app the express server you want to apply the middlewares to.
 */
const applyMiddlewares = (app: Object) => {
  // Parse HTTP information as JSON.
  app.use(bodyParser.json());

  // Use the authentication to insert a 'user' in the request.
  app.use(auth);

  // The graphical route at '/graphiql'.
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: GRAPHQL_PATH,
    }),
  );

  // Initialize GraphQL.
  app.use(
    GRAPHQL_PATH,
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user,
      },
    })),
  );
};

export default applyMiddlewares;
