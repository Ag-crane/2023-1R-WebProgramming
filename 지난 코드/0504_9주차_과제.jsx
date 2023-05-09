import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {


  const [row, setRow] = useState([]); // 데이터를 저장할 변수
  console.log(row)
  if (row.length === 0) {
    fetch(
      "http://openapi.seoul.go.kr:8088/7961696649656e6136375774696566/json/RealtimeCityAir/1/25/"
    ).then(function (res2) {
      res2.json().then(function (res3) {
        setRow(res3.RealtimeCityAir.row); // if문 없으면 무한루프. 왜냐면 setRow가 실행되면 리액트가 다시 실행되고, 다시 setRow가 실행되고, 다시 리액트가 실행되고...
      });
    });
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React ^___^</h1>

      <table>
        <thead>
          <th>이름</th>
          <th>PM10</th>
          <th>O3</th>
          <th>상태</th>
        </thead>
        <tbody id="table">

        </tbody>
      </table>
      <button onClick={function(){    
        document.getElementById("table").innerHTML =
        row.map(function (obj) {
          return (
            "<tr><td>" +
            obj.MSRSTE_NM +
            "</td><td>" +
            obj.PM10 +
            "</td><td>" +
            obj.O3 +
            "</td><td>" +
            obj.IDEX_NM +
            "</td></tr>"
          );
        })
      }}>미세먼지 데이터</button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App; // 다른 코드 (main.jsx) 에서 import 할 수 있도록 export (공개)