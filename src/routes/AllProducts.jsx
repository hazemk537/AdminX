import React, { useEffect, useState } from "react";
import { Bullet, Column } from "@ant-design/plots";
import { useTranslation } from "react-i18next";

const paletteSemanticRed = "#F4664A";
const brandColor = "#5B8FF9";

//solve asynchronous problems!  to inssure toprated is not null and having needed data



function Summary() {
  const {t,i18n}=useTranslation()
  const [lng,setLng]=useState()
  let x=JSON.parse(localStorage.getItem("rtl"))

  const [topRated, setTopRated] = useState([]);
  const [topSold, setTopSold] = useState([]);
  async function hack() {

    const data = await JSON.parse(localStorage.getItem("productsWithSold"));
    if (data) { 
      const rating=t("rating")
      const sold=t("sold")
      const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 10);
      let topSold = data.sort((a, b) => b.sold - a.sold).slice(0, 10);
  
      return { topRated, topSold };
    }
    return [];
  }

  useEffect(() => {
    console.log("e")
    hack().then((data) => {
      setTopRated(data.topRated);
      setTopSold(data.topSold);
    }); //TODO revise hooks uses
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Ratingconfig = {
    data: topRated,
    xField: t("title"),
    yField: t("rating"),
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
    xField: t("title"),
    yField: t("sold"),
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
    measureField: t('measures'),
    rangeField: t('ranges'),
    targetField: t('target'),
    xField: t('title'),
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
      <div className="RatingPie">
        <h1>{t("highestRatedStat")}</h1>
        <Column {...Ratingconfig} />
        <h1>{t("highestSoldStat")}</h1>

        <Column {...SoldConfig} />
      </div>
      <div>
        <h1>{t("lowestStockStat")}</h1>
      <Bullet {...Stockconfig} />;
      </div>
      
    </div>
  );
}

export default Summary;


