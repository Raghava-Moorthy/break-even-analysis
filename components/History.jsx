import React, { useEffect, useState } from "react";
import Image from "next/image";
import PouchDB from "pouchdb";
import { BiSolidTrashAlt } from "react-icons/bi";
import { Dialog } from "@mui/material";
import crossBlue from "../public/icons/crossblue.svg";
import { v4 as uuidv4 } from "uuid";

const History = ({ historyData, tab, selectedHistory }) => {
  const db = new PouchDB("beaCalculator");
  console.log("DbCreated" + db);
  const [currentItem, setCurrentIntem] = useState(null);
  const [historyValue, setHistoryValue] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");

  useEffect(() => {
    const insertHistory = async (history) => {
      try {
        history._id = uuidv4();
        const response = await db.put(history);
        console.log("Inserted", response);
        setHistoryValue([...historyValue, history]);
      } catch (err) {
        console.log("error in inserting", err);
      }
    };
    if (currentItem) insertHistory(currentItem);
  }, [currentItem]);
  useEffect(() => {
    if (historyData.length > 0) {
      setCurrentIntem(historyData[historyData.length - 1]);
    }
  }, [historyData]);

  useEffect(() => {
    const fetchHistoryFromDB = async () => {
      try {
        const response = await db.allDocs({ include_docs: true });
        const documents = response.rows.map((row) => row.doc);
        console.log("Fetched documents:");
        documents.forEach((doc) => console.log(JSON.stringify(doc)));

        setHistoryValue(documents);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };
    fetchHistoryFromDB();
  }, []);

  const reWrite = historyValue.slice().reverse();
  const handleDelete = (id) => {
    db.get(id)
      .then((doc) => {
        return db.remove(doc._id, doc._rev);
      })
      .then(() => {
        console.log("Document deleted successfully");
        const updatedHistory = historyValue.filter((item) => item._id !== id);
        setHistoryValue(updatedHistory);
      })
      .catch((err) => {
        console.error("Error deleting document:", err);
      });
  };
  const handleCardClick = (item) => {
    // setSelectedItem(item);
    // setOpenDialog(true);
    selectedHistory(item);
    tab("calculate");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div
        className={`w-[90%] h-[62vh] bg-white shadow-lg shadow-slate-400 rounded-3xl flex justify-center relative overflow-y-auto`}
      >
        <div className="w-full max-w-[100%] pb-3 h-fit flex flex-wrap justify-between">
          <div className="flex w-[100%] lg:w-[50%] bg-[#F6F6F6] h-[8vh] rounded-tl-3xl justify-around lg:text-lg md:text-md: text-sm  font-[Roboto-Regular]">
            <p className="mt-3 font-semibold ">Product Name</p>
            <p className="mt-3 font-semibold">Break Even Point</p>
            <p></p>
          </div>
          <div className="hidden lg:flex w-[50%] bg-[#F6F6F6] h-[8vh] rounded-tr-3xl justify-around lg:text-lg md:text-md: text-sm font-[Roboto-Regular]">
            <p className="mt-3 font-semibold">Product Name</p>
            <p className="mt-3 font-semibold">Break Even Point</p>
            <p></p>
          </div>
          {reWrite.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="w-[90%] lg:w-[47%] lg:m-2 ml-[5%] outline-none rounded-xl pl-4 border-none mb-2 text-lg font-semibold cursor-pointer
                  font-[Source-Sans-Pro] bg-[#FCDD9B] flex h-[8vh] mt-2 border-2 shadow-md hover:shadow-slate-400 items-center justify-around"
                  onClick={() => handleCardClick(item)}
                >
                  {item.hProductName && (
                    <h1>
                      {item.hProductName.charAt(0).toUpperCase() +
                        item.hProductName.slice(1)}
                    </h1>
                  )}
                  <h1>{item.hResult}</h1>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                    title="Delete"
                  >
                    <span className="opacity-50">
                      <BiSolidTrashAlt />
                    </span>
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        PaperProps={{
          style: {
            minWidth: "20%",
            maxWidth: "90%",
            height: "57vh",
          },
        }}
      >
        {selectedItem && (
          <div className="flex flex-col bg-[#FCDD9B] h-full">
            <div className="flex items-center justify-between p-3 bg-[#E9ECEF]">
              <h1 className="font-[interSemiBold] text-[20px] font-semibold ">
                {selectedItem.hProductName.charAt(0).toUpperCase() +
                  selectedItem.hProductName.slice(1)}
              </h1>
              <Image
                width="25%"
                height="15px"
                className="h-[15px] cursor-pointer"
                src={crossBlue}
                onClick={handleCloseDialog}
              />
            </div>
            <div className="h-[30vh] w-[80%] ml-4 mt-3 flex justify-between flex-col text-[18px]">
              <h1 className="flex justify-between">
                <span className="font-[SF-Pro-Display]">Fixed Cost:</span>
                <span className="font-[Space-Grotesk]">
                  {selectedItem.hFixedCost}
                </span>
              </h1>
              <h1 className="flex justify-between">
                <span className="font-[SF-Pro-Display]">Variable Cost: </span>
                <span className="font-[Space-Grotesk]">
                  {selectedItem.hVariableCost}
                </span>
              </h1>
              <h1 className="flex justify-between">
                {selectedItem.hPricePerUnit ? (
                  <>
                    <span className="font-[SF-Pro-Display]">
                      Price Per Unit :
                    </span>
                    <span className="font-[Space-Grotesk]">
                      {selectedItem.hPricePerUnit}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-[SF-Pro-Display]">Quantity :</span>
                    <span className="font-[Space-Grotesk]">
                      {selectedItem.hQuantity}
                    </span>
                  </>
                )}
              </h1>

              <h1 className="flex justify-between">
                <span className="font-[SF-Pro-Display]">Break Even Point:</span>
                <span className="font-[Space-Grotesk]">
                  {selectedItem.hResult}
                </span>
              </h1>
              <h1 className="flex justify-between">
                <span className="font-[SF-Pro-Display]">Sales Revenue:</span>
                <span className="font-[Space-Grotesk]">
                  {selectedItem.hSalesRevenue}
                </span>
              </h1>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default History;
