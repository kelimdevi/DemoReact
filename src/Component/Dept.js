import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

function Dept() {
  const [deptTable, setDeptTable] = useState([]);
  const [data, setData] = useState({ deptName: '', shortForm: '' });
  const { deptName, shortForm } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/department", data)
      .then(() => {
        alert("Department Added");
        getDepartment(); // Refresh the table after adding
      })
      .catch(err => console.log("error", err));
  };

  const getDepartment = () => {
    axios.get('http://localhost:8080/department')
      .then(res => setDeptTable(res.data))
      .catch(err => console.log("error", err));
  };

  useEffect(() => {
    getDepartment();
  }, [deptTable]);

  const columns = useMemo(() => [
    { Header: 'Department Name', accessor: 'deptName' },
    { Header: 'Short Form', accessor: 'shortForm' }
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: deptTable });

  return (
    <div>
      <center>
        <h2>Departments</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor='deptName'>Department Name:</label><br/>
          <input
            type='text'
            id='deptName'
            name='deptName'
            value={deptName}
            onChange={onChange}
          /><br />

          <label htmlFor='shortForm'>Short Form:</label><br/>
          <input
            type='text'
            id='shortForm'
            name='shortForm'
            value={shortForm}
            onChange={onChange}
          /><br />
          <button type='submit'>Add</button>
        </form>
      </center>

      <center>
        <div className='container mt-3'>
          <h3>Department Table</h3>
          <table {...getTableProps()} border="1" className="table table-striped">
            <thead className='con table table-striped'>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
}

export default Dept;
