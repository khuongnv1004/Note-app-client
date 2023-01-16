import { NoteAddOutlined } from "@mui/icons-material";
import { Card, CardContent, Grid, List, Box , Typography,Tooltip,IconButton} from "@mui/material";
import React , {useEffect, useState} from "react";
import { Link, Outlet, useLoaderData, useNavigate, useParams, useSubmit } from "react-router-dom";

export default function NoteList() {
  const {folder} = useLoaderData();
  const {noteId, folderId} = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const submit = useSubmit();
  const handleAddNewNote = ()=>{
    submit({
      content:'', folderId
    },{
      method:'post',
      action:`/folders/${folderId}`
    })
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(noteId){
      setActiveNoteId(noteId)
      return;
    }
    if(folder?.notes?.[0]){
      navigate(`note/${folder?.notes?.[0].id}`)
      return

    }

  },[noteId, folder.notes])
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={4}>
        <List
          sx={{
            maxWidth: 360,
            width: "100%",
            bgcolor: "#F0EBE3",
            height: "100%",
            padding: "10px",
            textAlign: "left",
            overflowY: "auto",
          }}
          subheader={
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Typography sx={{ fontWeight: "bold" }}>
                Notes
              </Typography>
              <Tooltip title="Add Folder" onClick={handleAddNewNote} >
            <IconButton size='small'>
                <NoteAddOutlined sx={{color:'black'}}/>
            </IconButton>
        </Tooltip>

            </Box>
          }
        >
          {folder.notes.map(({ id, content }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={()=> setActiveNoteId(id)}
              >
                <Card sx={{ mb: "5px", backgroundColor: id === activeNoteId ? 'rgb(250, 218, 157)' : null}}>
                  <CardContent
                    sx={{ ":last-child": { pb: "10px", padding: "10px" } }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
