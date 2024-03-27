import React, { useState } from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { insertPost } from "../apis";
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function CreateOrUpdatePost(props){
  const {initPost={title:"",content:""}}=props;
  const [post,setPost]= useState(initPost);
  const handleEditorChange=({ html, text })=>{
    setPost({...post,content:text});
  };
  const postTitleChange=(e)=>{
    const title=e.target.value;
    setPost({...post,title});
  };
  const handleSave=()=>{
    console.log(post);
    const {id}=post;
    if(id){
      console.log('update');
    }else{
      insertPost(post);
    }

  };
  return <>
    标题<input type="text" name="title" value={post.title} onChange={postTitleChange}/>
    <MdEditor value={post.content} style={{ height: '800px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
    <button onClick={handleSave}>保存</button>
  </>;
}

export default CreateOrUpdatePost;
