import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import Styled from "./Blogdetail.module.css";
import {Spinner} from "react-bootstrap";
class Blogdetail extends Component {
    state={
        loading:false,
        blog:null,
        error:null
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        console.log(this.props);
        let id=this.props.match.params.id;
        fetch('http://localhost:9000/blogs/' + id).then(res=>{
            if(res.status===404){
                throw new Error('Something Went Wrong');
            }
            return res.json();
        }).then(data=>{
            return this.setState({
                loading:false,
                blog:data
            })
        }).catch(err=>{
            return this.setState({
                loading:false,
                error:err.message
            })
        })
    }
    render() {
      let blog='';

        if(this.state.loading){
        blog=<div style={{textAlign:'center'}}><Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" /></div>;
        }
        else if(this.state.error){
        blog=<div style={{textAlign:'center'}}><h1>{this.state.error}</h1></div>;
        }
        else if(this.state.blog){
        blog=<div>
            <div className={Styled.blogTitle}>Title : {this.state.blog.title}</div>
            <div className={Styled.blogBody}>Body : {this.state.blog.body}</div>
            <div className={Styled.blogAuthor}>Author : {this.state.blog.author}</div>
            </div>
        }
        return (
            <div style={{textAlign:'center',border: '14px double goldenrod'}}>
                <h1 className={Styled.pageheading}>Blog Details</h1>
                {blog}
            </div>
        )
    }
}

export default withRouter(Blogdetail);
