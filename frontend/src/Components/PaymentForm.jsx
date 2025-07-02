import { useEffect, useState } from "react"
import apiServices from "../ApiServices/ApiServices"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentForm() {
    const nav = useNavigate()
    const param = useParams()

    const id = param._id
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [total, setTotal] = useState()
    const [allbook, setallbook] = useState()

    useEffect(() => {
        settickettype()
    }, [])

    const handleOrder = (e) => {
        e.preventDefault()

        let data = {
            // Ticket_type:type,
            // bookId:sessionStorage.getItem("_id"),
            price_per_item: price,
            quantity: quantity,
            sub_total: total,
            bookId: allbook
        }

        apiServices.placeorder(data).then((x) => {
            //   // console.log(x.data.success)
            if (x.data.success) {
                toast.success(x.data.message)
                // nav("/")
            }
            else {
                toast.error(x.data.message)
            }
        }).catch(
            (error) => {
                // // console.log(error)
                toast.error("Something went wrong!! Try again later.")
            }
        )
    }
    const settickettype = (e) => {
        let data = {
            _id: id
        }

        apiServices.getsingleBook(data).then(x => {
            // console.log("single ticket Cost =>", x.data.data.title)

            setallbook(x.data.data.title)
            setPrice(x.data.data.Book_Price)
            setQuantity(1)
            setTotal(x.data.data.Book_Price)
        })
    }

    const setQuantityfun = (e) => {
        // // console.log(e.target.value)
        setQuantity(e.target.value)
        setTotal(parseInt(e.target.value) * parseInt(price))
    }

    return (
        <>
            <div className="container py-5">
                {/* <!-- End --> */}
                <div className="row">
                    <h1 className="text-center mt-2">Reserve Your Book  </h1>
                    <div className="col-lg-6 mx-auto article">
                        <form onSubmit={handleOrder}>
                            <div className="mb-3">
                                <label for="price_per_item" className="form-label">Book Name</label>
                                <input type="text" className="form-control" id="price_per_item" value={allbook} onChange={(e) => { setallbook(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label for="price_per_item" className="form-label">Price Per Item</label>
                                <input type="text" className="form-control" id="price_per_item" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label for="quantity" className="form-label">Quantity</label>
                                <input type="number" className="form-control" id="quantity" value={quantity} onChange={setQuantityfun} />
                            </div>
                            <div className="mb-3">
                                <label for="sub_total" className="form-label">Sub Total</label>
                                <input type="number" className="form-control" id="sub_total" value={total} onChange={(e) => { setTotal(e.target.value) }} />
                            </div>
                            <div className=""> <button type="submit" hre className="  mt-4 login-button"> <a href="https://pages.razorpay.com/vibrantickinfotech">Confirm Order </a></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
