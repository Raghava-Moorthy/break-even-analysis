import React from "react";
import {
  ChartComponent,
  Inject,
  LineSeries,
  BarSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  Legend,
  DataLabel,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { registerLicense } from "@syncfusion/ej2/base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtfdXRQQmhYV0x0X0o="
);

function LinearChart({
  fixedCost = 0,
  totalCost = 0,
  salesRevenue = 0,
  breakEvenPoint = 0,
  currencySymbol,
  inputTab,
}) {
  const reference = {
    fixedCost: [
      { X: 0, Y: 0 },
      {
        X: breakEvenPoint,
        Y: fixedCost,
        name: `Fixed Cost (${currencySymbol} ${fixedCost})`,
      },
    ],
    totalCost: [
      { X: 0, Y: 0 },
      {
        X: breakEvenPoint,
        Y: totalCost,
        name: `Total Cost ( ${currencySymbol} ${totalCost})`,
      },
    ],
    salesRevenue: [
      { X: 0, Y: 0 },
      {
        X: breakEvenPoint,
        Y: salesRevenue,
        name: `Sales Revenue ( ${currencySymbol} ${salesRevenue})`,
      },
    ],
    breakEvenPoint: [
      { X: 0, Y: 0 },
      {
        X: breakEvenPoint,
        Y: breakEvenPoint,
        name: `Break Even Point ( ${
          inputTab === "unit"
            ? breakEvenPoint + " Unit"
            : currencySymbol + " " + breakEvenPoint
        })`,
      },
    ],
  };

  let minAxis = fixedCost > 0 ? 0 : 1;
  return (
    <div className="h-[55vh] md:w-[100%] w-[95%] outline-none border-none">
      <ChartComponent
        className="font-[Roboto-Regular]"
        primaryXAxis={{ minimum: minAxis, valueType: "Category" }}
        title="Break Even Analysis"
        legendSettings={{ visible: true }}
        tooltip={{ enable: true }}
      >
        <Inject
          services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
        ></Inject>
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={reference.breakEvenPoint}
            xName="X"
            yName="Y"
            type="Line"
            name="Break Even Point"
            marker={{
              dataLabel: { visible: true, position: "Top", name: "name" },
              visible: true,
            }}
          ></SeriesDirective>
          <SeriesDirective
            dataSource={reference.fixedCost}
            xName="X"
            yName="Y"
            type="Line"
            name="Fixed Cost"
            marker={{
              dataLabel: { visible: true, position: "Top", name: "name" },
              visible: true,
            }}
          ></SeriesDirective>
          <SeriesDirective
            dataSource={reference.totalCost}
            xName="X"
            yName="Y"
            type="Line"
            name="Total Cost"
            marker={{
              dataLabel: { visible: true, position: "Top", name: "name" },
              visible: true,
            }}
          ></SeriesDirective>
          <SeriesDirective
            dataSource={reference.salesRevenue}
            xName="X"
            yName="Y"
            type="Line"
            name="Sales Revenue"
            marker={{
              dataLabel: { visible: true, position: "Top", name: "name" },
              visible: true,
            }}
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default LinearChart;
