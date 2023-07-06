import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
//access admin or ordinary and modify access 
//download data to use it locally
let usersTemp
const UserTable = () => {

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((response) => response.json())
      .then((data) => {
         usersTemp = data.users.map((item) => ({
          ...item,
          tags:item.username ==='atuny0'?['Admin']:['User']
        }));
      })
      .catch((error) => {
        const errorResponse = new Response(`Failed to fetch customer data: ${error.message}`, {
          status: 400,
        });
        throw errorResponse;
      });
  }, []);
  const cachedUsers=useMemo(() => usersTemp, []);
  

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
              width: 90,
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      ...getColumnSearchProps('id'),
    },{
      title: 'First Name',
      dataIndex: 'firstname',//`${name.firstname}`,
      key: 'firstname',
      width: '30%',
      ...getColumnSearchProps('firstname'),
    },{
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      width: '30%',
      ...getColumnSearchProps('lastname'),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      // sorter: (a, b) => a.address.length - b.address.length,//
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      width: '20%',
      ...getColumnSearchProps('password'),
    },{
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag === 'Admin' ? 'geekblue' : 'green';
            
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      
      
    },{
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Link>Delete</Link>,// TODO call delete api using post 
    },

  ];
  return <Table columns={columns} dataSource={cachedUsers} />;
};
export default UserTable;
