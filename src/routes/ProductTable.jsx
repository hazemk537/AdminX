import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Spinner from "../components/Spinner";

import { useTranslation } from "react-i18next";
require("polyfill-object.fromentries");
let toMemo;

function handleData(product) {
  return {
    ...product,
    sold: Math.floor(Math.random() * 99991) + 10, // generates a random number between 10 and 100000
    target: 40,
    threshold: 10,
    max: 100,
    ranges: [product.threshold, product.max],
    measures: [product.stock],
  };

  
}

const ProductTable = () => {
  const { t } = useTranslation();
  const [productsWithSold, setproductsWithSold] = useState();
  let translationReady;
  function handleTranslation(obj) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        return [t(key), value];
      })
    );
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(
      "https://alrayademo-back.appssquare.com/api/admin/areas?skip=1&offset=1&q=ea",
      {
        headers: {
          Accept: "application/json",
          "X-Language": "en",
          Authorization: `Bearer ${token}`,
        },

      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("https://portfolio-api-xi-ecru.vercel.app/api/product?limit=30")
      .then((res) => res.json())
      .then((jsonData) => {
        toMemo = jsonData.products.map(handleData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        translationReady = toMemo.map(handleTranslation);
        console.log(toMemo)
        localStorage.setItem(
          "productsWithSold",
          JSON.stringify(translationReady)
        );
        setproductsWithSold(translationReady);
      })
      .catch((error) => {
        const errorResponse = new Response(
          `Failed to fetch Products data: ${error.message}`,
          {
            status: 400,
          }
        );
        throw errorResponse;
      });
  }, []);

  // todo try to make the array not changes donot work
  // const memoizationHack=useMemo((()=>returnFakeState(productsWithSold),[productsWithSold]))
  //
  // TODO const cached=useMemo(()=>toMemo,[]) not work

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  function deleteAction(ID){
    let id=t("id")
    let filtered=productsWithSold.filter((item)=>  item[id]!==ID)
    setproductsWithSold(filtered)
  
  
  
  }
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90, //Todo custom your chart depend on your given table
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: t("id"),
      dataIndex: t("id"),
      key: t("id"),
      width: "10%",
      ...getColumnSearchProps(t("id")),
    },
    {
      title: t("title"),
      dataIndex: t("title"),
      key: t("title"),
      width: "20%",
      ...getColumnSearchProps(t("title")),
    },

    {
      title: t("price"),
      dataIndex: t("price"),
      key: t("price"),
      width: "10%",
      ...getColumnSearchProps(t("price")),
    },
    {
      title: t("rating"), /// statistics
      dataIndex: t("rating"),
      key: t("rating"),
      width: "10%",
      ...getColumnSearchProps(t("rating")),
    },
    {
      title: t("stock"), //stock low levels
      dataIndex: t("stock"),
      key: t("stock"),
      width: "10%",
      ...getColumnSearchProps(t("stock")),
    },
    {
      title: t("sold"),
      dataIndex: t("sold"),
      key: t("sold"),
      width: "10%",
      ...getColumnSearchProps(t("sold")),
    },
    {
      title: t("brand"),
      dataIndex: t("brand"),
      key: t("brand"),
      width: "15%",
      ...getColumnSearchProps(t("brand")),
    },
    {
      title: t("threshold"),
      dataIndex: t("threshold"),
      key: t("threshold"),
      width: "15%",
      ...getColumnSearchProps(t("threshold")),
    },
    {
      title: t("max"),
      dataIndex: t("max"),
      key: t("max"),
      width: "15%",
      ...getColumnSearchProps(t("max")),
    },
    {
      title: t("target"),
      dataIndex: t("target"),
      key: t("target"),
      width: "15%",
      ...getColumnSearchProps(t("target")),
    },

    {
      title: t("category"), //statistic upon categories
      dataIndex: t("category"),
      key: t("category"),
      width: "15%",
      ...getColumnSearchProps(t("category")),
    },
    {
      title: t("action"),
      dataIndex: "",
      key: t("action"),
      render: (_, record) => (
        <>
          <Button
            onClick={() => {let id=t("id");deleteAction(record[id])

            }}
          >
            {t("delete")}
          </Button>
        </>
      ), // TODO Add and delete api using forms
    },
  ];
  //products of solds is array so should memoized to enabe compare by value
  //Todo i donot know  why memoization not work
  //  const memoizedTable=useMemo(()=><Table columns={columns} dataSource={toMemo } />,[toMemo])
  // return memoizedTable;
  //load once data is available
  //use react States no
  //TODO  not works return (productsWithSold && <Table columns={columns} dataSource={translationReady } /> )
  if (!productsWithSold) return <Spinner />;
  return (
    <Table
      style={{ marginTop: "20px" }}
      columns={columns}
      dataSource={productsWithSold}
      pagination={{ pageSize: 6 }}
    />
  );
};
export default ProductTable;
