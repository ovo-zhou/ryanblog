import config from '../package.json';
import request from './utils/request';
const { apiKey, blogId } = config;
/**
 * 
 * @param {博客ID} id 
 * @returns 整个博客详情
 */
export function getBlogsByBlogId(id = blogId) {
  const asyncGetBlogs = request.get(`/blogs/${id}?key=${apiKey}`); //博客
  const asyncGetPosts = request.get(`/blogs/${id}/posts?key=${apiKey}`); //文章
  const asyncGetPages = request.get(`/blogs/${id}/pages?key=${apiKey}`); //页面
  return Promise.all([asyncGetBlogs, asyncGetPosts, asyncGetPages])
    .then(([blogsResult, postsResult, pagesResult]) => {
      Object.assign(blogsResult.posts, postsResult);
      Object.assign(blogsResult.pages, pagesResult);
      return asyncGetBlogs;
    });
}
/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '292929510906-n3ice80c3smjkmrju660rio3scif3uu9.apps.googleusercontent.com',
    'redirect_uri': 'https://www.ryandev.cn',
    'response_type': 'token',
    'scope': 'https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/blogger.readonly',};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
/**
 * 获取用户信息
 */
export function getUserInfo(){
  const accessInfo=JSON.parse(localStorage.getItem('accessInfo'));
  return request.get(`/users/self?key=${apiKey}`,{
    headers:{
      Authorization:`${accessInfo.token_type} ${accessInfo.access_token}`
    }
  });
}
/**
 * 获取用户与博客的关联信息
 * @param {博客ID} id 
 */
export function getBlogUserInfos(id = blogId){
  const accessInfo=JSON.parse(localStorage.getItem('accessInfo'));
  return request.get(`/users/self/blogs/${id}?key=${apiKey}`,{
    headers:{
      Authorization:`${accessInfo.token_type} ${accessInfo.access_token}`
    }
  });
}
/**
 * 
 * @param {博文} post 
 * @returns 创建之后的博文
 */
export function insertPost(post){
  const accessInfo=JSON.parse(localStorage.getItem('accessInfo'));

  return request.post(`/blogs/${blogId}/posts?key=${apiKey}`,post,{
    headers:{
      Authorization:`${accessInfo.token_type} ${accessInfo.access_token}`,
      'Content-Type': "application/json"
    },
  });
}

export function insertPage(page){
  const accessInfo=JSON.parse(localStorage.getItem('accessInfo'));
  return request.post(`/blogs/${blogId}/pages?key=${apiKey}`,page,{
    headers:{
      Authorization:`${accessInfo.token_type} ${accessInfo.access_token}`,
      'Content-Type': "application/json"
    },
  });
}