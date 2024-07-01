import React from "react";
import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";

const BookPage = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id");
  return <div>
    <ViewDetail/>
  </div>;
};

export default BookPage;
