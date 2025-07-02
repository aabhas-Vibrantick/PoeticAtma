import React, { useEffect } from 'react'

const HelpDesk = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const data = [
        { index: 1, description: "Contact Methods: Users can reach our help desk via email, phone, or through our online contact form available on the website." },
        { index: 2, description: "Support Hours: Our help desk operates during regular business hours and strives to respond to inquiries promptly. Extended support may be available for urgent issues or as arranged with our team." },
        { index: 3, description: "Technical Assistance: Our help desk provides technical support for website-related issues, including account access, navigation, and troubleshooting." },
        { index: 4, description: "Content Inquiries: Users can contact our help desk for inquiries related to our content, including poetry submissions, book recommendations, and community engagement." },
        { index: 5, description: "Feedback and Suggestions: We welcome feedback and suggestions from users to improve our services. Users are encouraged to reach out to our help desk with any ideas or concerns they may have." },
        { index: 6, description: "User Assistance: Our help desk is dedicated to assisting users with any questions or concerns they may have, ensuring a positive and seamless experience with Poetic Atma." },
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
                            Helpdesk
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

export default HelpDesk
