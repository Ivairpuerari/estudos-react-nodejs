import React, { useEffect, useState } from "react";
import Service from "../services/app.services";

export default function Grid() {
  const [dados, setDados] = useState([]);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    retrieveData();
  });

  const retrieveData = () => {
    var today = new Date();

    var date = today.getFullYear() + "-" + (today.getMonth() + 1);

    console.log(date);

    await Service.getByPeriod(date)
      .then((response) => {
        setDados(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Grade List</h4>
      </div>
    </div>
  );
}
