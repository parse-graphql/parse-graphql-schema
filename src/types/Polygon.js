import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import { property } from 'lodash/fp';
import CoordinateArray from './CoordinateArray';
import GeoPoint from './GeoPoint';
import Parse from 'parse';

const CoordinateArrayList = GraphQLList(CoordinateArray);
const GeoPointList = GraphQLList(GeoPoint);

const CoordinatesType = new GraphQLUnionType({
  name: 'Coordinates',
  types: [CoordinateArrayList, GeoPointList],
  resolveType(value) {
    if (value.length === 0) {
      return CoordinateArrayList;
    }

    if (value[0].constructor === Parse.GeoPoint) {
      return GeoPointList;
    }

    return CoordinateArrayList;
  }
});

export default new GraphQLObjectType({
  name: 'Polygon',
  fields: {
    coordinates: {
      type: CoordinatesType,
      resolve: property('coordinates'),
    },
    containsPoint: {
      type: GraphQLBoolean,
      args: {
        point: GeoPoint
      }
    }
  },
});
