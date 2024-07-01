import React from "react";
import { useLocation } from "react-router-dom";

const BookPage = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id");
  return <div>BookPage</div>;
};

export default BookPage;
