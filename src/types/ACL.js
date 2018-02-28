import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'ACL',
  fields: {
    publicReadAccess: {
      type: GraphQLBoolean,
      resolve(acl) {
        return acl.getPublicReadAccess();
      },
    },
    publicWriteAccess: {
      type: GraphQLBoolean,
      resolve(acl) {
        return acl.getPublicWriteAccess();
      },
    },
    readAccess: {
      type: GraphQLBoolean,
      resolve(acl, { userId }) {
        return acl.getReadAccess(userId);
      },
    },
    writeAccess: {
      type: GraphQLBoolean,
      resolve(acl, { userId }) {
        return acl.getWriteAccess(userId);
      },
    },
    roleReadAccess: {
      type: GraphQLBoolean,
      resolve(acl, { role }) {
        return acl.getRoleReadAccess(role);
      },
    },
    roleWriteAccess: {
      type: GraphQLBoolean,
      resolve(acl, { role }) {
        return acl.getRoleWriteAccess(role);
      },
    },
  },
});
