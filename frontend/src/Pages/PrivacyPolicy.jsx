import React, { useEffect } from 'react'

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const data = [
        { index: 1, description: "<strong>Data Usage:</strong> The information collected is used solely to provide and improve our services, including personalized content recommendations, communication with users, and website optimization." },
        { index: 2, description: "<strong>Data Security:</strong> We employ industry-standard security measures to protect the confidentiality and integrity of user data, including encryption, firewalls, and secure data storage protocols." },
        { index: 3, description: "<strong>Third-party Disclosure:</strong> We do not sell, trade, or otherwise transfer personal information to third parties without explicit consent, except as required by law or to facilitate essential functions of our website (e.g., payment processing)." },
        { index: 4, description: "<strong>Cookie Policy:</strong> Our website may use cookies and similar tracking technologies to enhance user experience, analyze website traffic, and personalize content." },
        { index: 5, description: "<strong>Data Retention:</strong> We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by Indian law." },
        { index: 6, description: "<strong>Policy Updates:</strong> This privacy policy may be updated periodically to reflect changes in our practices or regulatory requirements. Users will be notified of any significant updates, and continued use of the website constitutes acceptance of the revised policy." },
    ]

    function displayData() {
        return data.map((item) => (
            <p key={item.index} dangerouslySetInnerHTML={{ __html: `${item.index}. ${item.description}` }} />
        ))
    }

    return (
        <div>
            <section className="container-fluid bg-warning bread-privacy">
                <div className="py-5">
                    <div className="pt-lg-5 pt-3 p-lg-4 pb-3">
                        <h2 className="fs-1 mt-5 pt-lg-5 pt-sm-3 text-white">
                            Privacy Policy
                        </h2>
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
                                        <div className="col-12 mx-4 px-4" style={{ fontSize: 20 }}>
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
