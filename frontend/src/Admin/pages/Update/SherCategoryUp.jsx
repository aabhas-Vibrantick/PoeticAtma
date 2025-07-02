import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiServices from '../../../ApiServices/ApiServices'
import { ToastContainer,toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function UpSherCategory() {
  const navigate=useNavigate()
  const [name,setName]= useState()
  const param= useParams()
  const id = param._id
  useEffect(()=>{
    let data={
      _id: id
    }

    // -----------sher category start------
    apiServices.getsingle_sher_category(data).then(data=>{
        if(data.data.success){
          setName(data.data.data.Category_name)
        }
        else{
          toast.error(data.data.message)
        }
      }).catch(err=>{
        // // console.log(err)
        toast.error("Something Went wrong")
      })
    // -----------sher category end--------


  },[])


  // -----sher---------handle----------start---
  const handleCategory=(e)=>{
    e.preventDefault();
    let data = {
      Category_name:name,
      _id:id
    }
    apiServices.update_sher_category(data).then(data=>{
      if(data.data.success){
        toast.success(data.data.message)
        setTimeout(()=>{
          navigate("/admin/view-shercategory")
      },3000)
      }else{
        toast.error(data.data.message)
      }
    }).catch(err=>{
      // // console.log(err)
      toast.error("Something went wrong")
    })
  }
  // -----sher---------handle----------end---

  return (
    <>
       <main className="main-container adminbody">

    <div className='container border col-6 shadow-lg my-5'>
      <Form.Group controlId="formCategory">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Category"
          name="category"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          required
        />
      </Form.Group>
      <Button className='my-3 btn-primary-1' variant="primary" onClick={handleCategory} type="submit">
        update Sher
      </Button>
    </div>

    </main>
    <ToastContainer/> 
    </>
  )
}
