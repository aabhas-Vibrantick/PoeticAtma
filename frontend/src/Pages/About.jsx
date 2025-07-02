import React, { useEffect } from 'react'

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <section className="container-fluid bg-warning bread">
                <div className=" py-5 ">
                    <div className=" pt-lg-5 pt-3 p-lg-4 pb-3">
                        <h2 className=" fs-1 mt-5 pt-lg-5 pt-sm-3">About Us</h2>
                        <p className="fs-5 ">
                            "Where Words Dance and Dreams Take Flight: Discover the Soul of Poetry"
                        </p>
                    </div>
                </div>
            </section>

            <>
                <section id="contact" className="contact mb-5 mt-1">
                    <div className='container contact-bg mt-5'>
                        <div className="email-form">
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <div style={{ fontSize: 18, letterSpacing: "0.25px" }}>
                                        Welcome to Poetic Atma, your digital sanctuary for the soul-stirring world of poetry. At Poetic Atma, we believe that poetry is not just words on a page but a reflection of the human experience, expressed through the rhythm of language and the depth of emotions. We are dedicated to curating and celebrating the works of Indian poets, both in Hindi and English, showcasing their sher, shayari, prose, and blogs. Our platform serves as a bridge between poets and poetry lovers, fostering a community where creativity thrives and hearts connect.

                                        <br /><br />

                                        In addition to our curated collection of poetry, we offer a vibrant blog section where users can explore insightful articles, reflections, and discussions on various aspects of poetry and literary culture. Our blog provides a platform for poets, critics, and enthusiasts to share their perspectives, engage in dialogue, and delve deeper into the world of Indian poetry.
                                        Furthermore, we encourage our community to actively participate in the conversation by sharing their thoughts, comments, and feedback on our blog posts. Users can interact with each other, exchange ideas, and contribute to the ongoing dialogue surrounding poetry and its impact on our lives.

                                        <br /><br />

                                        Join us on this journey of poetic exploration, where every word resonates with the essence of the soul.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </div>
    )
}

export default About
