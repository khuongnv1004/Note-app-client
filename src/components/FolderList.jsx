import {
  Card,
  CardContent,
  List,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { CreateNewFolderOutlined, Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";
import { deleteFolder, deleteNotebyFolder } from "../utils/folderUtils";

export default function FolderList({ folders }) {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = ()=>{
    setIsShow(true)
  }

  const handleHide = ()=>{
    setIsShow(false)
  }

  const handleDeleteFolder = async ()=>{
    await deleteNotebyFolder(folderId);
    await deleteFolder(folderId);
    // navigate('/')
    // window.location.reload();

  }
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{ textDecoration: "none" }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
               
                mb: "5px",
                backgroundColor:
                  id === activeFolderId ? "rgb(250, 218, 157)" : null,
              }}
              onMouseOver={handleShow}
              onMouseLeave={handleHide}
              
            >
              <CardContent
                sx={{ ":last-child": { pb: "10px", padding: "10px" }, display:'flex', justifyContent:'space-between', height:'60px', alignItems:'center'  }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: "bold", display:'inline' }}>
                  {name}
                </Typography>
                {activeFolderId === id ? <Tooltip sx={{display:'inline-block'}}  onClick={handleDeleteFolder}>
                <IconButton size="small" >
                  <Delete fontSize="5px"  sx={{ color: "black" }} />
                </IconButton>
              </Tooltip> : null  }
              
              </CardContent>
              
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
