export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folders($folderId: String) {
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
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Folders($noteId: String) {
        note(noteId: $noteId) {
            content
          }
      }`;

  const { data } = await graphqlRequest({ query, variables: { noteId } });
  return data;
};
