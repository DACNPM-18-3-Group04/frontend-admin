import api from '../../';
import { getAuthConfig } from '../../';

const graphqlPath = '/graphql';
const graphqlConfig = () => {
  const config = getAuthConfig();
  return {
    headers: {
      Authorization: config.headers.Authorization,
      'Content-Type': 'application/json',
    },
  };
};

export const fetchAll = async () => {
  const config = graphqlConfig();
  return api.post(
    `${graphqlPath}`,
    {
      query: `query Provinces {
        provinces {
          success
          message
          data {
            id
            name
            districts {
              id
              name
            }
          }
        }
      }
      `,
    },
    config,
  );
};

export const upsertDistrict = async ({
  districtName = null,
  provinceId = null,
  id = null,
}) => {
  const config = graphqlConfig();
  return api.post(
    `${graphqlPath}`,
    {
      query: `mutation UpsertDistrict(
        $districtName: String!
        $provinceId: ID!
        $upsertDistrictId: ID
      ) {
        upsertDistrict(
          districtName: $districtName
          provinceId: $provinceId
          id: $upsertDistrictId
        ) {
          data {
            id
            name
          }
          message
          success
        }
      }
      `,
      variables: {
        districtName: districtName,
        provinceId: provinceId,
        upsertDistrictId: id,
      },
    },
    config,
  );
};

export const removeDistrict = async (districtId = '') => {
  const config = graphqlConfig();
  return api.post(
    `${graphqlPath}`,
    {
      query: `mutation RemoveDistrict($removeDistrictId: ID!) {
        removeDistrict(id: $removeDistrictId) {
          success
          message
        }
      }
      `,
      variables: {
        removeDistrictId: districtId,
      },
    },
    config,
  );
};

export const upsertProvince = async ({ provinceName = null, id = null }) => {
  const config = graphqlConfig();
  return api.post(
    `${graphqlPath}`,
    {
      query: `mutation UpsertProvince($provinceName: String!, $upsertProvinceId: ID) {
        upsertProvince(provinceName: $provinceName, id: $upsertProvinceId) {
          data {
            id
            name
          }
          message
          success
        }
      }
      `,
      variables: {
        provinceName: provinceName,
        upsertProvinceId: id,
      },
    },
    config,
  );
};

export const removeProvince = async (provinceId = '') => {
  const config = graphqlConfig();
  return api.post(
    `${graphqlPath}`,
    {
      query: `mutation RemoveProvince($removeProvinceId: ID!) {
        removeProvince(id: $removeProvinceId) {
          success
          message
        }
      }
      `,
      variables: {
        removeProvinceId: provinceId,
      },
    },
    config,
  );
};

const AdminLocationGraphQLAPI = {
  fetchAll,
  upsertDistrict,
  removeDistrict,
  upsertProvince,
  removeProvince,
};

export default AdminLocationGraphQLAPI;
