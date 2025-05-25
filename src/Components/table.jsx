import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import logo from '@/assets/Avatar.png'
//
import {
  CircleUser,
  LockKeyhole,
  Clock,
  Tag,
  Pencil,
  Trash2,
} from "lucide-react";

export default function BasicTable() {
  const [data, setData] = useState([
    {
      id: "1",
      name: "ppp",
      email: "fake@.com",
      city: "Moscow",
      status: false,
      phone: 8748347,
    },
    {
      id: "2",
      email: "fake@.com",
      name: "bot",
      city: "Dushanbe",
      status: false,
      phone: 8748347,
    },
  ]);
  const [idx, setIdx] = useState(null);
  const [select, setSelect] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editX, setEditX] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setIdx(user.id);
    setEditX(user)
  };

  const handleClickOpen = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
    setName(editX.name)
    setEmail(editX.email)
    setEditStatus(editX.status)
    setEditCity(editX.city)
    setEditPhone(editX.phone)



  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  function deleteUser() {
    setData(data.filter((user) => user.id != idx));
  }

  function handleAddUser(event) {
    event.preventDefault();
    const newUser = {
      id: Date.now(),
      name: event.target.name.value,
      email: event.target.email.value,
      city: event.target.city.value,
      status: event.target.status.value == "true" ? true : false,
      phone: event.target.phone.value,
    };
    setData([...data, newUser]);
    setOpenAdd(false)
  }

  function handleEdit(e){
    e.preventDefault()
    if(!idx) return
    setData(data.map((user)=>user.id == idx?{...data,name:name,email:email,status:editStatus,city:editCity,phone:editPhone}:user))
    setOpenEdit(false)
  }


  return (
    <>
      <div className="one">
        <h1>User List</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          NEW+
        </Button>
      </div>
      <div className="find">
        <div className="sel">
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <select
            value={selectCity}
            onChange={(e) => setSelectCity(e.target.value)}
          >
            <option value="">All</option>
            <option value="Moscow">Moscow</option>
            <option value="Dushanbe">Dushanbe</option>
          </select>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search User..."
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="user">
                  <CircleUser />
                  Name
                </div>
              </TableCell>
              <TableCell>
                <div className="user">
                  <LockKeyhole />
                  City
                </div>
              </TableCell>
              <TableCell>
                <div className="user">
                  {" "}
                  <Clock />
                  Status
                </div>
              </TableCell>
              <TableCell>
                <div className="user">
                  <Tag />
                  Phone
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter(({ status }) => status.toString().includes(select))
              .filter(({ city }) => city.includes(selectCity))
              .filter(({ name }) =>
                name.toLowerCase().includes(search.toLowerCase().trim())
              )
              .map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    <div className="info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>

                      <div>
                        <h4>{user.name}</h4>
                        <h4>{user.email}</h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">{user.city}</TableCell>
                  <TableCell align="center">
                    {user.status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <Button
                      color="white"
                      aria-describedby={id}
                      variant="contained"
                      onClick={(e) => handleClick(e, user)}
                    >
                      ⚪⚪⚪
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <Button
              color="white"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <div className="user">
                <CircleUser /> Info
              </div>
            </Button>
          </Typography>
          <Typography sx={{ p: 2 }}>
            <Button
              color="white"
              aria-describedby={id}
              variant="contained"
              onClick={handleClickOpenEdit}
            >
              <div className="user">
                <Pencil /> Edit
              </div>
            </Button>
          </Typography>
          <Typography sx={{ p: 2 }}>
            <Button
              color="error"
              aria-describedby={id}
              variant="contained"
              onClick={deleteUser}
            >
              <div className="user">
                <Trash2 /> Delete
              </div>
            </Button>
          </Typography>
        </Popover>
      </div>

      <>
        <Dialog open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Add New</DialogTitle>
          <DialogContent>
            <DialogContentText>Add new User</DialogContentText>
            <form onSubmit={handleAddUser}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <br /> <br />
              <select name="status">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <br /> <br />
              <select name="city">
                <option value="Moscow">Moscow</option>
                <option value="Dushanbe">Dushanbe</option>
                <option value="Bokhtar">Bokhtar</option>
              </select>
              <TextField
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Phone Number"
                type="number"
                fullWidth
                variant="standard"
              />
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
            </form>
          </DialogContent>
        </Dialog>



















          <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit</DialogContentText>
            <form onSubmit={handleEdit}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                onChange={(e)=>setName(e.target.value)}
                variant="standard"
                value={name}
              />
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                variant="standard"
              />
              <br /> <br />
              <select name="status" value={editStatus} onChange={(e)=>setEditStatus(e.target.value)} >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <br /> <br />
              <select name="city"  value={editCity} onChange={(e)=>setEditCity(e.target.value)}>
                <option value="Moscow">Moscow</option>
                <option value="Dushanbe">Dushanbe</option>
                <option value="Bokhtar">Bokhtar</option>
              </select>
              <TextField
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Phone Number"
                type="number"
                value={editPhone}
                onChange={(e)=>setEditPhone(e.target.value)}
                fullWidth
                variant="standard"
              />
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </>
  );
}
