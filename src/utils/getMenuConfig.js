export default function getMenuConfig(blogs){
  const menu=[];
  menu.push({
    name:blogs.name,
    path:'/'
  });
  blogs?.pages?.items.map(item=>{
    menu.push(
      {
        name:item.title,
        path:'/page',
        id:item.id
      }
    );
  });
  // console.log(menu);
  return menu;
}