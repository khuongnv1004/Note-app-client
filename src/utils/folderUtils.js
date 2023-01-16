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
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name:String!) {
    addFolder(name: $name){
      name
      author{
        name
      }
      
    }
  }`;
  const {data}  = await graphqlRequest({query, variables:{name:newFolder.name}})
  console.log(data);
  return data;
}