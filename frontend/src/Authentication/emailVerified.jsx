import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ApiServices from '../ApiServices/ApiServices';

function EmailVerified() {
  const { token } = useParams();


  const [isHover, setIsHover] = useState(false);
  const [isVerified, setIsVerified] = useState(false)
  const [alreadyVerified, setAlreadyVerified] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const verifyToken = () => {
    try {
      ApiServices.verifyEmail({ token }).then((response) => {
        if (response.data.isVerified) {
          setAlreadyVerified(true)
          toast.info(response.data.message);
        }
        else if (response.data.status) {
          setIsVerified(true)
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }).catch((error) => {
        toast.error("Something went Wrong, Try again Later!");
      });
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  }
  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div style={{ marginTop: 72, marginBottom: 72, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {alreadyVerified ? <>
          <>
            <div className='enailverify-body'>
              <div className="enailverifycontainer">
                <p>Your Account is already Verified.</p>
                <div>
                  <button style={{ backgroundColor: !isHover ? "#7A7F34" : "#AFA957", color: !isHover ? "#fff" : "#000", width: "296px", height: "54px" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Link to="/" style={{ fontSize: 24, }}>
                      Return to Homepage
                    </Link>
                  </button>
                </div>
              </div>
            </div> 
          </>
        </> : <>
          {isVerified ?
            <>
              <div className='enailverify-body'>
                <div className="enailverifycontainer">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="success-icon" style={{ fontSize: 24, marginRight: 8, }}>
                      &#10004;
                    </div>
                    <div>
                      <h2>Email Verification Successful</h2>
                    </div>
                  </div>
                  <p>Your Email has been Successfully Verified.</p>
                  <div className='my-4' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div>
                      <p>Thank you for using our Application.</p>
                    </div>
                    <div className="success-emoji">
                      😀
                    </div>
                  </div>
                  <div>
                    <button style={{ backgroundColor: !isHover ? "#7A7F34" : "#AFA957", color: !isHover ? "#fff" : "#000", width: "296px", height: "54px" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      <Link to="/" style={{ fontSize: 24, }}>
                        Return to Homepage
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </>
            : <>
              <div className='enailverify-body'>
                <div className="enailverifycontainer">
                  <h2>Email Verification Pending</h2>
                </div>
              </div>
            </>
          }
        </>}
      </div >
    </>
  )
}

export default EmailVerified
