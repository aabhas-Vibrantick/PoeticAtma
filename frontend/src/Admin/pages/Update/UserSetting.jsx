import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer,toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
export default function UserSetting() {
    const param = useParams()
    const nav = useNavigate()
    const id = param._id
 
  const [customerData,setcustomerData]= useState()
  const [name, setName] = useState()
  const [penname, setPenName] = useState();
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [password, setPassword] = useState()
    const [newpassword, setNewPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()
    const [contact, setContact] = useState()
    const [Image,setImage]=useState()
    const [bedgeVerify, setBedgeVerify] = useState(false);
    const [bio, setBio] = useState();
    const [facebook, setFacebook] = useState();
    const [linkdin, setLinkdin] = useState();
    const [twiter, setTwiter] = useState();
    const changeimage = (e) =>{
      // // console.log(e.target.files[0])
      setImage(e.target.files[0])
    }
  useEffect(()=>{
    
    let data = {
      userId: id,
    };
    // // console.log("ID???????????????????????",id)
    apiServices.getsinglecustomer(data).then(data=>{
      if(data.data.success){
        setcustomerData(data.data.data)
        setName(data.data.data.name)
        setPenName(data.data.data.penname);
        setEmail(data.data.data.email)
        setAddress(data.data.data.address)
        setContact(data.data.data.contact)
        setBedgeVerify(data.data.data.bedgeverify);
        setBio(data.data.data.bio);
        setFacebook(data.data.data.facebook);
        setLinkdin(data.data.data.linkdin);
        setTwiter(data.data.data.
          twiter);
      }else{
        toast.error(data.data.message)
      }
    }).catch(err=>{
      // // console.log(err)
      toast.error("Something went wrong")
    })
  },[])

  let data={
    _id: id
  }
  const handleupdateData=(e)=>{
    e.preventDefault()
    let data= new FormData()
    data.append("name",name)
    data.append("penname", penname);
    data.append("email",email)
    data.append("address",address)
    data.append("contact",contact)
    data.append("Image", Image)
    data.append("_id",id)
    data.append("bedgeverify", bedgeVerify); 
    data.append("bio", bio);
    data.append("facebook", facebook);
    data.append("linkdin", linkdin);
    data.append("twiter", twiter);
    apiServices.updateuser(data).then(data=>{
      if(data.data.success){
        toast.success(data.data.message)
        setTimeout(()=>{
            nav("/admin/all-users")
          },2000)
      }else{
        toast.error(data.data.message)
      }
    }).catch(err=>{
      // // console.log(err)
      toast.error("Something went wrong")
    })
  }

  const handlepassword=(e)=>{
    e.preventDefault()
    let data = {
      oldpassword  : password,
      newpassword  : newpassword,
      confirmpassword  : confirmpassword,
      userId : id
    }
    
    apiServices.changepassword(data).then(data=>{
      if(data.data.success){
        toast.success(data.data.message)
      }else{
        toast.error(data.data.message)
      }
    }).catch(err=>{
      // // console.log(err)
      toast.error("Something went wrong")
    })
  }
  return (
    <>
     <main className="main-container adminbody">
      <section className="section uprofile">
      <div className="row">
            <div className="col-xl-4">
              <div className="card mb-3">
                <div className="card-body uprofile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    // src="/assets/img/portfolio/uprofile-img.jpg"
                    src={BASE_URL_IMG + customerData?.Image}
                    alt="uprofile"
                    className="rounded-circle  img-fluid uprofile-side-img"
                  />
                  <h2>{customerData?.name}</h2>
                  <div className="social-links mt-2">
                    <a href="#" className="twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="linkedin">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {/* <!-- Bordered Tabs --> */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        type="submit"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#uprofile-overview"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        type="button"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#uprofile-edit"
                      >
                        Edit uprofile
                      </button>
                    </li>
                    {/* 
                  <li className="nav-item">
                    <button type="button"
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#uprofile-settings "
                    >
                      Settings
                    </button>
                  </li> */}

                    <li className="nav-item">
                      <button
                        type="button"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#uprofile-change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active uprofile-overview"
                      id="uprofile-overview"
                    >
                      <h5 className="card-title">uprofile Details</h5>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {customerData?.name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Pen Name
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {customerData?.penname}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">
                          {customerData?.address}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">
                          (+91) {customerData?.contact}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          {customerData?.email}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Facebook</div>
                        <div className="col-lg-9 col-md-8">
                          {customerData?.facebook}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Twiter</div>
                        <div className="col-lg-9 col-md-8">
                          {customerData?.twiter}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Linkdin</div>
                        <div className="col-lg-9 col-md-8">
                          {customerData?.linkdin}
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade uprofile-edit pt-3"
                      id="uprofile-edit"
                    >
                      {/* <!-- uprofile Edit Form --> */}
                      <form onSubmit={handleupdateData}>
                        <div className="row mb-3">
                          <label
                            for="uprofileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            uprofile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <img
                              src={BASE_URL_IMG + customerData?.Image}
                              alt="uprofile"
                              className="img-fluid"
                            />
                            <div className="pt-2">
                              <input
                                type="file"
                                className="form-control"
                                id="file"
                                onChange={(e) => {
                                  changeimage(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Full Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            for="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Pen Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                              value={penname}
                              onChange={(e) => setPenName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            for="bio"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Bio
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            for="Address"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Address
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Phone
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="Phone"
                              value={contact}
                              onChange={(e) => setContact(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="email"
                              className="form-control"
                              id="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            for="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Facebook
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="Email"
                              value={facebook}
                              onChange={(e) => setFacebook(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            for="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Linkdin
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="Email"
                              value={linkdin}
                              onChange={(e) => setLinkdin(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            for="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Twiter
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="Email"
                              value={twiter}
                              onChange={(e) => setTwiter(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                        <label
                          htmlFor="bedgeVerify"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Verified
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <select
                            id="bedgeVerify"
                            className="form-select"
                            value={bedgeVerify ? "1" : "0"}
                            onChange={(e) => setBedgeVerify(e.target.value === "1")}
                          >
                            <option value="0">Not Verified</option>
                            <option value="1">Verified</option>
                          </select>
                        </div>
                      </div>
                       
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                      {/* <!-- End uprofile Edit Form --> */}
                    </div>

                    <div
                      className="tab-pane fade pt-3"
                      id="uprofile-change-password"
                    >
                      {/* <!-- Change Password Form --> */}
                      <form onSubmit={handlepassword}>
                        <div className="row mb-3">
                          <label
                            for="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="password"
                              className="form-control"
                              id="currentPassword"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              value={newpassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="renewPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Re-enter New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="password"
                              className="form-control"
                              id="renewPassword"
                              value={confirmpassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </form>
                      {/* <!-- End Change Password Form --> */}
                    </div>
                  </div>
                  {/* <!-- End Bordered Tabs --> */}
                </div>
              </div>
            </div>
          </div>
      </section>
      </main>
      <ToastContainer />
    </>
  );
}
