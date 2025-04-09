import React, { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Active_Auctions = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  // console.log(products);

  const [favorites, setFavorites] = useState([]);
  const [total, SetTotal] = useState(0);

  const handelHeartIcon = (product, price) => {
    setFavorites([...favorites, product]);

    const newPrice = total + price;
    SetTotal(newPrice);
    toast.success(<div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      gap: "10px"
    }}>
      <img width={50} height={50} style={{
        objectFit: "cover",
        objectPosition: "center"
      }} src={product.image} />
      <span>{product.title}</span>
    </div>, {
      position: "top-right"
    })

    localStorage.setItem("favorites", JSON.stringify([...favorites, product]));
  };

  const removeItemFromFavoriteItems = (id) => {
    const remainingFavorites = favorites.filter((item) => item.id !== id);
    console.log(remainingFavorites)
    SetTotal((total - remainingFavorites?.[0]?.currentBidPrice) || 0);
    localStorage.setItem("favorites", JSON.stringify(remainingFavorites))
    setFavorites(remainingFavorites);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    setFavorites(JSON.parse(storedFavorites) || []);
  }, [])

  return (
    <div className="bg-[#EBF0F5]">
      <div className="w-11/12 mx-auto my-7 ">
        <h3 className="text-2xl font-semibold">Active Auctions</h3>
        <p className=" font-semibold">
          Discover and bid on extraordinary items
        </p>
        <div className="parent flex justify-between gap-5 my-7">
          <div className="child-1 bg-white w-[70%]">
            <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                    <th>Item</th>
                    <th></th>
                    <th>Current Bid</th>
                    <th>Time Left</th>
                    <th>Bid No</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      className="border-t"
                      key={product.id}
                      style={{ textAlign: "center" }}
                    >
                      <td>
                        <img
                          src={product.image}
                          className="w-16 h-16 rounded"
                        />
                      </td>
                      <td align="left">{product.title}</td>
                      <td>$ {product.currentBidPrice}</td>
                      <td> {product.timeLeft}</td>
                      <td className="flex items-center justify-center h-20">
                        <button
                          onClick={() =>
                            handelHeartIcon(product, product.currentBidPrice)
                          }
                          className={`cursor-pointer`}
                          disabled={favorites.find(
                            (favProduct) => favProduct.id === product.id
                          )}
                        >
                          {" "}
                          {favorites.find(
                            (favProduct) => favProduct.id === product.id
                          ) ? (
                            <FaHeart
                              size={28}
                              className="text-red-600 cursor-not-allowed"
                              title="🚫"
                            />
                          ) : (
                            <CiHeart size={28} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="child-2  bg-white w-[30%]">
            <h2
              style={{ borderBottom: " 1px solid #DCE5F3" }}
              className="text-2xl font-semibold flex items-center justify-center gap-2 w-full text-center"
            >
              <span>
                <CiHeart />
              </span>{" "}
              Favorite Items
            </h2>

            {favorites.map((favorite) => {
              return (
                <div className="p-2 " key={favorite.id}>
                  <div
                    style={{
                      border: " 1px solid #DCE5F3",
                      borderRadius: "10px",
                    }}
                    className="flex items-center gap-4 mt-3 "
                  >
                    <div
                      style={{
                        border: " 1px solid #DCE5F3",
                        borderRadius: "10px",
                      }}
                      className="ml-3"
                    >
                      <img
                        className="w-28 p-2 rounded-xl"
                        src={favorite.image}
                        alt=""
                      />
                    </div>
                    <div className="text-left  w-full pr-5">
                      <div className="flex items-center justify-between gap-5">
                        <div>
                          <h1 className="text-xl py-3">{favorite.title}</h1>
                        </div>
                        <div>
                          <button
                            onClick={() =>
                              removeItemFromFavoriteItems(favorite.id)
                            }
                            className="cursor-pointer"
                          >
                            <ImCross />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <p>$ {favorite.currentBidPrice}</p>
                        <p>Bids: {favorite.bidsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                // console.log(favorite)
              );
            })}
            <div
              style={{ borderTop: " 1px solid #DCE5F3" }}
              className="flex gap-5 justify-between mt-10 text-xl font-semibold px-6"
            >
              <h2>Total Bids Amount </h2>
              <span>$ {total}</span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Active_Auctions;
