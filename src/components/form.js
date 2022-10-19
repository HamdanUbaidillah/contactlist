import { useState,useEffect } from "react";
import { uid } from "uid";
import axios from "axios";
import List from "./list";
import "../App.css";

const Form = () => {
  const [contact, setContact] = useState([]);
  const [formData, setFormData] = useState({})
  const [isUpdate, setIsUpdate] = useState({id: null, status: false})

  useEffect(() => {
  // fetch data
    axios({
      method: "get",
      url : `${process.env.REACT_APP_BASEURL}`
    }).then(res => {
      setContact(res.data ?? [])
    })
  },[])


  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = [...contact];

    if(formData.name.length === 0){
      return false
    }
    if(formData.telp.length === 0){
      return false
    }
    // update contact
    if(isUpdate.status) {
      data.forEach((contact) => {
        if(contact.id === isUpdate.id) {
          contact.name = formData.name
          contact.telp = formData.telp
        }
      })

      axios.put(`${process.env.REACT_APP_BASEURL}/${isUpdate.id}`, {
        name: formData.name,
        telp: formData.telp
      })
    } else {
      // add contact
      let newData = { id: uid(), name: formData.name, telp: formData.telp }
      data.push(newData)
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}`,
        data: {newData}
      })
    } 
    setIsUpdate({id: null, status: false})
    setContact(data)
    setFormData({name: "", telp: ""})
  }
  // find data yng mau diedit
  const handleEdit = (id) => {
    let data = [...contact]
    let foundData = data.find((contact) => contact.id === id)
    setFormData({name: foundData.name, telp: foundData.telp})
    setIsUpdate({id: id, status: true})
  }
  // delete data
  const handleDelete = (id) => {
    let data = [...contact]
    let filterData = data.filter(contact => contact.id !== id)
    axios({
      method: "delete",
      url :`${process.env.REACT_APP_BASEURL}/${id}`,
    })
    setContact(filterData)
  }

  return (
    <section className="bg-white border md:w-1/4 border-gray-300 p-11 rounded-lg">
      <h1 className="font-semibold text-3xl mb-3 text-center">Contact list react</h1>
      <section>
        <form onSubmit={handleSubmit} action="contact">
          <section className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input 
              onChange={handleChange} 
              value={formData.name} 
              className="border-b-2 pb-1 outline-none focus:border-green-400 transition-all" 
              type="text" 
              placeholder="Enter Name" 
              name="name" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="number">Number</label>
              <input 
              onChange={handleChange} 
              value={formData.telp} 
              className="border-b-2 pb-1 outline-none focus:border-green-400 transition-all" 
              type="number"
              placeholder="Enter Number" 
              name="telp" />
            </div>
          </section>
          <button type="submit" className="bg-green-500 hover:bg-green-600 transition-all px-3 py-2 rounded-md w-full text-white font-semibold mt-4">
            Save contact
          </button>
        </form>
      </section>
      <List data={contact} handleEdit={handleEdit} handleDelete={handleDelete}  />
    </section>
  );
};

export default Form;
