import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "../Components/Loader";
import { useEffect } from "react";
import { useState } from "react";

export default function HomeMaster() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div>
        {
          isLoading ?
            <Loader /> :
            <div>
              <Header />
              <Outlet />
              <Footer />
            </div>
        }
      </div>
    </>
  )
}
