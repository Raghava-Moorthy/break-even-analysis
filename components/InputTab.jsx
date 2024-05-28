import React, { useEffect, useState } from "react";
import CurrencyPopUp from "./CurrencyPopUp";
import Reload from "../public/icons/refresh-arrow.png";
import Image from "next/image";
import { BsInfoCircle } from "react-icons/bs";

const InputTab = ({
  ProductName,
  FixedCost,
  VariableCost,
  PricePerUnit,
  Quantity,
  currencyChange,
  tabChange,
  parentCurrencyId,
  currencySymbolChange,
  tab,
  selectedHistory,
  inputTab,
}) => {
  const [itemList, setItemList] = useState({
    productName: "",
    fixedCost: "",
    variableCost: "",
    pricePerUnit: "",
    quantity: "",
  });

  const [selectedTab, setSelectedTab] = useState(inputTab);
  const [openCurrencyDialog, setOpenCurrencyDialog] = useState(false);

  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyId, setCurrencyId] = useState(parentCurrencyId);

  const removeCharacter = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };
  const lettersOnly = (e) => {
    if (e.key === " " && e.target.value.length === 0) {
      e.preventDefault();
    }
    if (!/[a-zA-Z\b]/.test(e.target.value + e.key)) {
      e.preventDefault();
    }
  };
  const handleNameChange = (event) => {
    const { name, value } = event.target;

    setItemList((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value) && parseFloat(value) > 0) {
      setItemList((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setItemList((prevState) => ({ ...prevState, [name]: "" }));
    }
  };
  const inputHandler = () => {
    ProductName(itemList.productName);
    FixedCost(itemList.fixedCost);
    VariableCost(itemList.variableCost);
    PricePerUnit(itemList.pricePerUnit);
    Quantity(itemList.quantity);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    tabChange(tab);
    if (
      ((tab === "price" || tab === "unit") &&
        itemList.variableCost.trim() !== "") ||
      itemList.productName.trim() != "" ||
      itemList.fixedCost.trim() !== "" ||
      itemList.pricePerUnit.trim() !== "" ||
      itemList.quantity.trim() !== ""
    ) {
      setItemList((prevState) => ({
        ...prevState,
        productName: "",
        fixedCost: "",
        variableCost: "",
        pricePerUnit: "",
        quantity: "",
      }));
      ProductName("");
      FixedCost("");
      VariableCost("");
      PricePerUnit("");
      Quantity("");
    }
  };
  useEffect(() => {
    if (selectedHistory && Object.keys(selectedHistory).length > 0) {
      const {
        hProductName,
        hFixedCost,
        hVariableCost,
        hPricePerUnit,
        hQuantity,
      } = selectedHistory;
      setItemList({
        productName: hProductName,
        fixedCost: hFixedCost,
        variableCost: hVariableCost,
        pricePerUnit: hPricePerUnit,
        quantity: hQuantity,
      });
      console.log("Input tab value", inputTab);
    }
  }, [selectedHistory]);

  useEffect(() => {
    setSelectedTab(inputTab);
    console.log("input Tab change " + inputTab);
  }, [inputTab]);
  const clearInputs = () => {
    if (
      itemList.productName != "" ||
      itemList.fixedCost !== "" ||
      itemList.variableCost !== "" ||
      itemList.pricePerUnit !== "" ||
      itemList.quantity !== ""
    ) {
      ProductName("");
      FixedCost("");
      VariableCost("");
      PricePerUnit("");
      Quantity("");
      setItemList({
        productName: "",
        fixedCost: "",
        variableCost: "",
        pricePerUnit: "",
        quantity: "",
      });
    }
  };
  const handleCurrencyChange = (currencyId) => {
    currencyChange(currencyId);
  };
  const handleCurrencySymbolChange = (currencySymbol) => {
    currencySymbolChange(currencySymbol);
  };
  const currencyPopUpOpen = () => {
    setOpenCurrencyDialog(true);
  };
  if (tab === "history") {
    clearInputs();
  }
  return (
    <>
      <div className="w-full  xl:ml-5 lg:ml-0 ml-5 xl:mr-10 lg:mr-5 mr-10 bg-white lg:h-[62vh] md:h-[60vh] h-[65vh] rounded-3xl shadow-lg shadow-slate-700/40 relative block justify-center items-center mb-[10%] lg:mb-0">
        <div className="rounded-tl-3xl rounded-tr-3xl bg-[#F6F6F6] h-[8vh] flex items-center justify-center leading-3">
          <h1 className="text-center font-bold text-[30px] break-words font-[Source-Sans-Pro] w-full h-auto">
            BEP Calculator
          </h1>
        </div>
        <div className="h-[39vh] mt-3 relative">
          <div className="flex flex-row justify-around w-full h-auto">
            <span className="relative flex w-auto ml-3">
              <input
                type="radio"
                name="tab"
                id="unit"
                className="outline-none cursor-pointer accent-green-600"
                defaultChecked
                onClick={() => handleTabChange("unit")}
                checked={selectedTab === "unit"}
              />
              <label
                htmlFor="unit"
                title="Unit tab"
                className={`m-1 text-sm cursor-pointer font-[Source-Sans-Pro-Medium] flex flex-row ${
                  selectedTab === "unit" ? "font-bold" : "font-bold opacity-50 "
                }`}
              >
                Unit
                <BsInfoCircle className="w-[24%] m-1 mt-0.5 ml-1 opacity-70" />
              </label>
            </span>
            <span className="relative flex ml-3 w-auto">
              <input
                type="radio"
                name="tab"
                id="price"
                title="Price Tab"
                className="outline-none cursor-pointer accent-green-600"
                onClick={() => handleTabChange("price")}
                checked={selectedTab === "price"}
              />
              <label
                className={`m-1 text-sm font-[Source-Sans-Pro-Medium] cursor-pointer flex flex-row ${
                  selectedTab === "price"
                    ? "font-bold"
                    : " font-bold opacity-50"
                }`}
                htmlFor="price"
                title="Price tab"
              >
                Price
                <BsInfoCircle className="w-[23%] m-1 mt-0.5 ml-1 opacity-70" />
              </label>
            </span>
            <span
              className="relative flex mr-3 ml-3 w-auto "
              title="Change currency"
            >
              <label className="w-[45%] font-[Roboto-Regular] m-1 outline-none  text-[13px]">
                Currency:
              </label>
              <select
                id="currencyPopUp"
                className={
                  "text-[12px] h-[2.7vh] text-center items-center p-0 mt-1 font-[Roboto-Regular] ml-0.5 bg-transparent cursor-pointer outline-none"
                }
                onClick={currencyPopUpOpen}
                value={currencyId}
              >
                <option value={currencyId}>
                  {currencyId}({currencySymbol})
                </option>
              </select>
            </span>
          </div>
          <div className="capitalize flex flex-col h-auto  mt-3 ml-[35px] font-[Source-Sans-Pro-Medium]">
            <div className="relative flex-col block mt-1">
              <label
                className="text-xs flex flex-row w-[40%]"
                htmlFor="productName"
                title={`Enter the product name to analyze`}
              >
                Name of the product
                <BsInfoCircle className=" w-[15%] mt-0.5 opacity-70" />
              </label>
              <input
                type="text"
                className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm  placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Eg Pencil/-"
                name="productName"
                title="Your Product Name"
                autoComplete="off"
                onKeyDown={lettersOnly}
                value={itemList.productName}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="relative flex-col block mt-1">
              <label
                className="text-xs flex flex-row w-[40%]"
                htmlFor="fixedCost"
                title={`Fixed cost to produce ${
                  itemList.productName ? itemList.productName : "Product"
                }`}
              >
                fixed cost
                <BsInfoCircle className=" w-[15%] mt-0.5 opacity-70" />
              </label>
              <input
                type="number"
                className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm  placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Eg. 50,000/-"
                name="fixedCost"
                title="Fixed Cost Value"
                onKeyDown={removeCharacter}
                value={itemList.fixedCost}
                onChange={handleChange}
              />
            </div>
            <div className="relative flex-col block mt-1">
              <label
                className="text-xs flex flex-row w-[40%]"
                htmlFor="variableCost"
                title={
                  selectedTab === "unit"
                    ? `Variable Cost To Create ${
                        itemList.productName ? itemList.productName : "Product"
                      }`
                    : `Total Variable cost to produce ${
                        itemList.productName ? itemList.productName : "Product"
                      }`
                }
              >
                {selectedTab === "unit"
                  ? "variable cost per unit"
                  : "Total Variable Cost"}
                <BsInfoCircle className=" w-[15%] mt-0.5 opacity-70" />
              </label>
              <input
                type="number"
                className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm  placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Eg. 50,000/-"
                name="variableCost"
                title="Variable Cost Value"
                onKeyDown={removeCharacter}
                value={itemList.variableCost}
                onChange={handleChange}
              />
            </div>
            {selectedTab === "unit" ? (
              <div className="relative flex-col block mt-1">
                <label
                  className="text-xs flex flex-row w-[40%]"
                  htmlFor="Input"
                  title={`Amount to sell the single unit of ${
                    itemList.productName ? itemList.productName : "product"
                  }`}
                >
                  price per unit
                  <BsInfoCircle className=" w-[15%] mt-0.5 opacity-70" />
                </label>

                <input
                  type="number"
                  className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm  placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Eg. 50,000/-"
                  name="pricePerUnit"
                  title="Price Per Unit of your Product"
                  onKeyDown={removeCharacter}
                  value={itemList.pricePerUnit}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="relative flex-col block mt-1">
                <label
                  className="text-xs flex flex-row w-[40%]"
                  htmlFor="Input"
                  title={`The number of units of ${
                    itemList.productName ? itemList.productName : "product"
                  } produced`}
                >
                  Number Of Units
                  <BsInfoCircle className=" w-[15%] mt-0.5 opacity-70" />
                </label>

                <input
                  type="number"
                  className="mt-2 mb-2 w-[90%] h-auto border-b-2 border-b-black text-sm  placeholder:pb-2 outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Eg. 50/-"
                  name="quantity"
                  onKeyDown={removeCharacter}
                  value={itemList.quantity}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-evenly w-[100%] h-[7vh] xl:mt-4 mt-3 ">
            <button
              className={`outline-none h-auto bg-[#34CD3A] relative font-[Source-Sans-Pro-Semi] rounded-full p-2 text-lg pl-3 pr-3 pt-3 w-[50%] text-center align-middle ${
                itemList.productName &&
                itemList.fixedCost &&
                itemList.variableCost &&
                (itemList.pricePerUnit || itemList.quantity)
                  ? " cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-30"
              } 
              `}
              onClick={inputHandler}
            >
              Calculate
            </button>
            <button
              className={`h-[6.5vh] outline-none bg-[#FE5B00] justify-center items-center rounded-[100%] relative flex w-[12.5%] ${
                itemList.productName ||
                itemList.fixedCost ||
                itemList.variableCost ||
                itemList.pricePerUnit ||
                itemList.quantity
                  ? " cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-30"
              }  `}
              id="reload-btn"
              onClick={clearInputs}
            >
              <Image
                src={Reload}
                width={15}
                height={15}
                alt="Reload"
                id="reload"
                className={`outline-none 
                  `}
              />
            </button>
          </div>
        </div>
      </div>
      <div>
        <CurrencyPopUp
          myCurrencySymbol={setCurrencySymbol}
          myCurrencyId={setCurrencyId}
          closeCurrencyPopUp={() => setOpenCurrencyDialog(false)}
          openCurrency={openCurrencyDialog}
          onCurrencyChange={handleCurrencyChange}
          onCyrrencySymbol={handleCurrencySymbolChange}
        />
      </div>
    </>
  );
};

export default InputTab;
