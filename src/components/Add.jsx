import axios from "axios";
import React, { useState } from "react";

const Add = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const inputFullname = (fullname) => {
    return setFullname(fullname);
  };

  const inputPhone = (phone) => {
    return setPhone(phone);
  };

  const inputNote = (note) => {
    return setNote(note);
  };

  const save = () => {
    axios({
      method: "POST",
      url: "http://localhost:3001/api/contacts",
      data: {
        fullname: fullname,
        phone: phone,
        note: note,
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.payload.affectedRows) {
        alert("data berhasil ditambahkan");
        window.location.href = "/";
      } else {
        alert("data gagal ditambahkan");
        window.location.reload();
      }
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
                required="required"
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
                onChange={(e) => inputNote(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => save()}
                style={{ cursor: "pointer" }}
              >
                Tambahkan Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
