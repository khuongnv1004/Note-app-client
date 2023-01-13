import { Card, CardContent, Grid, List, Box , Typography} from "@mui/material";
import React , {useState} from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

export default function NoteList() {
  const {folder} = useLoaderData();
  // const folder = { note: [{ id: "1", content: "<p>New Note</p>" }] };
  const {noteId} = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId)
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
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                Notes
              </Typography>
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
