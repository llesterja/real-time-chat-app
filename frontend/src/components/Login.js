import React, {useState,useRef} from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'
import axios from 'axios';

export default function Login({onIdSubmit}) {
  const [username,setUsername]= useState();
  const [newUsername,setNewUsername]= useState();
  const [mobile,setMobile]= useState();
  const idRef = useRef()
  const getUserId = async (username) => {
    try{
      idRef.current = await axios.get(`http://localhost:8080/users/login/${username}`)
      console.log(idRef.current.data)
      onIdSubmit(idRef.current.data);
    }catch(err){
      console.log(err);
    }
  }
  const createUser = async (username,mobile)=>{
    try{
      const newUser = await axios.post(`http://localhost:8080/users/login/`,{
        username:username,
        mobile:mobile
      })
      console.log(newUser);
      idRef.current = newUser.data.id;
      console.log(idRef.current)
      onIdSubmit(idRef.current);
    }catch(err){
      console.log(err);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    getUserId(username);
  }

  function createNewId(e) {
    e.preventDefault();
    createUser(newUsername,mobile);
  }

  return (
    <Container className="align-items-center d-flexbox" style={{height:'100vh'}}>
        Hello, Please Login!
        <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group>
                <Form.Label> Enter Your Username </Form.Label>
                <Form.Control 
                  type="text" 
                  value={username} 
                  required
                  onChange={(e)=>setUsername(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" className="mr-2">Login</Button>
          </Form>
          <br/>
          Register here if you have no login!
          <Form onSubmit={createNewId} className="w-100">
            <Form.Group>
                <Form.Label> Enter Your New Username </Form.Label>
                <Form.Control 
                  type="text" 
                  value={newUsername} 
                  required
                  onChange={(e)=>{
                    setNewUsername(e.target.value)
                  }}
                />
                <Form.Label> Enter Your mobile number </Form.Label>
                <Form.Control 
                  type="number" 
                  value={mobile} 
                  required
                  onChange={(e)=>{
                    setMobile(e.target.value)
                  }}
                />
            </Form.Group>
            <Button type='submit' variant="secondary">Create A New Id</Button>
        </Form>
    </Container>
  )
}
