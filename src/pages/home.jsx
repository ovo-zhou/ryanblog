import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../components/postCard/postCard.jsx";

function Home(){
  const blogs = useSelector(state => state.blogs);
  const {posts={}}=blogs;
  // console.log(posts)
  const {items=[]}=posts;
  // console.log(blogs);
  return <>
    {
      items.map(item=>{
        return <PostCard post={item} key={item.id} />;
      })
    }
  </>;
}

export default Home;