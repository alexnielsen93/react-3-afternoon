import React, { Component } from 'react';

import './App.css';
import axios from 'axios'
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'
// import { ToastContainer, toast } from 'react-toastify';
// BASE URL:      practiceapi.devmountain.com/api

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then((res)=>{
      // console.log(res)
      let {data} = res
      this.setState({
        posts: data
      })
      
    })
    .catch((err)=>{
      console.log(err, "error")
    })
  }

  updatePost(id, text) {
  axios.put(`https://practiceapi.devmountain.com/api/posts/?id=${id}`, {text: text}).then((res)=>{
    console.log(res)
    let {data} = res
    this.setState({
      posts: data
    })
  })
  .catch((err)=>{
    console.log(err,"error")
  })


  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/?id=${id}`).then((res)=>{
      console.log(res)
      let {data} = res
      this.setState({
        posts: data
      })
    })
    .catch((err)=>{
      console.log(err, 'error')
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts/', {text:text}).then((res)=>{
      console.log(res)
      let {data } = res
      this.setState({
      posts: data
      })
    })
    .catch((err) =>{
      console.log(err, 'create post error')

    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose  createPostFn = {this.createPost}/>
          {posts.map((post)=>{
            return <Post key = {post.id} text = {post.text} date = {post.date} updatePostFn ={this.updatePost} id ={post.id} deletePostFn= {this.deletePost}/>
          })}

        </section>
      </div>
    );
  }
}

export default App;
