import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Spin, Button, Popconfirm, Alert, Modal } from "antd";
import { useHistory } from "react-router-dom";

import store from "../redux/store";
import { fetchUsers } from "../redux/members/memberSlice";
import { useSelector, useDispatch } from "react-redux";



function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  let today = new Date();

  const data = useSelector((state) => state.members);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [hbd, setHbd] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    record: {},
  });

  useEffect(() => {
    if (data.length === 0)
      store.dispatch(fetchUsers).then(() => setLoading(false));
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (user && user.dob) {
      if (
        user.birthMonth == today.getMonth() &&
        user.birthDate == today.getDate()
      ) {
        let wishedThisYear;
        if (user.wishedArray) {
          wishedThisYear = user.wishedArray.find(
            (item) => item == today.getFullYear()
          );
        }
        if (!wishedThisYear) return setHbd(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("activeUser", JSON.stringify({}));
    history.push("/login");
  };

  const handleModal = (record) => {
    console.log(record);
    setModal({
      show: modal.show ? false : true,
      record,
    });
  };

  const handleHbdClose = () => {
    let newUserData = user;
    let newWishedArray = user.wishedArray
      ? user.wishedArray.push()
      : [today.getFullYear()];
    newUserData.wishedArray = newWishedArray;
    localStorage.setItem("activeUser", JSON.stringify(newUserData));
    let allUsers = JSON.parse(localStorage.getItem("userData"));
    let newAllUsers = allUsers.map((item) => {
      if (item.email === user.email) return newUserData;
      else return item;
    });
    localStorage.setItem("userData", JSON.stringify(newAllUsers));
    dispatch({ type: "loggedInInfo", payload: newUserData });
  };

  const ShowModal = (props) => {
    let record = modal.record;
    if (modal.show && modal.record !== undefined)
      return (
        <Modal
          title="Member Details"
          visible={modal.show}
          onCancel={() => handleModal({})}
          footer={null}
          closable
        >
          <p>
            <img style={{ width: "200px" }} src={record.avatar}></img>
          </p>
          <p>
            <div>Member Id</div>
            <div>{record.id}</div>
          </p>
          <p>
            <div>First Name</div>
            <div>{record.first_name}</div>
          </p>
          <p>
            <div>Last Name</div>
            <div>{record.last_name}</div>
          </p>
          <p>
            <div>Email</div>
            <div>{record.email}</div>
          </p>
        </Modal>
      );
    else return <div></div>;
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <img style={{ width: "50px" }} src={avatar}></img>,
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "name",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <Button onClick={(e) => handleModal(record)}>View</Button>
          <Button style={{ margin: "5px" }}>
            <Link to={`/edit/${record.id}`}>Edit</Link>
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() =>
              dispatch({ type: "member/delete", payload: record.id })
            }
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="home__wrapper">
      {loading ? (
        <Spin />
      ) : data.length === 0 ? (
        <div className="header">
          <h1>No Members</h1>
          <p onClick={handleLogout}>Logout</p>
        </div>
      ) : (
        <>
          <div className="header">
            <h1>Members</h1>
            <Alert
              style={{ visibility: hbd ? "" : "hidden" }}
              message={`Happy Birthday ${user.name}`}
              type="success"
              closable
              onClose={handleHbdClose}
            />
            <div>
              <Button style={{marginRight:'10px'}}>
                <Link to="/add">Add Member</Link>
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
          <ShowModal />
          <Table columns={columns} dataSource={data} />
        </>
      )}
    </div>
  );
}

export default Home;
