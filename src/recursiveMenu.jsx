// _antd.js

import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export const renderMenuItems = items => {
  return items.map(item => {
    if (item.children) {
      return (
        <SubMenu key={item.key} title={item.label}>
          {renderMenuItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.key}>
        <Link to={item.to}>{item.label}</Link>
      </Menu.Item>
    );
  });
};