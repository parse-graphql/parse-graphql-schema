import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'File',
  fields: {
    url: {
      type: GraphQLString,
      resolve(file) {
        return file.url();
      },
    },
    name: {
      type: GraphQLString,
      resolve(file) {
        return file.url();
      },
    },
  },
});
