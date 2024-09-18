import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Section = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [sectionsTable, setSectionsTable] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/department')
            .then(response => {
                console.log(response.data);
                const uniqueDepartments = getUniqueDepartments(response.data);
                setDepartments(uniqueDepartments);
            })
            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    const getUniqueDepartments = (data) => {
        return data.filter((dept, index, self) =>
            index === self.findIndex(d => d.id === dept.id)
        );
    };

    const handleSectionChange = (e) => {
        setSectionName(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (sectionName && selectedDepartment) {
            const sectionData = {
                sectionName,
                departmentId: parseInt(selectedDepartment)
            };
            axios.post("http://localhost:8080/sections", sectionData)
                .then(() => {
                    const selectedDeptName = departments.find(dept => dept.id === parseInt(selectedDepartment)).deptName;
                    setSectionsTable(prevSections => [...prevSections, { sectionName, departmentName: selectedDeptName }]);
                    alert("Section Added");
                })
                .catch(err => console.error("Error adding section:", err));

            setSectionName('');
            setSelectedDepartment('');
        }
    };

    return (
        <div>
            <center>
                <h2>Section Form</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="section">Section Name:</label><br/>
                    <input 
                        type="text" 
                        id="section" 
                        value={sectionName} 
                        onChange={handleSectionChange} 
                        required 
                    /><br/>

                    <label htmlFor="department">Department:</label><br/>
                    <select id="department" value={selectedDepartment} onChange={handleDepartmentChange} required>
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>
                                {dept.deptName}
                            </option>
                        ))}
                    </select><br/><br/>

                    <button type="submit">Add Section</button>
                </form>

                <h3>Sections Table</h3>
                <div className='con m-5 p-5'> 
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Section</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectionsTable.map((section, index) => (
                                <tr key={index}>
                                    <td>{section.sectionName}</td>
                                    <td>{section.departmentName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </center>
        </div>
    );
};

export default Section;
