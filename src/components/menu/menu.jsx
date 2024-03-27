import React from "react";
import './index.css';
import { Link } from "react-router-dom";
import { oauthSignIn } from "../../apis";
import { isAdminAccess } from "../../utils/tools";

function Menu({menu=[]}){
  const userInfo=JSON.parse(localStorage.getItem('userInfo'));
  const accessInfo=JSON.parse(localStorage.getItem('accessInfo'));
  const BlogUserInfos=JSON.parse(localStorage.getItem('BlogUserInfos'));
  const hasAdminAccess=isAdminAccess();
  return <nav>
    <div  className="nav-container">
      <div>
        {
          menu.map((item)=>{
            return <Link to={item.path+(item.id?`/${item.id}`:'')} key={item.name+item.path}>{item.name}</Link>; 
          })
        }
      </div>
      {
        accessInfo?.access_token?
          <div className="nav-login">
            <div className="nav-login-item">{userInfo?.displayName}</div>
            <div className="nav-login-block">
              <div className="nav-login-item">身份:{hasAdminAccess?'管理员':'普通用户'}</div>
              {
                hasAdminAccess&&<>
                  <div className="nav-login-item"><Link to="/createorupdatepost/null">新建post</Link></div>
                  <div className="nav-login-item"> <Link>新建page</Link></div>
                </>
              }
              <div className="nav-login-item">退出登陆</div>
            </div>
          </div>
          :<div onClick={oauthSignIn}>登陆</div>
      }
    </div>
  </nav>;
}

export default Menu;
