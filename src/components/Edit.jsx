import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    // Fetch existing contact data and populate the fields
    axios
      .get(`http://localhost:3001/api/contacts/${id}`)
      .then((res) => {
        const contact = res.data.payload;
        setFullname(contact.fullname);
        setPhone(contact.phone);
        setNote(contact.note);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  }, [id]); // Fetch data whenever contactId changes

  const inputFullname = (fullname) => {
    setFullname(fullname);
  };

  const inputPhone = (phone) => {
    setPhone(phone);
  };

  const inputNote = (note) => {
    setNote(note);
  };

  const save = () => {
    axios({
      method: "PUT", // Change method to PUT
      url: `http://localhost:3001/api/contacts/${id}`, // Include contactId in the URL
      data: {
        fullname: fullname,
        phone: phone,
        note: note,
      },
    })
      .then((res) => {
        console.log(res.data);
        alert("Data berhasil diubah");
        window.location.href = "/"; // Redirect to homepage after editing
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
        alert("Gagal mengubah data");
      });
  };

  return (
    <div>
      <div style={{ marginTop: 65 }}>
        <div className="container">
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="fullname" className="required">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => inputFullname(e.target.value)}
              />
            </div>
            <div className="col-sm m-10">
              <label htmlFor="phone" className="required">
                Nomor Telepon
              </label>
              <input
                type="number"
                className="form-control"
                value={phone}
                onChange={(e) => inputPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="fullname">Catatan</label>
              <textarea
                type="text"
                className="form-control"
                value={note}
                onChange={(e) => inputNote(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <button
                className="btn btn-primary" // Change button style
                type="button"
                onClick={() => save()}
                style={{ cursor: "pointer" }}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
