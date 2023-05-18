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

  useEffect(() => {
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  if (game.length === 1) {
    return (
      <div>
        <p>인디밴드 월드컵 우승</p>
        <img src={game[0].src} /> <p>{game[0].name}</p>
      </div>
    );
  }
  if (game.length === 0 || round + 1 > game.length / 2)
    return <p>로딩중입니다</p>;

  return (
    <div>
      <p
        style={{
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
        }}
      >
        인디밴드 월드컵 {round + 1} / {game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          width="500px"
          height="auto"
          src={game[round * 2].src}
          onClick={() => {
            setNextGame((prev) => prev.concat(game[round * 2]));
            setRound((round) => round + 1);
          }}
        />
      </div>
      <p style={{ fontSize: "30px", fontWeight: "bold", margin: "0 20px" }}>
        VS
      </p>
      <div style={{ position: "relative" }}>
        <img
          width="500px"
          height="auto"
          src={game[round * 2 + 1].src}
          onClick={() => {
            setNextGame((prev) => prev.concat(game[round * 2 + 1]));
            setRound((round) => round + 1);
          }}
        />
      </div>
    </div>
  );
}

export default Worldcup;
