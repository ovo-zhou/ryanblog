/**
 * 
 * @returns 
 */
export function isAdminAccess(){
  const hasAdminAccess=JSON.parse(localStorage.getItem('BlogUserInfos'))?.blog_user_info?.hasAdminAccess;
  return hasAdminAccess;
}
