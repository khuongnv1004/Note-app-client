import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react'
import draftjsToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { convertFromHTML } from 'draft-js';
import { ContentState } from 'draft-js';

export default function Note() {

    const note = {
        id:'111',
        content:'<p>This is content</p>'
    };
    const [editorState, setEditorState] = useState(()=>{
        EditorState.createEmpty()
    })

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
    },[note.content])

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
