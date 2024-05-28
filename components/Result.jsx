import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfContent from "./pdf/pdfContent";
import LinearChart from "./LinearChart";
const Result = ({
  productName,
  fixedCost,
  variableCost,
  pricePerUnit,
  quantity,
  setResult,
  currencyId = "INR",
  inputTab,
  currencySymbol,
  sRevenue,
}) => {
  const bepUnit = () => {
    const result = fixedCost / (Number(pricePerUnit) - Number(variableCost));
    return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
  };
  const totalCost = Number(fixedCost) + Number(variableCost);

  const unitValue = bepUnit();
  const salesRevenueUnit = unitValue * pricePerUnit;

  const bepPrice = () => {
    const result = (Number(fixedCost) + Number(variableCost)) / quantity;
    return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
  };

  const sellingPriceValue = bepPrice().toString();
  const salesRevenuePrice =
    Number(fixedCost) + Number(variableCost) * Number(quantity);
  const [isClient, setIsClient] = useState(false);

  const salesRevenue =
    parseInt(quantity) > 0
      ? parseInt(salesRevenuePrice)
      : parseInt(salesRevenueUnit);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const breakEvenPoint = quantity == 0 ? unitValue : sellingPriceValue;
  const handleResult = () => {
    setResult(breakEvenPoint);
    sRevenue(salesRevenue);
  };
  return (
    <>
      {isClient ? (
        <div className="bg-white w-full lg:h-[62vh] md:h-[65vh] rounded-3xl block justify-center items-center 
        shadow-lg shadow-slate-700/40 lg:mr-0 md:mr-4 mr-0">
          <div className="pl-[1rem]">
            <h1 className="pl-[2.5rem] font-bold text-[30px] font-sans relative w-full">
              BEP Calculation Output
            </h1>
          </div>

          <div className="flex flex-col md:flex-row w-full">
            {/* Left chart side */}
            <div className="xl:w-[70%] lg:w-[65%] md:w-[70%] w-full mr-[0.5%] ml-2 h-[55vh] relative block">
              <LinearChart
                fixedCost={fixedCost}
                totalCost={totalCost}
                salesRevenue={salesRevenue}
                breakEvenPoint={breakEvenPoint}
                currencySymbol={currencySymbol}
                inputTab={inputTab}
              />
            </div>
            {/* Right result Side */}
            <div className="xl:w-[30%] lg:w-[35%] md:w-[30%] w-full h-[55vh] flex flex-col justify-start items-center">
              <div className="w-[85%] bg-[#EEEEEE] rounded-lg">
                <h1 className="text-lg font-bold pl-5 w-full relative ">
                  Result
                </h1>
                <p className="text-[13px] font-[Source-Sans-Pro-Medium] pl-5 text-justify w-full break-words pr-5 p-3">
                  Enter your fixed costs, Input variable cost per unit, Specify
                  the selling price per unit. Breakeven point is where total
                  revenue equals total costs. below this point, you incur
                  losses; above, you make profits.
                </p>
              </div>

              <div className="bg-[#EEEEEE] w-[85%] h-[17vh] mt-[5%] rounded-lg justify-center flex flex-col relative ">
                <p className="font-[Source-Sans-Pro-Medium] mt-[1%] flex flex-col items-center text-sm">
                  Your Break Even Point is:
                </p>
                <p className="text-center font-[Source-Sans-Pro] text-[25px] leading-8 font-bold">
                  {breakEvenPoint}(
                  {inputTab === "unit" ? "Unit" : `${currencyId}`})
                </p>
                <p className="font-[Source-Sans-Pro-Medium] flex flex-col items-center text-sm">
                  Your Sales Revenue is:
                </p>
                <p className="text-center font-[Source-Sans-Pro] text-[25px] leading-8 font-bold">
                  {salesRevenue} ({currencyId}){handleResult()}
                </p>
              </div>
              <div className="w-[85%] h-[8vh] flex justify-center items-center relative mt-2">
                {fixedCost && variableCost && (pricePerUnit || quantity) ? (
                  <PDFDownloadLink
                    className="w-full"
                    document={
                      <PdfContent
                        fixedCost={fixedCost}
                        variableCost={variableCost}
                        pricePerUnit={pricePerUnit}
                        quantity={quantity}
                        result={breakEvenPoint}
                        salesRevenue={salesRevenue}
                        totalCost={totalCost}
                        currencyId={currencyId}
                        productName={productName}
                      />
                    }
                    fileName={`${productName}.pdf`}
                  >
                    <button
                      className={`text-white bg-[#E6393B] w-full p-1.5 rounded-lg font-[Source-Sans-Pro] text-2xl ${
                        fixedCost && variableCost && (pricePerUnit || quantity)
                          ? "opacity-100"
                          : "cursor-not-allowed opacity-30"
                      } `}
                    >
                      Download
                    </button>
                  </PDFDownloadLink>
                ) : (
                  <button
                    className={`text-white bg-[#E6393B] w-full p-1.5 rounded-lg font-[Source-Sans-Pro] text-2xl ${
                      fixedCost && variableCost && (pricePerUnit || quantity)
                        ? "opacity-100"
                        : "cursor-not-allowed opacity-30"
                    } `}
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Result;
