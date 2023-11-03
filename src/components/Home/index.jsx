import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import HomeTable from "./HomeTable";
import { ReactContext } from "../../context/ReactContext";
import ReactPaginate from "react-paginate";
import { LiaSortSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
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
    console.log(item2);
    if (item && item2) {
      console.log(item);
      // navigate("/company");
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
        return item.username
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setData(filterItem);
    }
  };

  const handleSort = () => {
    const sortItem = [...data];
    if (sortDown) {
      sortItem.sort((a, b) => (a.username > b.username ? 1 : -1));
    } else {
      sortItem.sort((a, b) => (a.username < b.username ? 1 : -1));
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
            className=" focus:outline-none rounded-md p-1 w-48 placeholder:text-gray-300 border"
            placeholder="search..."
            onChange={filterBySearch}
          />
          <IoIosNotificationsOutline
            size={30}
            color="#C4C4C4"
            style={{ marginLeft: 15, marginRight: 15 }}
          />
        </div>
      </div>
      <div className="w-full  overflow-hidden p-4">
        <div className="flex justify-between p-2">
          <h2 className="font-bold text-2xl">Users List</h2>
          <div>
            <LiaSortSolid
              color="#A700D0"
              size={25}
              style={{ marginRight: 10 }}
              onClick={handleSort}
            />{" "}
          </div>
        </div>
        <hr />
        <HomeTable currentItems={currentItems} />
      </div>
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

export default HomePage;
