import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Spin, Button, Divider } from "antd";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

function Edit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  let fNameRef = useRef();
  let lNameRef = useRef();
  let memberIdRef = useRef();
  let avatarRef = useRef();

  const data = useSelector((state) => state.members);
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let editable = data.find((item) => params.id === `${item.id}`);
    if (editable) {
      setItem(editable);
      setLoading(false);
    } else window.location.href = "/";
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    let obj = {
      id: parseInt(params.id),
      email: item.email,
      first_name: fNameRef.current.value,
      last_name: lNameRef.current.value,
      avatar: item.avatar,
    };
    dispatch({ type: "member/edit", payload: obj });

    history.push("/");
  };
  const fieldStyle = {
    marginTop: '20px',
  }

  return (
    <div className="home__wrapper">
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="header">
            <h1>Edit Details</h1>
          </div>
          <Divider />
          <div>
            <div style={fieldStyle}>
              <div>First Name:</div>
              <input  defaultValue={item.first_name} ref={fNameRef}></input>
            </div>
            <div style={fieldStyle}>
              <div>Last Name</div>
              <input
                //style={{ margin: "10px" }}
                defaultValue={item.last_name}
                ref={lNameRef}
              ></input>
            </div>
            <div style={fieldStyle}>
              <div>Member Id</div>
              <input
                defaultValue={item.id}
                ref={memberIdRef}
              ></input>
            </div>
            <div style={fieldStyle}>
              <div>Avatar URL</div>
              <input
                defaultValue={item.last_name}
                ref={avatarRef}
              ></input>
            </div>
            <div style={fieldStyle}>
            <Button><Link onClick={handleSave}>Save</Link></Button>
            <Button style={{margin: '10px'}}><Link onClick={()=>history.push('/')}>Back</Link></Button>
            </div>
            
            <Divider/>
          </div>
        </>
      )}
    </div>
  );
}

export default Edit;
