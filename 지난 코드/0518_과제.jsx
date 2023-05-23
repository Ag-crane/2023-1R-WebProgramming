import p01 from "./assets/band/넬.jpg";
import p02 from "./assets/band/노브레인.jpg";
import p03 from "./assets/band/더폴스.jpg";
import p04 from "./assets/band/데이브레이크.jpg";
import p05 from "./assets/band/데이식스.jpg";
import p06 from "./assets/band/라쿠나.jpg";
import p07 from "./assets/band/로맨틱펀치.jpg";
import p08 from "./assets/band/루시.jpg";
import p09 from "./assets/band/새소년.jpg";
import p10 from "./assets/band/설.jpg";
import p11 from "./assets/band/실리카겔.jpg";
import p12 from "./assets/band/쏜애플.jpg";
import p13 from "./assets/band/웨투얼.jpg";
import p14 from "./assets/band/유다빈밴드.jpg";
import p15 from "./assets/band/잔나비.jpg";
import p16 from "./assets/band/터치드.jpg";
import { useEffect, useState } from "react";


function Worldcup() {
    const candidate = [
      { name: "넬", src: p01 },
      { name: "노브레인", src: p02 },
      { name: "더폴스", src: p03 },
      { name: "데이브레이크", src: p04 },
      { name: "데이식스", src: p05 },
      { name: "라쿠나", src: p06 },
      { name: "로맨틱펀치", src: p07 },
      { name: "루시", src: p08 },
      { name: "새소년", src: p09 },
      { name: "설", src: p10 },
      { name: "실리카겔", src: p11 },
      { name: "쏜애플", src: p12 },
      { name: "웨투얼", src: p13 },
      { name: "유다빈밴드", src: p14 },
      { name: "잔나비", src: p15 },
      { name: "터치드", src: p16 },
    ];

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [stat, setStat] = useState({     // 통계 정보를 dictionary 형태로 저장하는 state
        "넬": 0,
        "노브레인": 0,
        "더폴스": 0,
        "데이브레이크": 0,
        "데이식스": 0,
        "라쿠나": 0,
        "로맨틱펀치": 0,
        "루시": 0,
        "새소년": 0,
        "설": 0,
        "실리카겔": 0,
        "쏜애플": 0,
        "웨투얼": 0,
        "유다빈밴드": 0,
        "잔나비": 0,
        "터치드": 0,
    });
    // 처음 Worldcup 컴포넌트가 단 한 번 실행하는 함수
    useEffect(() => {
        const 문자열 = localStorage.getItem("2018111750");
        if( 문자열 != null ) {
            setStat( JSON.parse(문자열) );
        }

        setGame(candidate.map(c => {
            return {name: c.name, src: c.src, order: Math.random()}
        }).sort((l, r) => {
            return l.order - r.order;
        }));
        console.log("game", game)
    }, []);    

     // round가 바뀔 때마다 실행하는 함수
    useEffect(() => {
        // 16강->8강, 8강->4강, 4강->결승 일 경우에만 실행되는 조건문
        if( game.length > 1 && round + 1 > game.length / 2 ) {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    }, [round]);   

    if( game.length === 1 ){
        localStorage.setItem("2018111750", JSON.stringify( stat ) );
        
        // 통계 정보를 투표 횟수를 기준으로 내림차순으로 정렬
        const sortedStat = Object.entries(stat).sort((a, b) => b[1] - a[1]);

        return (
          <div className="container">
            <p>이상형 월드컵 우승</p>
            <img src={game[0].src} />
            <p>{game[0].name}</p>
            <table>
              {sortedStat.map(([name, count]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </table>
          </div>
        );
    }
    if( game.length === 0 || round + 1 > game.length / 2 ) return <p>로딩중입니다</p>;
    
    const left = round * 2, right = round * 2 + 1;
    console.log(stat);

    const leftFunction = () => {
      setStat({
          ...stat, 
          [game[left].name]: stat[ game[left].name ] + 1
      });
      setNextGame((prev) => prev.concat(game[left]))
      setRound(round => round + 1);
    };
    const rightFunction = () => {
        setStat({
            ...stat, 
            [game[right].name]: stat[ game[right].name ] + 1
        });
        setNextGame((prev) => prev.concat(game[right]))
        setRound(round => round + 1);
    };
    
    return (
      <div className="container">
        <p>이상형 월드컵 {round + 1} / {game.length / 2} <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
        <div id="imgBox">
            <img src={game[left].src} onClick={leftFunction}/>
            <img src={game[right].src} onClick={rightFunction}/>
        </div>
    </div>
    )
}

export default Worldcup;
