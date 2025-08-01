import React, { useEffect } from 'react';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="container-fluid bg-warning bread-terms-cond">
        <div className="py-5">
          <div className="pt-lg-5 pt-3 p-lg-4 pb-3">
            <h2 className="fs-1 mt-5 pt-lg-5 pt-sm-3 text-white">
              Terms and Conditions
            </h2>
            {/* <p className="fs-5">
              Please read these Terms and Conditions carefully before using our
              website. By accessing or using any part of the site, you agree to
              be bound by these terms. If you do not agree to all the terms and
              conditions, then you may not access the website or use any
              services.
            </p> */}
          </div>
        </div>
      </section>

      <section id="terms" className="contact mb-5 mt-1">
        <div className="container contact-bg mt-5">
          <div className="email-form">
            <div className="row">
              <div className="col-md-12 form-group">
                <div className="mx-4 mt-4 mb-4 d-flex justify-content-around align-items-center">
                  <div className="container">
                    <div className="col-12 mx-4 px-4" style={{ fontSize: 18 }}>
                      <h4>Welcome to Poetic Atma!</h4>
                      <p>
                        These terms and conditions outline the rules and regulations
                        for the use of Poetic Atma's Website.
                      </p>
                      <p>
                        By accessing this website, we assume you accept these terms
                        and conditions. Do not continue to use Poetic Atma if you do
                        not agree with all the terms and conditions stated on this
                        page.
                      </p>

                      <h5 className="mt-4">Terminology</h5>
                      <p>
                        "User", "You", "Your" refers to you, the person accessing this
                        website and complying with these Terms. <br />
                        "Poetic Atma", "We", "Our", "Us" refers to our platform. <br />
                        "Content" refers to any text, image, audio, or other creative
                        work (including shayari, poetry, quotes, and literary
                        expressions) submitted, posted, or shared on the platform.
                      </p>
                      <p>
                        These terms apply to all services and features of Poetic Atma,
                        including user submissions, community features, and
                        interactions.
                      </p>

                      <h5 className="mt-4">Cookies</h5>
                      <p>
                        We use cookies to enhance your experience. By accessing Poetic
                        Atma, you consent to the use of cookies in accordance with our
                        Privacy Policy.
                      </p>
                      <p>
                        Cookies are used to store user preferences and to improve
                        website functionality and performance. Some
                        affiliate/advertising partners may also use cookies.
                      </p>

                      <h5 className="mt-4">License and Content Usage</h5>
                      <p>
                        Unless otherwise stated, Poetic Atma and/or its licensors own
                        the intellectual property rights for all content on this
                        website. You may access and share poetry and shayari for
                        personal, non-commercial use, subject to the restrictions
                        below.
                      </p>
                      <p>You must not:</p>
                      <ul>
                        <li>Republish content from Poetic Atma without permission</li>
                        <li>Sell, rent, or sub-license content</li>
                        <li>Reproduce or copy content for commercial purposes</li>
                        <li>
                          Redistribute user-contributed content without appropriate
                          credit
                        </li>
                      </ul>
                      <p>
                        <strong>Note:</strong> All original poetry submitted by users
                        remains their intellectual property. By submitting content,
                        users grant Poetic Atma a non-exclusive right to display and
                        share it on the platform.
                      </p>

                      <h5 className="mt-4">User Submissions</h5>
                      <p>Users confirm that:</p>
                      <ul>
                        <li>The content is their original work.</li>
                        <li>They have the right to share it publicly.</li>
                        <li>
                          The content does not infringe upon any third-party rights or
                          violate any applicable laws.
                        </li>
                      </ul>
                      <p>
                        We reserve the right to remove or moderate any content that
                        violates our policies or is reported as offensive,
                        inappropriate, or plagiarized.
                      </p>

                      <h5 className="mt-4">Linking to Our Website</h5>
                      <p>
                        The following organizations may link to our homepage without
                        prior written approval:
                      </p>
                      <ul>
                        <li>Government agencies</li>
                        <li>Search engines</li>
                        <li>News organizations</li>
                        <li>Online directory distributors</li>
                        <li>
                          Non-profit poetry, literature, and cultural organizations
                        </li>
                      </ul>
                      <p>Other websites may request approval to link to us.</p>
                      <p>To request linking permission, email us at [Your contact email]</p>

                      <h5 className="mt-4">Use of iFrames</h5>
                      <p>
                        Without explicit permission, you may not create frames around
                        Poetic Atma web pages that alter the visual presentation or
                        appearance of our site.
                      </p>

                      <h5 className="mt-4">Content Liability</h5>
                      <p>
                        We are not responsible for any user-generated content appearing
                        on external websites linked to or from our platform. You agree
                        to indemnify us against any claims arising from your content or
                        your website’s use of our content.
                      </p>

                      <h5 className="mt-4">Reservation of Rights</h5>
                      <p>
                        We reserve the right to request the removal of any link to
                        Poetic Atma. You agree to promptly remove such links upon
                        request. We also reserve the right to amend these terms at any
                        time.
                      </p>

                      <h5 className="mt-4">Removing Content or Links</h5>
                      <p>
                        If you find content or links on Poetic Atma that you believe
                        are inappropriate, offensive, or infringing, please contact us.
                        We will review such requests but are not obligated to remove
                        content unless legally required.
                      </p>

                      <h5 className="mt-4">Accuracy and Availability</h5>
                      <p>
                        We do not guarantee that the content on Poetic Atma is always
                        accurate, complete, or up to date. While we strive to ensure
                        the platform is accessible at all times, we are not liable for
                        any downtime or data loss.
                      </p>

                      <h5 className="mt-4">Disclaimer</h5>
                      <p>
                        To the maximum extent permitted by law:
                        <ul>
                          <li>
                            We exclude all representations and warranties related to
                            the use of our platform.
                          </li>
                          <li>
                            We are not liable for any indirect, incidental, or
                            consequential loss resulting from the use of Poetic Atma.
                          </li>
                          <li>
                            This disclaimer does not limit liability for death, personal
                            injury, fraud, or other liabilities not permitted to be
                            excluded under applicable law.
                          </li>
                        </ul>
                      </p>
                      <p>
                        As long as the services and content on this platform are
                        provided free of charge, we are not liable for any damages or
                        losses of any nature.
                      </p>

                      <h5 className="mt-4 text-center">
                        Thank you for using Poetic Atma — a community built for sharing
                        soulful words and heartfelt expression.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
