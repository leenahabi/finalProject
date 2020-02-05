import React, { Component } from 'react';
import {index ,destroy ,show} from "./api"
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
class Student extends Component {
    state = { 
        user :this.props.user,
        students:[]
     }
 componentDidMount(){
        const userid = this.props.user
        index(userid)
        .then((response) => {
        const students = response.data.students
        this.setState({...this.state,
            students:students
        })
        }).catch(error => console.log(error))
    }
 
    delete = (id) => {
        const user = this.props.user
        destroy(user,id)
        .then(() => alert("deleted"))
        .then(() => {
            const students = this.state.students.filter((student) => student._id !== id)
            this.setState ({...this.state.user,students:students})
        })
        .catch((err) => console.log(err))
    }
 
    render() { 
        return ( 
            <div className="main-content">
    {this.state.students.map((student,index) => (
        <div key={index}>
            <h1>{student.name}</h1> <br/>
  <Link to={`/students/${student._id}/show`}><Button variant="outline-info" renderAs="button">
    <span>View Student's location</span>
  </Button></Link>
       <Button variant="outline-info" onClick={() => this.delete(student._id)}>Delete</Button>
       <hr/>
    </div>
    ))}
    <Link to={`students/add`}>
  <Button variant="outline-info" renderAs="button">
    <span>Add Student</span>
  </Button>
</Link>
  
        </div>
         );
    }
}
 
export default Student;