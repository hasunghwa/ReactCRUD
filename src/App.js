import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import { useState, useEffect, Component } from 'react';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

function App() {
    const[mode, setMode] = useState('welcome');
    const[contentid, setContentid] = useState(2);

    const[subject, setSubject] = useState([{ title:"WEB", sub:"world wide web!" }]);
    const[welcome, setWelcome] = useState([{ title:"Welcome", desc:"Hello, React!!" }]);
    const[content, setContent] = useState([
      {id:1, title:'HTML', desc:'HTML is ...'},
      {id:2, title:'CSS', desc:'CSS is ...'},
      {id:3, title:'JavaScripte', desc:'JavaScripte is ...'}
    ]);

    const sub = <Subject 
      title={subject[0]['title']} 
      sub={subject[0]['sub']} 
      onChangePage={function(){
        setMode('welcome')
      }}
     />;
     
     function getContent() {
      let _title, _desc, _article = null;
      if(mode === 'welcome') {
        _title = welcome[0].title;
        _desc = welcome[0].desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>

      } else if(mode === 'read') {
        _title = content[contentid].title;
        _desc = content[contentid].desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>

      } else if(mode === 'create') {
        _article = <CreateContent onSubmit={function(_title, _desc){
          let _contests = content.concat({id:content.length+1, title:_title, desc:_desc});
          setContent(_contests);
          setMode('read');
          setContentid(content.length);
        }}></CreateContent>

      } else if(mode === 'update') {
        _article = <UpdateContent id={contentid} title={content[contentid].title} desc={content[contentid].desc}
          onSubmit={function(newContent){
            let _content = Array.from(content);
            _content[Number(newContent.content.id)] = {id: Number(newContent.content.id)+1, title: newContent.content.title, desc: newContent.content.desc};
            setContent(_content);
            setMode('read');
          }}
        ></UpdateContent>
      } else if(mode === 'delete') {
        
      }
      return _article;
     }
    
    return (
      <div className="App">
        {sub}
        <TOC 
          onChangePage = {function(id) {
            setMode('read');
            setContentid(id-1);
        }}
        data={content} >
        </TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')){
              let _content = Array.from(content);
              _content.splice(contentid, 1);
              setMode('welcome');
              setContent(_content);
            }
            alert('delete!');
          } else {setMode(_mode);}
        }}></Control>
        {getContent()}
      </div>
    );
}

export default App;