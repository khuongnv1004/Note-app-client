import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import React, { useEffect, useMemo, useState } from 'react'
import draftjsToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { convertFromHTML } from 'draft-js';
import { ContentState } from 'draft-js';
import { useLoaderData, useParams, useSubmit, useLocation } from 'react-router-dom';
import { debounce } from '@mui/material';

export default function Note() {
    const {note} = useLoaderData()
    const [editorState, setEditorState] = useState(()=>{
        EditorState.createEmpty()
    })

    const location = useLocation();

    const submit = useSubmit();

    const [rawHTML, setRawHTML] = useState(note.content);

    const handleOnChange = (e)=>{
        setEditorState(e);
        setRawHTML(draftjsToHtml(convertToRaw(e.getCurrentContent())))
    }

    useEffect(()=>{
        const blockFromHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blockFromHTML.contentBlocks,
            blockFromHTML.entityMap
        )
        setEditorState(EditorState.createWithContent(state))
    },[note.id])

    useEffect(()=>{
        debouncedMemorized(rawHTML, note, location.pathname)
    },[rawHTML, location.pathname])

    const debouncedMemorized = useMemo(()=>{
        return debounce((rawHTML, note, pathname)=>{
            if(rawHTML === note.content) return;
            
            submit({...note, content:rawHTML},{
                method:'post',
                action: pathname
            })

        }, 1000)
    },[])

    useEffect(()=>{
        setRawHTML(note.content)
    },[note.content])
  return (
    <Editor editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder = 'write'
    />

    
  )
}
