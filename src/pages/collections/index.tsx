import * as React from "react";
import Home from "@/components/home";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { db, collection, doc, deleteDoc, getDocs } from "@/firebase/clientapp";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

function Collections() {
  const router = useRouter();
  const [rows, setRows] = React.useState([]);
  const [password, setPassword] = React.useState("");
  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", flex: 1 },
    { field: "name", headerName: "Book Name", flex: 2 },
    { field: "author", headerName: "Author", flex: 2 },
    {
      field: "type",
      headerName: "Book Type",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={async () => {
              try {
                const docRef = doc(db, "books", params.value);
                await deleteDoc(docRef);
                setRows([]);
                getListOfCollection();
              } catch (err) {
                console.error("Error deleting document: ", err);
              }
            }}
            variant="contained"
            size="small"
            color="secondary"
            disabled={password !== "nbs123#"}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  React.useEffect(() => {
    getListOfCollection();
  }, []);

  const getListOfCollection = async () => {
    try {
      const docsData = await getDocs(collection(db, "books"));
      console.log(docsData);
      const _rows: any = [];
      let _ind = 1;
      docsData.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        const data = doc.data();
        _rows.push({
          id: _ind,
          name: data.name,
          author: data.author,
          type: data.type,
          action: doc.id,
        });
        _ind++;
      });
      setRows(_rows);
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  };

  return (
    <>
      <Home />
      <div className="container col-xxl-8 px-4 mb-5">
        <Button
          onClick={() => router.push("/")}
          variant="text"
          startIcon={<HomeOutlined />}
        >
          Home
        </Button>
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          sx={{ maxWidth: 500, my: 1, display: "block", mt: 0 }}
        />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            loading={!rows.length}
          />
        </div>
      </div>
    </>
  );
}

export default Collections;
