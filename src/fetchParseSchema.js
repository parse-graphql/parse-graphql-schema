import axios from 'axios';
import { get } from 'lodash';

export default async function fetchParseSchema({ serverURL, appId, masterKey }) {
  const response = await axios({
    method: 'get',
    url: `${serverURL}/schemas`,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Master-Key': masterKey,
    },
  });

  if (response.status !== 200) {
    throw new Error('Error retrieving Parse schema');
  }

  if (!get(response, 'data.results') || !response.data.results.length) {
    throw new Error('No Parse classes found');
  }

  return response.data.results;
}
