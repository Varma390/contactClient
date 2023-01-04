import { createContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const context = createContext();

export const ContextProvider = (props) => {
   const [contacts, setContacts] = useState([]);
  const [checkedArr, setCheckedArr] = useState([]);
  const navigate = useNavigate();

//login
  const signInUser = async(loginData)=>{
    await axios.post("https://batchcontactserver.onrender.com/login", loginData)
      .then((res) => {
        console.log(res.data.Token);
        if (res.data.status === "Success") {
          localStorage.setItem("token", res.data.Token)
          alert("Sign In Sucessull!")
          navigate("/contacts");
          document.location.reload();
        }
        if (res.data.status === "Unregistered") {
          alert("User not Registered !")
        }
        if (res.data.message === "Invalid") {
          alert("Invalid Crediential!")
        }
      })
      .catch(err => { console.log(err) })
  }

//signup
  const signUpUser = (userData)=>{
    axios.post("https://batchcontactserver.onrender.com/signup",userData)
      .then((res) => {
        alert(res.data.message);
        navigate("/")
      })
      .catch(e => console.log(e))
  }
  
//token info
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      token:token
    },
  };
// adding contacts
  const postContacts = async (contactdata) => {
    console.log(contactdata);
    console.log(token);
    await axios
      .post("https://batchcontactserver.onrender.com/user/add",contactdata,config)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data.message)
      })
      
  }

//get contacts
  const fetchContacts = () => {
   axios
      .get("https://batchcontactserver.onrender.com/user/contacts",config)
      .then((res) => {
        setContacts(res.data.message);
      })
      .catch((err) => console.log(err));
  };

useEffect(()=>{
  fetchContacts()
},[])

// delete contacts
  const deleteContacts=(id)=>{
    console.log("======> "+id);
    axios
      .delete(`https://batchcontactserver.onrender.com/user/delete/${id}`,config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

//search by email
  const myFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };


  return (
    <context.Provider
      value ={
        {signInUser,
          signUpUser,
          postContacts,
          contacts,
          fetchContacts,
          deleteContacts, 
          checkedArr,
          setCheckedArr,
          myFunction
        }
      }
      >
      {props.children}
    </context.Provider>
  )
}