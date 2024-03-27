import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Post(){
  const {id}= useParams();
  const blogs = useSelector(state => state.blogs);
  const {posts={}}=blogs;
  const {items=[]}=posts;
  const [data]=items.filter(item=>item.id==id);
  console.log('data',data);
  return <>
    <div>{data.title}</div>
    <div>作者：{data?.author?.displayName} 创建时间：{data.published} 最近更新：{data.updated}</div>
    <div dangerouslySetInnerHTML={{__html:data.content}}></div>
  </>;
}

export default Post;