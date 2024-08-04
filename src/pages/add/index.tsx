import Home from "@/components/home";
import { HomeOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { db, collection, addDoc, query, where, getDocs } from "@/firebase/clientapp";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

function Add() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [type, setType] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  
  const addBook = async(e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'books'), where('name', '==', name), where('author', '==', author));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError('A book with the same name and author already exists.');
        return;
      }

      const docRef = await addDoc(collection(db, "books"), {
        name: name,
        author: author,
        type: type,
      });
      setSuccess(`A Book ${name} added successfully!`);
      setName('');
      setAuthor('');
      setType('');
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  } 

  return (
    <>
      <Home />
      <Box className="container col-xxl-8 px-4" mb={10}>
        <Button className="mb-2" onClick={() => router.push("/")} variant="text" startIcon={<HomeOutlined />}>
          Home
        </Button>
        <Box className="d-flex flex-column">
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            required
            sx={{maxWidth: 500}}
          />
          <TextField
            id="author"
            name="author"
            label="Author"
            variant="standard"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setError('');
            }}
            required
            sx={{maxWidth: 500, mt: 2}}
          />
          <TextField
            id="type"
            name="type"
            label="Type"
            variant="standard"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setError('');
            }}
            required
            sx={{maxWidth: 500, mt: 2}}
          />
          <Button variant="contained" onClick={addBook} sx={{maxWidth: 500, mt: 3}}> Submit </Button>
        </Box>
        {success &&
          <Box style={{color: 'green'}} mt={2}>
            {success}
          </Box>
        }
        {error &&
          <Box style={{color: 'red'}} mt={2}>
            {error}
          </Box>
        }
      </Box>
    </>
  );
}

export default Add;
