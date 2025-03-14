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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="drop-shadow-xl w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
          <Link to="/admin" className="btn btn-sm btn-outline">
            Back
          </Link>
          <h1 className="text-center text-2xl sm:text-3xl font-semibold">
            Edit Product
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered  w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="priceInCents" className="label">
                  <span className="label-text">Price in cents</span>
                </label>
                <input
                  id="priceInCents"
                  type="number"
                  value={priceInCents}
                  onChange={(e) => setPriceInCents(e.target.value)}
                  className="input input-bordered  w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescriptions(e.target.value)}
                  className="input input-bordered  w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Course">Course</option>
                  <option value="Template">Template</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-end items-center">
                <button
                  onClick={handleEditProduct}
                  className="btn btn-success btn-block max-w-[200px]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
