import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {  
  const [row, setRow] = useState([]);

  //  main.jsx 에서 StrictMode 지우고 콘솔로그 확인해보기
  useEffect(() => {
    console.log('mount or update')    // 맨처음 mount, fetch 후 setRow 실행될 때 update. 총 2번 실행됨.

    return () => {
        console.log('unmount')      // unmount 될 때. 정확히는 내용이 지워질 때 (지웠다가 다시 업데이트 하기 위해 지우는 과정)
    }
  })
  useEffect(() => {
    console.log('mount only')      // mount 될 때만 실행됨. 
    // mount될 때만 fetch 하고싶으니까
    fetch("http://openAPI.seoul.go.kr:8088/78636e4e496269673634556a795559/json/RealtimeCityAir/1/25/").then(
      function(res2) {
        res2.json().then(function(res3) {
          setRow(res3.RealtimeCityAir.row); 
        })
      }
    )
  }, []) // 뒤에 빈 배열을 넣으면 mount 될 때만 실행됨.

  useEffect(() => {
    console.log('update only')  // 'row'가 update 될 때만 실행됨. row 자리에 배열형식으로 여러 개 넣을 수 있음
  }, [row])




  
  console.log(row);

  // const res = await fetch("http://openAPI.seoul.go.kr:8088/78636e4e496269673634556a795559/json/RealtimeCityAir/1/25/");
  // const res2 = await res.json();
  // console.log(res2.RealtimeCityAir.row);

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
      <h1>Vite + Resort</h1>
      <table>
        <thead>
          <tr>
          <th>이름</th>
          <th>PM10</th>
          <th>O3</th>
          <th>상태</th>
          </tr> 
        </thead>
        <tbody>
        // 중괄호 : 자바스크립트 코드를 넣겠다는 뜻
        // function 의 중괄호   는 return 을 의미.
        // 소괄호 : 원래 아무 의미 없는데, jsx 문법은 엔터를 치면 깨지거나 뭔가 문제가 생기기 때문에 return 뒤를 ()로 묶어줌 
          {
          row.map((gu, index) => {
            return (
                <tr key={ index }>
                <td>{gu.MSRSTE_NM}</td>
                <td>{gu.PM10}</td>
                <td>{gu.O3}</td>
                <td>{gu.IDEX_NM}</td>
                </tr>
            )

          })
          }
        </tbody>
      </table>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App