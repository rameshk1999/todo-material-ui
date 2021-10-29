import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useCreateTodoMutation } from "../../services/todoService";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

const AddTodo = () => {
  const [createTodo, response] = useCreateTodoMutation();
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  let payload = {
    title,
    completed: checked,
    email: "ramesh@gmail.com",
  };
  const handleSuccessVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Todo Created", {
      variant,
    });
  };

  const handleSubmit = () => {
    createTodo(payload).then((res) => {
      console.log(res);
      if (res.data.status === 201) {
        handleSuccessVariant("success");
        // window reload after sometime
        window.setTimeout(function () {
          history.push("/");
          window.location.reload();
        }, 2000);
      }
    });
    setTitle("");
    setChecked(false);
  };
  return (
    <Box marginY={2}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={7} sm={12} md={6}>
          <Paper elevation={0}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="outlined-required"
              fullWidth
              label="Title"
            />
            <FormControlLabel
              label={checked ? "Completed" : "Pending"}
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(!checked)}
                />
              }
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
              disabled={!title}
            >
              Add Todo
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTodo;
