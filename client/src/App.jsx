import axios from "axios"
import { useEffect, useState } from "react"
function App() {
  const [users, setUsers] = useState([])
  const [user, SetUser] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState('')
  const [EdiMode, setEditMode] = useState(false)
  const [Id, setId] = useState("")
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(data => data.data)
      .then(data => setUsers(data))
  }, [users]);


  const AddUser = async (e) => {
    e.preventDefault()
    const user = {
      name: name,
      email: email,
      age: Number(age)
    }

    if (!EdiMode) {
      // Add error handling to catch potential issues with the request
      await axios.post(`http://localhost:5000/users`, user)
        .then(response => {
          console.log('User data updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating user data:', error);
        });
    }

    else {
      await axios.patch(`http://localhost:5000/users/${Id}`, user)
        .then(response => console.log(response.data))
    }
    setEditMode(false)
    setName('')
    setEmail('')
    setAge('')
    setId('')
  }

  const handleDeleteUser = async (e, user) => {
    e.preventDefault()
    await axios.delete(`http://localhost:5000/users/${user._id}`)
      .then(response => console.log(response.data))
  }

  const handleEditUser = async (e, user) => {
    setEditMode(true)
    e.preventDefault()
    setName(user.name)
    setEmail(user.email)
    setAge(user.age)
    setId(user._id)
  }
  return (
    <div className="flex flex-col mx-14 items-center mt-[40px]">
      <div className="flex flex-col  md:w-[60%] w-full  overflow-hidden gap-3 ">
        {users.map(user => (
          <div key={user._id} className="flex w-full justify-between bg-neutral-200 p-2 rounded-lg shadow-md">
            <div className="flex flex-col">
              <h1 className=""><span className="font-bold">UserName:</span> {user.name}</h1>
              <p className="text-[14px] "><span className="font-bold">Email: </span> {user.email}</p>
              <p className="text-[14px] "><span className="font-bold">Age: </span> {user.age}</p>
            </div>
            <div className="flex flex-col justify-between">
              <button onClick={(e) => handleEditUser(e, user)} className="bg-blue-500 text-white font-bold text-[12px] px-2 py-[3px] rounded-md shadow-md">Edit</button>
              <button onClick={(e) => handleDeleteUser(e, user)} className="bg-red-500 text-white font-bold text-[12px] px-2 py-[3px] rounded-md shadow-md">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => AddUser(e)} className="md:w-[60%] w-full mb-[50px] flex flex-col mt-12 space-y-4 px-4">
        <div className="flex  items-center">
          <label htmlFor="name" className="font-bold  w-[60px]" > Name :</label>
          <input value={name} required onChange={(e) => setName(e.target.value)} id='name' type='text' placeholder='Name' className="px-1 py-1 bg-gray-200 flex-1 border-neutral-600 border rounded" />
        </div>
        <div className="flex  items-center">
          <label className="font-bold  w-[60px]" > Email :</label>
          <input value={email} required onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' className="px-1 py-1 bg-gray-200 flex-1 border-neutral-600 border rounded" />
        </div>
        <div className="flex items-center ">
          <label className="font-bold  w-[60px]" > Age :</label>
          <input value={age} required onChange={(e) => setAge(e.target.value)} type='number' placeholder='Age' className="px-1 py-1 bg-gray-200 flex-1 border-neutral-600 border rounded" />
        </div>

        <button type="submit" className="bg-green-500 text-white font-bold p-1 rounded-md" >{EdiMode ? "Update Selected User" : 'Add New User'}</button>
      </form>
    </div>
  )
}

export default App
