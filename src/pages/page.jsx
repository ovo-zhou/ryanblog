import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
/**
 * 博客page页面
 */
function Page(){
  const params = useParams();
  const {id}=params;
  const {pages} =useSelector(state=>state.blogs);
  const {items}=pages;
  return <>
    {
      items.filter(item=>item.id==id).map(page=>{
        return <React.Fragment key={page.id}>
          <h1>标题</h1>
          <div>{page.title}</div>
          <h1>内容</h1>
          <div>{page.content}</div>
        </React.Fragment>;
      })
    }
  </>;
}

export default Page;