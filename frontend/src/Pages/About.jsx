// import React, { useEffect } from "react";

// const About = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div>
//       <section className="container-fluid bg-warning bread">
//         <div className=" py-5 ">
//           <div className=" pt-lg-5 pt-3 p-lg-4 pb-3">
//             <h2 className=" fs-1 mt-5 pt-lg-5 pt-sm-3">About Us</h2>
//             <p className="fs-5 ">
//               "Where Words Dance and Dreams Take Flight: Discover the Soul of
//               Poetry"
//             </p>
//           </div>
//         </div>
//       </section>

//       <>
//         <section id="contact" className="contact mb-5 mt-1">
//           <div className="container contact-bg mt-5">
//             <div className="email-form">
//               <div className="row">
//                 <div className="col-md-12 form-group">
//                   <div style={{ fontSize: 18, letterSpacing: "0.25px" }}>
//                     Poetic Atma is one of the fastest growing talent
//                     platform in India and across the Globe. We have successfully
//                     organised more than 100+ Poetry & Literature Programs in the
//                     Reputed Institutions like, JNU, delhi, Haldia Institute of
//                     Technology (West Bengal), Himachal Pradesh University
//                     (Shimla, HP), Panjab University Chandigarh, IIT Delhi, SRCC
//                     New Delhi, LPU Jalandhar, Doaba College Jalandhar, Pyramid
//                     College Phagwara, KMV Jalandhar & Many other prominent
//                     Colleges and Educational Institutions In north India. <br/> In
//                     recent past we have also started our Facebook and Instagram
//                     Live sessions and we are blessed that many reputed guest
//                     Poets, Writers, Dignitaries & Bollywood celebrities came
//                     live from our Various Social Media Platforms. “Poetic Atma“
//                     (PA) believes in building relations and forming a family, a
//                     family of 10,000+ writers and literature lovers. Until now,
//                     Team Poetic Atma has already organized more than 80+ events
//                     in over 15+ cities in India.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </>
//     </div>
//   );
// };

// export default About;

import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="container-fluid bg-warning bread">
        <div className="py-5">
          <div className="pt-lg-5 pt-3 p-lg-4 pb-3 text-center">
            <h2 className="fs-1 mt-5 pt-lg-5 pt-sm-3">About Us</h2>
            <p className="fs-5">
              "Where Words Dance and Dreams Take Flight: Discover the Soul of Poetry"
            </p>
          </div>
        </div>
      </section>

      {/* About profile Section */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src="/assets/images/AboutUsProfile.png"
              alt="Founder of Poetic Atma"
              className="img-fluid rounded-circle shadow"
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
            <h5 className="mt-3 mb-0">Sandeep Diipsun</h5>
            <small>Founder & Creative Head</small>
          </div>
          <div className="col-md-8">
            <p style={{ fontSize: 18, letterSpacing: "0.25px" }}>
              Poetic Atma is one of the fastest growing talent platform in India and across the Globe.
              We have successfully organised more than 100+ Poetry & Literature Programs in the Reputed Institutions like JNU Delhi, Haldia Institute of Technology (West Bengal), Himachal Pradesh University (Shimla, HP), Panjab University Chandigarh, IIT Delhi, SRCC New Delhi, LPU Jalandhar, Doaba College Jalandhar, Pyramid College Phagwara, KMV Jalandhar & many other prominent colleges and educational institutions in North India.
              <br /><br />
              In recent past we have also started our Facebook and Instagram Live sessions and we are blessed that many reputed guest poets, writers, dignitaries & Bollywood celebrities came live from our various social media platforms. “Poetic Atma“ (PA) believes in building relations and forming a family — a family of 10,000+ writers and literature lovers. Until now, Team Poetic Atma has already organized more than 80+ events in over 15+ cities in India.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
