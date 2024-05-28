import Header from "../components/Header";
import InputTab from "../components/InputTab";
import Result from "../components/Result";
import TopContainer from "../components/TopContainer";
import Feedback from "../components/Feedback";
import { useEffect, useState } from "react";
import History from "../components/History";

export default function Home() {
  const [fixedCost, setFixedCost] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [currencyId, setCurrencyId] = useState("INR");
  const [inputTab, setInputTab] = useState("");
  const [result, setResult] = useState(0);
  const [sRevenue, setSRevenue] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("calculate");
  const [selectedHistory, setSelectedHistory] = useState({
    hProductName: "",
    hFixedCost: "",
    hVariableCost: "",
    hPricePerUnit: "",
    hQuantity: "",
    hResult: 0,
    hSalesRevenue: 0,
  });
  const handleProductName = (value) => {
    setProductName(value);
  };
  const handleFIxedCost = (value) => {
    setFixedCost(value);
  };
  const handleVariableCost = (value) => {
    setVariableCost(value);
  };
  const handlePricePerUnit = (value) => {
    setPricePerUnit(value);
  };
  const handleQuantity = (value) => {
    setQuantity(value);
  };
  const handleCurrencyChange = (currencyId) => {
    setCurrencyId(currencyId);
  };
  const handleTabChange = (tab) => {
    setInputTab(tab);
  };
  const handleCurrencySymbol = (symbol) => {
    setCurrencySymbol(symbol);
  };
  useEffect(() => {
    console.log("Updated history:", history);
  }, [history]);

  useEffect(() => {
    console.log("Selected History is ", selectedHistory);
  }, [selectedHistory]);

  useEffect(() => {
    const hasInput =
      (productName || fixedCost || variableCost || pricePerUnit || quantity) &&
      result;
    if (hasInput) {
      const historyInputs = {
        hProductName: productName,
        hFixedCost: fixedCost,
        hVariableCost: variableCost,
        hPricePerUnit: pricePerUnit,
        hQuantity: quantity,
        hResult: result,
        hSalesRevenue: sRevenue,
      };
      setHistory([...history, historyInputs]);
    }
  }, [productName, fixedCost, variableCost, pricePerUnit, quantity, result]);

  useEffect(() => {
    setProductName(selectedHistory.hProductName);
    setFixedCost(selectedHistory.hFixedCost);
    setVariableCost(selectedHistory.hVariableCost);
    setPricePerUnit(selectedHistory.hPricePerUnit);
    setQuantity(selectedHistory.hQuantity);
    setResult(selectedHistory.hResult);
    setSRevenue(selectedHistory.hSalesRevenue);
    if (selectedHistory.hQuantity === "") {
      setInputTab("unit");
    } else setInputTab("price");
  }, [selectedHistory]);

  return (
    <div className="w-full">
      <div>
        <Header />
      </div>
      <div className="absolute h-[57vh] bg-[#FCDD9B] w-[100%]">
        <div className="relative block w-[100%] lg:h-[22vh] sm:h-[25vh] h-[28vh] sm:mb-3 mb-10">
          <TopContainer tab={tab} setTab={setTab} />
        </div>
        <div
          className={`flex lg:flex-row flex-col justify-center w-full mt-5 mb-10 ${
            tab === "calculate" ? "flex" : "hidden"
          }`}
        >
          <div
            className="lg:h-[62vh] md:h-[60vh] h-[65vh] xl:w-[30%] md:w-[50%] sm:w-[55%] w-[90%] xl:ml-[0] lg:ml-[2%] 
          md:left-[5%] lg:left-0 sm:ml-[20%] ml-[6%] flex relative md:justify-center md:items-center md:mb-0 mb-5"
          >
            <InputTab
              ProductName={handleProductName}
              FixedCost={handleFIxedCost}
              VariableCost={handleVariableCost}
              PricePerUnit={handlePricePerUnit}
              Quantity={handleQuantity}
              currencyChange={handleCurrencyChange}
              tabChange={handleTabChange}
              parentCurrencyId={currencyId}
              currencySymbolChange={handleCurrencySymbol}
              tab={tab}
              selectedHistory={selectedHistory}
              inputTab={inputTab}
            />
          </div>

          <div
            className="xl:w-[65%] lg:w-[100%] h-auto w-[95%] lg:ml-[0] md:ml-[5%] sm:ml-[5%] 
            ml-[2%] flex relative md:justify-center items-start md:items-center lg:mr-[3%] mr-[5%]
            md:mb-0 mb-6
            "
          >
            <Result
              productName={productName}
              fixedCost={fixedCost}
              variableCost={variableCost}
              pricePerUnit={pricePerUnit}
              quantity={quantity}
              setResult={setResult}
              currencyId={currencyId}
              inputTab={inputTab}
              currencySymbol={currencySymbol}
              sRevenue={setSRevenue}
            />
          </div>
        </div>
        <div
          className={`flex lg:flex-row flex-col justify-center items-center w-full mt-10 mb-5 ${
            tab === "history" ? "flex" : "hidden"
          }`}
        >
          <History
            historyData={history}
            tab={setTab}
            selectedHistory={setSelectedHistory}
          />
        </div>
        <div className="bottom-0 w-full md:h-[9vh] h-auto mb-1 relative">
          <Feedback />
        </div>
      </div>
    </div>
  );
}
