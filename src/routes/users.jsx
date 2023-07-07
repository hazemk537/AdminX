import { Suspense } from 'react';
import UserTable from '../UserTable';
import { Spin } from 'antd';


function Users() {
    
        return (
            <>
            <Suspense falling={<Spin/>}>
            <UserTable/>
            </Suspense>
            </>
  )
}

export default Users
