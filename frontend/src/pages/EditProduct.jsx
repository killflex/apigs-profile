import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [priceInCents, setPriceInCents] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((response) => {
        setName(response.data.name);
        setPriceInCents(response.data.priceInCents);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happen. check console");
      });
  }, [id]);

  const handleEditProduct = () => {
    const data = { name, priceInCents, description, category };
    setLoading(true);
    axios
      .put(`http://localhost:3000/product/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Product updated successfully", { variant: "success" });
        navigate("/admin");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happen. check console");
      });
  };

  return <div>EditProduct</div>;
};

export default EditProduct;
