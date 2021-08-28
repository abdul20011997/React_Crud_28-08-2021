import React, { Component } from 'react'
import {Form,Button,Container,Spinner} from "react-bootstrap";
import { withRouter } from 'react-router';
class Editblog extends Component {
    state={
        name:'',
        body:'',
        author:'',
        loading:false,
        error:null
    };
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
                name:data.title,
                body:data.body,
                author:data.author
            })
        }).catch(err=>{
            return this.setState({
                loading:false,
                error:err.message
            })
        })
    }
    getName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    getBody=(e)=>{
        this.setState({
            body:e.target.value
        })
    }
    getAuthor=(e)=>{
        this.setState({
            author:e.target.value
        })
    }
    updateBlog=(e)=>{
        e.preventDefault();
        const id=this.props.match.params.id;
        const data={
            title:this.state.name,
            body:this.state.body,
            author:this.state.author
        };
        console.log(data);
        this.setState({
            loading:true
        })
        fetch('http://localhost:9000/blogs/' + id,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>{
            if(res.status===404){
                throw new Error('Something Went Wrong');
            }
            return res.json()
        }).then(data=>{
            return this.props.history.push('/blogs');
        }).catch(err=>{
            return this.setState({
                error:err.message,
                loading:false
            })
        })
    }
    render() {
        let addblogdata='';
        if(this.state.loading){
            addblogdata=<div style={{textAlign:'center'}}><Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
          </div>;
        }
        else if(this.state.error){
            addblogdata=<div style={{textAlign:'center'}}><h1>{this.state.error}</h1></div>;
        }
        else{
            addblogdata=<Container>
            <h1 style={{textAlign:'center'}}>Edit Blog</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={this.state.name} onChange={this.getName}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter body" value={this.state.body} onChange={this.getBody}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author" value={this.state.author} onChange={this.getAuthor}/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.updateBlog}>
                    Update
                </Button>
            </Form>
            </Container>
        }
        return (
            <div>
                {addblogdata}
            </div>
        )
    }
}
export default withRouter(Editblog);
