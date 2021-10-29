import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  useCreateTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "../../services/todoService";
import { useSnackbar } from "notistack";
import { useParams, useHistory } from "react-router";
import axios from "axios";

const AddTodo = () => {
  let { id } = useParams();
  const PostData = useGetTodoByIdQuery(id);
  const [updateTodo, res] = useUpdateTodoMutation();

  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`https://daily-life-api.herokuapp.com/todos/get/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTitle(res.data.post.title);
          setChecked(res.data.post.completed);
        }
      });
  }, [id]);

  let payload = {
    title,
    completed: checked,
    email: "ramesh@gmail.com",
  };
  const handleSuccessVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Todo update", {
      variant,
    });
  };

  const handleSubmit = () => {
    // updateTodo(payload).then((res) => {
    //   console.log(res);
    //   if (res.data.status === 201) {
    //     handleSuccessVariant("success");
    //     // window reload after sometime
    //     window.setTimeout(function () {
    //       history.push("/");
    //       window.location.reload();
    //     }, 2000);
    //   }
    // });

    setTitle("");
    setChecked(false);
    history.push("/");
  };
  return (
    <Box marginY={2}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {PostData && PostData.data && PostData.data.status === 200 && (
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
        )}
      </Grid>
    </Box>
  );
};

export default AddTodo;
