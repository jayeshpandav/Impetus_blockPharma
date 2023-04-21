import React, { useState, useEffect } from "react";
import "../Pages/Styles/supply.css";

const InventoryTable = ({ medicine_data, med_count, logged_ret }) => {
  const [inventory, setInventory] = useState([]);
  const [showInventory, setShowInventory] = useState(false);

  const toggleShowInventory = () => {
    setShowInventory(!showInventory);
  };

  useEffect(() => {
    const newInventory = [];
    for (let i = 1; i <= med_count; i++) {
      // console.log(`med at i = ${i}`, medicine_data[i]);
      if (medicine_data[i].RETid === logged_ret && medicine_data[i].stage < 5) {
        // console.log("medicine_data", medicine_data);
        const itemName = medicine_data[i].name;
        const itemIndex = newInventory.findIndex(
          (item) => item.name === itemName
        );
        if (itemIndex !== -1) {
          newInventory[itemIndex].qnt++;
        } else {
          newInventory.push({ name: itemName, qnt: 1 });
        }
      } else {
        continue;
      }
    }
    setInventory(newInventory);
    // console.log("inventory", inventory);
  }, [medicine_data, med_count, logged_ret]);

  return (
    <>
      <h2 className="my-3">Inventory</h2>
      <button
        className="d-block center button glow-button my-2"
        style={{ transform: "translateX(calc(50vw - 50%))" }}
        onClick={toggleShowInventory}
      >
        View/Hide Inventory
      </button>
      {showInventory && (
        <table className="question-table table table-responsive-sm table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.qnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default InventoryTable;
