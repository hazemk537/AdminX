import React, { useEffect, useState } from "react";
import { Bullet, Column } from "@ant-design/plots";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";  
import arTranslations from './locales/ar.json'

const paletteSemanticRed = "#F4664A";
const brandColor = "#5B8FF9";
//solve asynchronous problems!  to inssure toprated is not null and having needed data

  function findKeyByValue(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
  }
function Category() {
  const {t}=useTranslation()

  const [topRated, setTopRated] = useState([]);
  const [topSold, setTopSold] = useState([]);

  let { catid } = useParams();

    //ifthe lang is ar so --> change the language to english before using use params

  const translatedString = catid
  const translationKey = findKeyByValue(arTranslations, translatedString);

  async function hack() {
    const data = await JSON.parse(localStorage.getItem("productsWithSold"));
    if (data) {
            let filtered = data.filter((item) => item.category === `${translationKey}` );
            let topRated = filtered.sort((a, b) => b.rating - a.rating).slice(0, 10);
            let topSold = filtered.sort((a, b) => b.sold - a.sold).slice(0, 10);


      return {topRated,topSold};
    }
    return [];
  }


  useEffect(() => {
    hack().then((data)=>{setTopRated(data.topRated);setTopSold(data.topSold)});//TODO revise hooks uses 
  }, [catid]);//depend on route parameters to run useeffect after first mount to Category component

  const Ratingconfig = {
    data: topRated,
    xField: "title",
    yField: "rating",
    seriesField: "",
    color: ({ type }) => {
      if (type === "10-30分" || type === "30+分") {
        return paletteSemanticRed;
      }
      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
  };

  const SoldConfig = {
    data: topSold,
    xField: "title",
    yField: "sold",
    seriesField: "",
    color: ({ type }) => {
      if (type === "10-30分" || type === "30+分") {
        return paletteSemanticRed;
      }
      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
  };

  const Stockconfig = {
    data:topSold,
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    xField: 'title',
    color: {
      range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
      measure: '#5B8FF9',
      target: '#39a3f4',
    },
    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    // 自定义 legend
   
  };
   
  return (
    <div className="statistics">
      <div className="CategoryStats">
        <h1>{t("highestRatedStat")}{t("inCategory")} <Tag bordered={false} color ="blue" > {catid} </Tag></h1>
        <Column {...Ratingconfig} />
        <div>
          <h1>{t("highestSoldStat")}{t("inCategory")} <Tag bordered={false} color ="blue" > {catid} </Tag></h1>
        <Column {...SoldConfig} />
        </div>

        <div>
        <h1>{t("lowestStockStat")}{t("inCategory")}<Tag bordered={false} color ="blue" > {catid}</Tag></h1>
      <Bullet {...Stockconfig} />;
      </div>




      </div>
    </div>
  );
}

export default Category;
