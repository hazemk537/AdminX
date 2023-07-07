import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

let toMemo
function handleData(product){
return (
  {
    ...product,
    sold: Math.floor(Math.random() * 99991) + 10 // generates a random number between 10 and 100000
    ,target:40
    ,threshold:10,
    max:100
    ,ranges: [product.threshold, product.max]
    ,measures: [product.stock]
    
  }


)
}
const ProductTable = () => {
  const [productsWithSold,setproductsWithSold]=useState()
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
    .then(res => res.json())
    .then(jsonData => {  
      toMemo=jsonData.products.map(handleData)
      setproductsWithSold(toMemo)
      localStorage.setItem('productsWithSold',JSON.stringify(toMemo))  })
    .catch((error) => {
        const errorResponse = new Response(`Failed to fetch Products data: ${error.message}`, {
          status: 400,
        });
        throw errorResponse;
      });
  }, []);

 // todo try to make the array not changes donot work
  // const memoizationHack=useMemo((()=>returnFakeState(productsWithSold),[productsWithSold]))
  // 
  // TODO const cached=useMemo(()=>toMemo,[]) not work 

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,//Todo custom your chart depend on your given table
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
          color: filtered ? '#1677ff' : undefined,
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
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      ...getColumnSearchProps('title'),
    },
   
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Rating',/// statistics
      dataIndex: 'rating',
      key: 'rating',
      width: '10%',
      ...getColumnSearchProps('rating'),
    },
    {
      title: 'Stock',//stock low levels
      dataIndex: 'stock',
      key: 'stock',
      width: '10%',
      ...getColumnSearchProps('stock'),
    },
    {
      title:'Sold',
      dataIndex: 'sold',
      key: 'sold',
      width: '10%',
      ...getColumnSearchProps('sold'),
      
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      width: '15%',
      ...getColumnSearchProps('brand'),
    },{
      title: 'Threshold',
      dataIndex: 'threshold',
      key: 'threshold',
      width: '15%',
      ...getColumnSearchProps('threshold'),
    },{
      title: 'Max',
      dataIndex: 'max',
      key: 'max',
      width: '15%',
      ...getColumnSearchProps('max'),
    },{
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
      width: '15%',
      ...getColumnSearchProps('target'),
    },

    {
      title: 'Category',//statistic upon categories
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      ...getColumnSearchProps('category'),
    }, {
      title: 'Category',//statistic upon categories
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Link>Delete</Link>,// TODO Add and delete api using forms 
    },

  ];
  //products of solds is array so should memoized to enabe compare by value
  //Todo i donot know  why memoization not work
  //  const memoizedTable=useMemo(()=><Table columns={columns} dataSource={toMemo } />,[toMemo])
  // return memoizedTable;

  return <Table columns={columns} dataSource={toMemo }/>
};
export default ProductTable
