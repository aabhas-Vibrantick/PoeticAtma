
import React, {  useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Addbook() {
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null); // Changed "Image" to "image"
  const [bookcategory, setBookCategory] = useState("");
  const [Book_Price, setBook_Price] = useState("");
  const [Book_Quantity, setBook_Quantity] = useState("");
  const [Payment_option, setPayment_option] = useState("");


 

  const handlebookData = async (e) => {
    e.preventDefault();

    if (!title || !author || !description || !bookcategory || !Image || !Book_Price || !Book_Quantity || !Payment_option) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("bookcategory", bookcategory);
    formData.append("Book_Price", Book_Price);
    formData.append("Book_Quantity", Book_Quantity);
    formData.append("Payment_option", Payment_option);
    formData.append("author", author);
    formData.append("Image",Image);

    try {
      const response = await apiServices.addBook(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        // // console.log(response)
        setTimeout(() => {
          nav("/admin/book-list");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <main className="main-container adminbody">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col">
              <h2>Add Book</h2>
              <form className="mt-5" onSubmit={handlebookData}>
                {/* Title input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                {/* Category input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Category of book"
                    value={bookcategory}
                    onChange={(e) => setBookCategory(e.target.value)}
                  />
                </div>

                {/* prose input */}
                <div className="form-outline mb-4">
                  <textarea
                    className="form-control"
                    id="form6Example7"
                    rows="4"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Prize"
                    value={Book_Price}
                    onChange={(e) => setBook_Price(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Book Quantity"
                    value={Book_Quantity}
                    onChange={(e) => setBook_Quantity(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Payment option"
                    value={Payment_option}
                    onChange={(e) => setPayment_option(e.target.value)}
                  />
                </div>

                {/* prose image */}
                <div className="mb-4">
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="Image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary-1 btn-block mb-4"
                >
                  Add Book
                </button>
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default Addbook;
