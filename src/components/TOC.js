import { memo } from 'react';
const TOC = (props) => {
  let contents = [];
  props.data.forEach(element => {
    contents.push(<li key={element.id}>
      <a
       href={element.id}
       onClick={function(e) {
         e.preventDefault();
         props.onChangePage(element.id);
       }}>{element.title}</a></li>);
  });
  return (
    <nav>
      <ul> 
         {contents}
      </ul>
    </nav>
  )
}
function areEqual(prevProps, nextProps) {
  /*
  만약 전달되는 nextProps가 prevProps와 같다면 true를 반환, 같지 않다면 false를 반환
  */ 
  if(prevProps === nextProps)
    return true;
  return false;
}
export default memo(TOC, areEqual);

//    {id:1, title:'HTML', desc:'HTML is ...'}, 
