import React, { Component } from 'react'
import { Button, Table,Spinner } from 'react-bootstrap'
import {Link} from "react-router-dom";
export default class Blogs extends Component {
  state={
    loading:false,
    error:null,
    blogs:[]
  }
  componentDidMount(){
    this.setState({
      loading:true
    })
    fetch('http://localhost:9000/blogs').then(res=>{
      if(res.status===404){
        throw new Error('Something Went Wrong');
      }
      return res.json();
    }).then(data=>{
      return this.setState({
        loading:false,
        blogs:data
      })
    }).catch(err=>{
      return this.setState({
        loading:false,
        error:err.message
      })
    })
  }
  deleteBlog=(id)=>{
    console.log(id)
    const newBlogs=this.state.blogs.filter((blog)=>{
       return  blog.id!==id
    })
    this.setState({
      loading:true
    })
    fetch('http://localhost:9000/blogs/' + id,{
      method:'DELETE'
    }).then(res=>{
      if(res.status===404){
        throw new Error('Something Went Wrong')
      }
      return res.json();
    }).then(data=>{
      console.log(data)
      return this.setState({
        loading:false,
        blogs:newBlogs
      })
    }).catch(err=>{
      this.setState({
        loading:false,
        error:err.message
      })
    })
  }
    render() {
      let blogs='';
      if(this.state.loading){
        blogs=<div style={{textAlign:'center'}}><Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" /></div>;
      }
      else if(this.state.error){
        blogs=<div style={{textAlign:'center'}}><h1>{this.state.error}</h1></div>;
      }
      else if(this.state.blogs.length > 0){
        blogs=<Table striped bordered hover>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Title</th>
            <th>Body</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              this.state.blogs.map((blog,i)=>{
                return(
                  <tr key={blog.id}>
                  <td>{i + 1}</td>
                  <td>{blog.title}</td>
                  <td>{blog.body}</td>
                  <td>{blog.author}</td>
                  <td>
                    <Link to={"blogdetail/"+blog.id}><Button>View</Button></Link>
                    <Link to={"editblog/"+blog.id} style={{marginLeft:'10px'}}><Button variant="secondary">Edit</Button></Link>
                    <Button variant="danger" style={{marginLeft:'10px'}} onClick={()=>this.deleteBlog(blog.id)}>Delete</Button>
                  </td>
                  </tr>
                )
              })
            }

        </tbody>
      </Table>
      }
        return (
            <div>
                <h1  style={{textAlign:'center'}}>List of Blogs</h1>
                {blogs}
            </div>
        )
    }
}
