import { useState } from 'react/cjs/react.development';

const UpdateContent = (props) => {
  const [content, setContent] = useState({
    id: props.id,
    title: props.title,
    desc: props.desc
  });

  function inputFormHandler(e) {
    let newContent = Object.assign({}, content);
    newContent[e.target.name]= e.target.value;
    setContent(newContent);
  }

  return (
    <article>
      <h2>Update</h2>
      <form action="/create_process" method="post"
        onSubmit={function(e){
          e.preventDefault();
          props.onSubmit({content});
          alert('submit');
        }} 
      >
        <input type="hidden" namd="id" value={content.id}></input>
        <p>
          <input 
            type="text" 
            name="title"
            placeholder="title"
            value={content.title}
            onChange={inputFormHandler}
          ></input>
        </p>
        <p>
          <textarea 
            onChange={inputFormHandler}
            name="desc" 
            placeholder="description" 
            value={content.desc}
          ></textarea>
        </p>
        <p><input type="submit"></input></p>
      </form>
    </article>
  );
}

export default UpdateContent;