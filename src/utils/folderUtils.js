import { graphqlRequest } from "./request";

export const folderLoader = async () => {
    const query = `query Folders {
      folders{
        id
        name
        createdAt
      }
    }`;
    const {data}  = await graphqlRequest({query})
    console.log(data);
    return data;
}