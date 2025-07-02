import React, { useEffect } from 'react'

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const data = [
        { index: 1, description: "Data Usage: The information collected is used solely to provide and improve our services, including personalized content recommendations, communication with users, and website optimization." },
        { index: 2, description: "Data Security: We employ industry-standard security measures to protect the confidentiality and integrity of user data, including encryption, firewalls, and secure data storage protocols." },
        { index: 3, description: "Third-party Disclosure: We do not sell, trade, or otherwise transfer personal information to third parties without explicit consent, except as required by law or to facilitate essential functions of our website (e.g., payment processing)." },
        { index: 4, description: "Cookie Policy: Our website may use cookies and similar tracking technologies to enhance user experience, analyze website traffic, and personalize content. " },
        { index: 5, description: "Data Retention: We retain personal information for as long as necessary to fulfil the purposes outlined in this privacy policy or as required by law." },
        { index: 6, description: "Policy Updates: This privacy policy may be updated periodically to reflect changes in our practices or regulatory requirements. Users will be notified of any significant updates, and continued use of the website constitutes acceptance of the revised policy." },
    ]

    function displayData() {
        return (
            data.map((data) => {
                return (
                    <>
                        {data.index}. {data.description}
                        <br /><br />
                    </>
                )
            })
        )
    }

    return (
        <div>
            <section className="container-fluid bg-warning bread">
                <div className="py-5">
                    <div className="pt-lg-5 pt-3 p-lg-4 pb-3">
                        <h2 className="fs-1 mt-5 pt-lg-5 pt-sm-3">
                            Privacy Policies
                        </h2>
                        <p className="fs-5 ">
                            At Poetic Atma, we understand the importance of privacy and are committed to protecting the personal information of our users. We only collect information that is necessary for providing and improving our services, and we never share your data with third parties without your consent.
                        </p>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact mb-5 mt-1">
                <div className='container contact-bg mt-5'>
                    <div className="email-form">
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <div className="mx-4 mt-4 mb-4 d-flex justify-content-around align-items-center">
                                    <div className="container">
                                        <div className="col-12 mx-4 px-4" style={{ fontSize: 20, }}>
                                            {displayData()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PrivacyPolicy
