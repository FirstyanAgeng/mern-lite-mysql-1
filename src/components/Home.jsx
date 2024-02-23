import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [Datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/contacts/${id}`)
      .then((res) => {
        setDatas(Datas.filter((data) => data.id !== id));
        alert("delete berhasil");
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/contacts",
    }).then((res) => {
      setDatas(res.data.payload);
      console.log(res.data.payload);
    });
  }, []);

  return (
    <>
      <Link to="/add" className="" style={{ marginInlineStart: "310px" }}>
        <button>Tambah</button>
      </Link>
      <table border={1}>
        <thead>
          <tr>
            <th>no</th>
            <th>nama</th>
            <th>telp</th>
            <th>note</th>
            <th>aksi</th>
          </tr>
        </thead>
        <tbody>
          {Datas.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.fullname}</td>
              <td>{data.phone}</td>
              <td>{data.note}</td>
              <td>
                {/* Button to trigger the edit action */}
                <button onClick={() => handleEdit(data.id)}>Edit</button>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
