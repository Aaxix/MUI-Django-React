import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function UserFormInfo({ setUserName, setUserEmail, setUserNote }) {
  return (
    <div className="p-4 border-r">
      <TextField
        fullWidth
        label="Name"
        margin="normal"
        variant="outlined"
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Note"
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        onChange={(e) => setUserNote(e.target.value)}
      />
    </div>
  );
}

UserFormInfo.propTypes = {
  setUserName: PropTypes.func.isRequired,
  setUserEmail: PropTypes.func.isRequired,
  setUserNote: PropTypes.func.isRequired,
};

export default UserFormInfo;
