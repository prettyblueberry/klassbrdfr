import {uniqueId} from "utils";

export default [
  {
    page: 1,
    items: [
      {
        id: uniqueId(),
        package: "Basic Package",
        date: new Date(),
        credits: 100,
        price: 500,
        priceCurrency: "€",
      },
      {
        id: uniqueId(),
        package: "Comfort Package",
        date: new Date(),
        credits: 100,
        price: 600,
        priceCurrency: "€",
      },
      {
        id: uniqueId(),
        package: "Eco Package",
        date: new Date(),
        credits: 100,
        price: 300,
        priceCurrency: "$",
      },
      {
        id: uniqueId(),
        package: "Premium Package",
        date: new Date(),
        credits: 100,
        price: 100,
        priceCurrency: "$",
      },
    ]
  },
  {
    page: 2,
    items: [
      {
        id: uniqueId(),
        package: "Basic Package",
        date: new Date(),
        credits: 600,
        price: 600,
        priceCurrency: "€",
      },
      {
        id: uniqueId(),
        package: "Comfort Package",
        date: new Date(),
        credits: 700,
        price: 700,
        priceCurrency: "€",
      },
      {
        id: uniqueId(),
        package: "Eco Package",
        date: new Date(),
        credits: 300,
        price: 400,
        priceCurrency: "$",
      },
      {
        id: uniqueId(),
        package: "Premium Package",
        date: new Date(),
        credits: 700,
        price: 800,
        priceCurrency: "€",
      },
    ]
  },
  {
    page: 3,
    items: [
      {
        id: uniqueId(),
        package: "Basic Package",
        date: new Date(),
        credits: 600,
        price: 300,
        priceCurrency: "$",
      },
      {
        id: uniqueId(),
        package: "Comfort Package",
        date: new Date(),
        credits: 800,
        price: 400,
        priceCurrency: "€",
      },
      {
        id: uniqueId(),
        package: "Eco Package",
        date: new Date(),
        credits: 900,
        price: 100,
        priceCurrency: "€",
      },
      {
        id: uniqueId(),
        package: "Premium Package",
        date: new Date(),
        credits: 1000,
        price: 200,
        priceCurrency: "$",
      },
    ]
  },
  
]