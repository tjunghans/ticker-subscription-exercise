import { useCallback, useEffect, useMemo } from "react";

export const App = () => {
  const socket = useMemo(
    () => new WebSocket("wss://ws-feed.pro.coinbase.com"),
    []
  );

  const handleSubscribe = useCallback(
    () =>
      socket.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: ["BTC-EUR"],
          channels: ["level2"],
        })
      ),
    [socket]
  );

  const handleUnsubscribe = useCallback(
    () =>
      socket.send(
        JSON.stringify({
          type: "unsubscribe",
          product_ids: ["BTC-EUR"],
          channels: ["level2"],
        })
      ),
    [socket]
  );

  useEffect(() => {
    socket.addEventListener("message", console.info);
    socket.addEventListener("error", console.error);
    socket.addEventListener("open", () => console.info("Connection open"));
    socket.addEventListener("close", () => console.info("Connection closed"));

    return () => socket.close();
  }, [socket]);

  return (
    <div className="App">
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleUnsubscribe}>Unubscribe</button>
      <div>[ content goes here ]</div>
    </div>
  );
};
