import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import UserType from '../type/UserType'
import register from '../auth/register'

export default mutationWithClientMutationId({
  name: 'Register',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: payload => payload.user,
    },
  },
  mutateAndGetPayload: (input, { db }) => register(input)
    .then(result => db.createUser({ ...input, ...result })),
})
