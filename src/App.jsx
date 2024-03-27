import React, { useEffect } from 'react';
import { getBlogUserInfos, getBlogsByBlogId, getUserInfo } from './apis';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlogs } from './store/blogsSlice';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx';
import Menu from './components/menu/menu.jsx';
import getMenuConfig from './utils/getMenuConfig.js';
import './app.css';
import Page from './pages/page.jsx';
import Post from './pages/post.jsx';
import CreateOrUpdatePost from './pages/CreateOrUpdatePost.jsx';

function App() {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  useEffect(()=>{
    //获取整个博客信息
    getBlogsByBlogId().then(res=>{
      dispatch(updateBlogs(res));
    });
    //接收oauth登陆后返回的token
    if(location.hash&&location.hash.includes('access_token')){
      const hash=location.hash.substring(1,location.hash.length);
      const accessInfo={};
      hash.split('&').map(item=>{
        Object.assign(accessInfo,{[item.split('=')[0]]:item.split('=')[1]});
      });
      localStorage.setItem('accessInfo',JSON.stringify(accessInfo));
      location.hash='';
      // console.log(userInfo);
      Promise.all([getUserInfo(),getBlogUserInfos()]).then(([userInfo,BlogUserInfos])=>{
        // console.log(userInfo,BlogUserInfos);
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
        localStorage.setItem('BlogUserInfos',JSON.stringify(BlogUserInfos));
      });
      
    }
  },[]);
  return <>
    <Menu menu={getMenuConfig(blogs)}></Menu>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page/:id" element={<Page />} />
      <Route path="/post/:id" element={<Post />}/>
      <Route path="/createorupdatepost/:id?" element={<CreateOrUpdatePost />}/>
    </Routes>
  </>;

}
export default App;