import React from "react";
import { Link } from "react-router-dom";
import { isAdminAccess } from "../../utils/tools";

function PostCard(props){
  const {post}=props;
  const hasAdminAccess=isAdminAccess();
  // console.log(post);
  return <>
    <div>{post.title}</div>
    <div>作者：{post?.author?.displayName} 创建时间：{post.published} 最近更新：{post.updated}</div>
    <div>{post?.labels?.map((label)=>{
      return <span key={label}>{label}</span>;
    })}</div>
    <Link to={`/post/${post.id}`}>阅读全文</Link>
    {hasAdminAccess&&<div><span>编辑</span><span>删除</span></div>}
  </>;
}

export default PostCard;
