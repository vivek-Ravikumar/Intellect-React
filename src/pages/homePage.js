import React, { Fragment, useState } from "react";

const HomePage = () => {
  const [purchaseData, setPurchaseData] = useState({
    name: "",
    shopName: "",
    status: ""
  });
  const today = new Date();
  const [editmode, setEditMode] = useState(false);

  const [arrayData, setArrayData] = useState([
    { name: "sample", shopName: "sampleShop", status: "unpaid" },
    { name: "sample2", shopName: "sampleShop", status: "unpaid" },
    { name: "sample3", shopName: "sampleShop", status: "unpaid" }
  ]);

  const { name, shopName, status } = purchaseData;
  const changeFunction = event => {
    setPurchaseData({
      ...purchaseData,
      [event.target.name]: event.target.value
    });
  };

  const clearAll = () => {
    // clearCurrent();
  };

  const deleteFunction = e => {
    const name = e.target.id;

    const newArrayData = arrayData.filter(data => data.name !== name);
    console.log(newArrayData);
    setArrayData(newArrayData);
  };

  const editFunction = e => {
    const name = e.target.id;
    const newArrayData = arrayData.filter(data => data.name === name);
    setPurchaseData({
      name: newArrayData[0].name,
      shopName: newArrayData[0].shopName,
      status: newArrayData[0].status
    });
    setEditMode(true);
  };
  const onSubmitFunction = e => {
    e.preventDefault();
    if (editmode) {
      //alert("editing");
      const newArrayData = arrayData.map(data => {
        if (data.name === purchaseData.name) {
          return purchaseData;
        } else return data;
      });

      setArrayData(newArrayData);
      setEditMode(false);
      setPurchaseData({ name: "", shopName: "", status: "" });
    } else {
      if (name && shopName && status) {
        setArrayData(prevState => [...prevState, purchaseData]);
      } else alert("enter all data");
    }
  };
  return (
    <Fragment>
      <h2>Enter Details</h2>
      <form onSubmit={onSubmitFunction}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={changeFunction}
          readOnly={editmode ? true : false}
        />
        <input
          type="text"
          placeholder="shopName"
          name="shopName"
          value={shopName}
          onChange={changeFunction}
        />
        <textarea
          type="text"
          placeholder="Status"
          name="status"
          value={status}
          onChange={changeFunction}
        />

        <input
          type="submit"
          value={editmode ? "edit" : "submit"}
          className="btn"
        />
      </form>

      <table>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>ShopName</th>
          <th>Date</th>
        </tr>
        {arrayData.map(data => {
          return (
            <tr key={data.name}>
              <td>{data.name}</td>
              <td>{data.status}</td>
              <td>{data.shopName}</td>

              <td>
                {today.getFullYear() +
                  "-" +
                  (today.getMonth() + 1) +
                  "-" +
                  today.getDate() +
                  "-" +
                  today.getHours() +
                  ":" +
                  today.getMinutes()}
                <span>
                  <i
                    id={data.name}
                    className="fas fa-trash"
                    onClick={deleteFunction}
                  />
                  <i
                    id={data.name}
                    className="fas fa-edit"
                    onClick={editFunction}
                  />
                </span>
              </td>
            </tr>
          );
        })}
      </table>
    </Fragment>
  );
};

export default HomePage;
