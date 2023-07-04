import UserTable from '../UserTable';
// 1> fetch data 
//Done 2> edit table v1  
// 3> add actions to extend table
// 4>  add row number

function Users() {
    
        return (
            <>
            <UserTable/>
            </>
  )
}

export default Users


fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);