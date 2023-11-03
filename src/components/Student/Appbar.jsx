import React, { useContext, useEffect, useState } from "react";
import Table from "./Table";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ReactContext } from "../../context/ReactContext";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();
  const { users } = useContext(ReactContext);
  const [data, setData] = useState(users);
  const [itemOffset, setItemOffSet] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [sortDown, setSort] = useState(true);
  const itemsPerPage = 7;

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("username"));
    console.log(item);
    const item2 = JSON.parse(localStorage.getItem("email"));
    if (item && item2) {
      // navigate("/home");
    } else {
      navigate("/login");
    }
    //return navigate("/login");
  }, []);

  useEffect(() => {
    setData(users);
  }, [users]);

  useEffect(() => {
    const endOffSet = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffSet));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handleClick = (e) => {
    const newOffSet = (e.selected * itemsPerPage) % data.length;
    setItemOffSet(newOffSet);
  };

  const filterBySearch = (e) => {
    if (e.target.value === "") {
      setData(users);
    } else {
      const filterItem = users.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      console.log(filterItem);
      setData(filterItem);
    }
  };
  const handleSort = () => {
    const sortItem = [...data];
    if (sortDown) {
      sortItem.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      sortItem.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    console.log(sortItem);
    setSort(!sortDown);
    setData(sortItem);
  };

  return (
    <div className=" w-full flex flex-col bg-[#F8F8F8]">
      <div className="p-4 flex justify-between  bg-white">
        <AiOutlinePlayCircle size={30} color="#C4C4C4" />
        <div>
          <input
            type="search"
            name="search"
            className=" focus:outline-none rounded-md py-1 px-3 w-52 placeholder:text-gray-300 border "
            placeholder="search..."
            onChange={filterBySearch}
          />
          <IoIosNotificationsOutline
            color="#C4C4C4"
            size={30}
            style={{ marginLeft: 15, marginRight: 15 }}
          />
        </div>
      </div>
      <Table currentItems={currentItems} sort={handleSort} />
      <div className="self-end">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handleClick}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pages"
          activeLinkClassName="active"
          pageLinkClassName="pages-num"
          previousLinkClassName="pages-num"
          nextLinkClassName="pages-num"
          breakLinkClassName="pages-num"
        />
      </div>
    </div>
  );
};

export default Appbar;
