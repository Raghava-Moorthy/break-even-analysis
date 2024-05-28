import { Document, Page, View, Text } from "@react-pdf/renderer";
import Styles from "./../../utils/styles";
const PdfContent = ({
  fixedCost,
  variableCost,
  pricePerUnit,
  quantity,
  result,
  salesRevenue,
  totalCost,
  currencyId,
  productName,
}) => {
  const price_quantity =
    pricePerUnit != ""
      ? `Price per unit - Rs: ${pricePerUnit}`
      : `No. of Units - Rs: ${quantity}`;
  let date = new Date();

  return (
    <>
      <Document>
        <Page>
          <View>
            <View style={Styles.headerView}></View>
            <View style={Styles.contentView}>
              <View style={Styles.titleView}>
                <View style={Styles.toolnameView}>
                  <Text style={Styles.toolname}>Break Even Analysis</Text>
                </View>
                <View style={Styles.datetimeView}>
                  <Text style={Styles.date}>
                    Date :
                    {date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}
                    .
                    {date.getMonth() + 1 > 9
                      ? date.getMonth() + 1
                      : "0" + (date.getMonth() + 1)}
                    .{date.getFullYear()}
                  </Text>
                  <Text style={Styles.time}>
                    Time :
                    {date.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Text>
                </View>
              </View>
              <View style={Styles.inputView}>
                <Text style={Styles.inputvalue}>
                  Product Name : {productName}
                </Text>
                <View style={Styles.inputvalueView}>
                  <Text style={Styles.inputvalue}>Input Values : </Text>
                </View>
                <View style={Styles.valuesView}>
                  <Text style={Styles.fc}>Fixed Cost - Rs:{fixedCost}</Text>
                  <Text style={Styles.vc}>
                    Variable cost per unit - Rs:{variableCost}
                  </Text>
                  <Text style={Styles.pp}>{price_quantity}</Text>
                </View>
              </View>
              <View style={Styles.paraView}>
                <Text style={Styles.paragraph}>
                  Finding your break-even point answers one of the most
                  important questions for any business: when will it start{" "}
                  {"\n"}making a profit? The break-even point calculates the
                  number of units (or the amount of sales) that an {"\n"}
                  organization needs to make for cost to equal income.
                </Text>
              </View>
              <View style={Styles.resultView}>
                <Text style={Styles.result}>Your Break Even Point is:</Text>
                <Text style={Styles.output1}>{result} (Unit)</Text>
              </View>
              <View style={Styles.resultView}>
                <Text style={Styles.result}>Your Sales Revenue is:</Text>
                <Text style={Styles.output2}>
                  {salesRevenue} ({currencyId})
                </Text>
              </View>
              <View style={Styles.chartView}>{/* Chart component */}</View>
              <View style={Styles.chartdescView}>
                <Text style={Styles.desc}>
                  Break-Even Point (in units): The number of units that need to
                  be sold to cover all costs.
                </Text>
                <Text style={Styles.desc}>
                  Break-Even Point (in sales revenue): The amount of money the
                  business needs to generate tocover costs.
                </Text>
                <Text style={Styles.desc}>
                  Thus,the breakeven point for the given value, The point where
                  Sales Revenue and Total Cost meet is called as breakeven
                  point. Fixed Cost Remains Same.
                </Text>
              </View>
            </View>
            <View style={Styles.footerView}>
              <Text style={Styles.footerpara}>
                This document generate by 72business Tools product @ BPC
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};
export default PdfContent;
