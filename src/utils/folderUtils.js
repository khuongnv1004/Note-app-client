import { graphqlRequest } from "./request";

export const folderLoader = async () => {
    const query = `query Folders {
      folders{
        id
        name
        createdAt
      }
    }`;
    const {data, message}  = await graphqlRequest({query})
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

export const deleteFolder = async (folderId) => {
  const query = `mutation Mutation($id:String!) {
    deleteFolder(id: $id){
      name
    }
  }`;
  const {data}  = await graphqlRequest({query, variables:{id:folderId}})
  return data;
}

export const deleteNotebyFolder = async (folderId) => {
  const query = `mutation Mutation($id:String!) {
    deleteNotebyFolder(id: $id){
      content
    }
  }`;
  const {data}  = await graphqlRequest({query, variables:{id:folderId}})
  return data;
}