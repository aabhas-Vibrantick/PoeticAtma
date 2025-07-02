import React, { useEffect } from 'react'

const FAQs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <section className="container-fluid bg-warning bread">
                <div className="py-5">
                    <div className="pt-lg-5 pt-3 p-lg-4 pb-3">
                        <h2 className="fs-1 mt-5 pt-lg-5 pt-sm-3" style={{ color: "#fff" }}>
                            Frequently Asked Questions
                        </h2>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact mb-5 mt-1">
                <div className='container contact-bg mt-5'>
                    <div className="email-form">
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                What kind of poetry does Poetic Atma feature?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Poetic Atma features a diverse range of poetry, including sher, shayari, prose, and blogs, all authored by Indian poets. We strive to showcase the richness and variety of Indian literary tradition, both in Hindi and English.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                Can I submit my poetry to Poetic Atma?
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Absolutely! We welcome submissions from aspiring poets who wish to share their work with our community. Simply Sign In page to learn more about the guidelines and how to submit your poetry.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                Does Poetic Atma sell poetry books?
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Yes, we do! Our bookstore offers a curated selection of poetry books by Indian poets, allowing you to explore and delve deeper into the world of Indian poetry. From classic collections to contemporary gems, we have something for every poetry lover.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                                How can I connect with other poetry enthusiasts on Poetic Atma?
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                You can join our vibrant community of poetry lovers by participating in discussions on our forums, engaging with poets and readers through comments and likes, and following us on social media for updates and inspiration.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFive">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                                Is there a subscription fee for accessing Poetic Atma's content?
                                            </button>
                                        </h2>
                                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                No, Poetic Atma is completely free to access. We believe that poetry should be accessible to all, and our platform is open to anyone who wishes to immerse themselves in the beauty of words.
                                            </div>
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

export default FAQs