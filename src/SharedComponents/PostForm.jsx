import React, { useState } from "react";

const PostForm = ({ initialValue, onSubmit, item, setToggle }) => {
  const [formError, setFormError] = useState({});
  const [post, setPost] = useState({
    name: initialValue.name || "",
    username: initialValue.username || "",
    email: initialValue.email || "",
    phone: initialValue.phone || "",
    website: initialValue.website || "",
    address: {
      zipcode: initialValue.address?.zipcode || "",
      street: initialValue.address?.street || "",
      city: initialValue.address?.city || "",
    },
    company: {
      name: initialValue.company?.name || "",
    },
  });
  const handleInput = (e) => {
    setPost({
      ...post,
      username: e.target.value,
    });
  };
  const handleName = (e) => {
    setPost({
      ...post,
      name: e.target.value,
    });
  };

  const handlePhone = (e) => {
    setPost({
      ...post,
      phone: e.target.value,
    });
  };
  const handleWeb = (e) => {
    setPost({
      ...post,
      website: e.target.value,
    });
  };
  const handleZip = (e) => {
    setPost({
      ...post,
      address: {
        ...post.address,
        zipcode: e.target.value,
      },
    });
  };
  const handleEmail = (e) => {
    setPost({
      ...post,
      email: e.target.value,
    });
  };
  const handleCame = (e) => {
    setPost({
      ...post,
      company: {
        name: e.target.value,
      },
    });
  };
  const handleCity = (e) => {
    setPost({
      ...post,
      address: { ...post.address, city: e.target.value },
    });
  };
  const handleAddress = (e) => {
    setPost({
      ...post,
      address: { ...post.address, street: e.target.value },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    onSubmit(post);
    setToggle(false);
  };

  const validate = () => {
    let isValid = true;
    let error = {};
    if (!post.username) {
      isValid = false;
      error.username = "Username required";
    }
    if (!post.email) {
      isValid = false;
      error.email = "Email required";
    }
    if (!post.name) {
      isValid = false;
      error.name = "Name required";
    }
    if (!post.phone) {
      isValid = false;
      error.phone = "Phone number required";
    }
    if (!post.website) {
      isValid = false;
      error.website = "Website required";
    }
    if (!post.address.zipcode) {
      isValid = false;
      error.zip = "Zipcode required";
    }
    if (!post.address.street) {
      isValid = false;
      error.street = "Address required";
    }
    if (!post.address.city) {
      isValid = false;
      error.city = "City required";
    }
    if (!post.company.name) {
      isValid = false;
      error.cname = "Companyname required";
    }
    setFormError(error);
    return isValid;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-10 gap-y-3 flex-wrap my-5 font-normal text-sm w-full">
          {!(item === "company") && (
            <>
              <div>
                <label>Username</label>
                <div>
                  <input
                    type="text"
                    onChange={handleInput}
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    name="username"
                    defaultValue={initialValue.username}
                    placeholder="Enter Username"
                    required
                  />
                </div>
                {formError.username && post.username?.length < 1 ? (
                  <span className="text-red-600">{formError.username}</span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label>Email</label>
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleEmail}
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter Email"
                    defaultValue={initialValue.email}
                    required
                  />
                </div>
                {formError.email && post.email?.length < 1 ? (
                  <span className="text-red-600">{formError.email}</span>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
          {(item === "add" || item === "edit") && (
            <>
              <div>
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    onChange={handleName}
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter Name"
                    name="name"
                    defaultValue={initialValue.name}
                    required
                  />
                </div>
                {formError.name && post.name?.length < 1 ? (
                  <span className="text-red-600">{formError.name}</span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label>Phone</label>
                <div>
                  <input
                    type="text"
                    name="phone"
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter Phoneno"
                    onChange={handlePhone}
                    defaultValue={initialValue.phone}
                    required
                  />
                </div>
                {formError.phone && post.phone?.length < 1 ? (
                  <span className="text-red-600">{formError.phone}</span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label>Zipcode</label>
                <div>
                  <input
                    type="text"
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter Zipcode"
                    name="zipcode"
                    onChange={handleZip}
                    defaultValue={initialValue.address?.zipcode}
                    required
                  />
                </div>
                {formError.zip && post.address.zipcode?.length < 1 ? (
                  <span className="text-red-600">{formError.zip}</span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="">Website</label>
                <div>
                  <input
                    type="text"
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter Website"
                    onChange={handleWeb}
                    name="website"
                    defaultValue={initialValue.website}
                    required
                  />
                </div>
                {formError.website && post.website?.length < 1 ? (
                  <span className="text-red-600">{formError.website}</span>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
          {(item === "company" || item === "add") && (
            <>
              <div>
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    onChange={handleCame}
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter Name"
                    name="cname"
                    defaultValue={initialValue.company?.name}
                    required
                  />
                </div>
                {formError.cname && post.company.name?.length < 1 ? (
                  <span className="text-red-600">{formError.cname}</span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label>Address</label>
                <div>
                  <input
                    type="text"
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter address"
                    name="street"
                    onChange={handleAddress}
                    defaultValue={initialValue.address?.street}
                    required
                  />
                </div>
                {formError.street && post.address.street?.length < 1 ? (
                  <span className="text-red-600">{formError.street}</span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label>City</label>
                <div>
                  <input
                    type="text"
                    className="placeholder:text-xs border border-blue-200 mt-2 py-1 pr-5 pl-2 focus:outline-none"
                    placeholder="Enter City"
                    onChange={handleCity}
                    name="city"
                    defaultValue={initialValue.address?.city}
                    required
                  />
                </div>
                {formError.city && post.address.city?.length < 1 ? (
                  <span className="text-red-600">{formError.city}</span>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
        <hr />
        <button
          type="submit"
          className="my-3 border bg-red-400 text-white p-2 rounded-md float-right"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
