import React, { useEffect } from 'react'

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const data = [
        { index: 1, description: "Acceptance of Terms: By accessing and using our website, you agree to be bound by these terms and conditions and all applicable laws and regulations." },
        { index: 2, description: "User Responsibilities: Users are expected to use the website in a lawful and respectful manner, refraining from any activity that may harm the website or its users." },
        { index: 3, description: "Intellectual Property: All content on this website, including text, graphics, logos, and images, is the property of Poetic Atma or its content suppliers and is protected by copyright laws." },
        { index: 4, description: "Limitations of Liability: Poetic Atma shall not be held liable for any damages arising from the use or inability to use the website, including indirect or consequential damages." },
        { index: 5, description: "Third-Party Links: Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites." },
        { index: 6, description: "Modifications: We reserve the right to modify these terms and conditions at any time. Continued use of the website after changes constitutes acceptance of the new terms." },
        { index: 7, description: "Governing Law: These terms are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location." },
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
                            Terms and Conditions
                        </h2>
                        <p className="fs-5">
                            Please read these Terms and Conditions carefully before using our website. By accessing or using any part of the site, you agree to be bound by these terms. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
                        </p>
                    </div>
                </div>
            </section>

            <section id="terms" className="contact mb-5 mt-1">
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

export default TermsAndConditions
