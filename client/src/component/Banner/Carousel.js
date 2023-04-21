import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const styles = {
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  carouselItem: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      image: "https://www.freeiconspng.com/uploads/bitcoin-png-33.png",
      current_price: 46000.98,
      price_change_percentage_24h: 2.31,
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      image: "https://www.freeiconspng.com/uploads/ethereum-icon-0.png",
      current_price: 2600.56,
      price_change_percentage_24h: -1.2,
    },
    {
      id: 3,
      name: "Litecoin",
      symbol: "LTC",
      image: "https://www.freeiconspng.com/uploads/litecoin-png-logo-17.png",
      current_price: 280.78,
      price_change_percentage_24h: 0.75,
    },
    {
      id: 4,
      name: "Ripple",
      symbol: "XRP",
      image: "https://www.freeiconspng.com/uploads/ripple-png-logo-6.png",
      current_price: 1.56,
      price_change_percentage_24h: -0.8,
    },
    {
      id: 5,
      name: "Bitcoin Cash",
      symbol: "BCH",
      image:
        "https://www.freeiconspng.com/uploads/bitcoin-cash-bch-logo-transparent-png--1557689134203.png",
      current_price: 785.24,
      price_change_percentage_24h: 1.05,
    },
  ]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span
          style={{
            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
          }}
        >
          {coin?.symbol}
          &nbsp; &nbsp;
          <span>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span sx={{ fontSize: 22, fontWeight: 500 }}>
          {/* {symbol} {numberWithCommas(coin?.current_price.toFixed(2))} */}
        </span>
      </>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={styles.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={100}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
