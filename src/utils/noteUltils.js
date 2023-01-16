
import { graphqlRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Note($folderId: String!) {
      folder(folderId: $folderId){
        id
        name
        notes {
          id
          content
        }
      }
    }`;

  const { data } = await graphqlRequest({ query, variables: { folderId } });
  console.log({data});
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
        note(noteId: $noteId) {
            content
          }
      }`;

  const { data } = await graphqlRequest({ query, variables: { noteId } });
  return data;
};

export const addNewNote = async ({ params, request}) => {
  const newNote = await request.formData();
  const formDataObj = {}
  newNote.forEach((value,key)=>(formDataObj[key]= value))
  console.log("123",formDataObj);
  const query = `mutation Mutation($content: String!, $folderId:ID!) {
        addNote(content: $content, folderId:$folderId) {
          id
          content
          }
      }`;

  const  addNote  = await graphqlRequest({ query, variables: formDataObj });
  console.log("",addNote);
  return addNote
};

export const updateNote = async ({ params, request}) => {
  const updatedNote = await request.formData();
  const id =  params.noteId
  const formDataObj = {}
  updatedNote.forEach((value,key)=>(formDataObj[key]= value))
  formDataObj.id = id;
  console.log("123",formDataObj);

  const query = `mutation Mutation($id: String!,$content: String!) {
    updateNote(id:$id ,content: $content) {
          id
          content
          }
      }`;

  const  updateNote  = await graphqlRequest({ query, variables: formDataObj });
  console.log("",updateNote);
  return updateNote
};


