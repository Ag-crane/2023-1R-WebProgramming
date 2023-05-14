import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {

  const [row, setRow] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`

    return () => {
      document.title = "Vite + React"
    }
  }) 

  useEffect(() => {
    fetch("http://openAPI.seoul.go.kr:8088/78636e4e496269673634556a795559/json/RealtimeCityAir/1/25/").then(
      function(res2) {
        res2.json().then(function(res3) {
          setRow(res3.RealtimeCityAir.row); 
        })
      }
    )
  }, [])

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
          <tr>
          <th>이름</th>
          <th>PM10</th>
          <th>O3</th>
          <th>상태</th>
          </tr>
          </thead>
        <tbody id="table">

        </tbody>
      </table>
      <button onClick={function(){
        
        setCount(count + 1)
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

export default App;