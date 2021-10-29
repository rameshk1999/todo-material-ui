import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  useDeleteTodoMutation,
  useGetAllTodosQuery,
} from "../../services/todoService";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "notistack";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");
  const { enqueueSnackbar } = useSnackbar();
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllTodosQuery();
  const [deleteTodo, response] = useDeleteTodoMutation();
  let todos = isSuccess && data && data.data;

  let filteredTodo =
    todos &&
    todos.length > 0 &&
    todos.filter((todo) => todo.completed === true);

  let pendingTodos =
    todos &&
    todos.length > 0 &&
    todos.filter((todo) => todo.completed === false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDeleteVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Todo Deleted", {
      variant,
    });
  };

  const handleDeleteTodo = (id) => {
    console.log("dleted", id);
    deleteTodo(id).then((res) => {
      console.log("deleted", res);
      if (res.data.status === 200) {
        handleDeleteVariant("success");
        // window reload after sometime
        window.setTimeout(function () {
          window.location.reload();
        }, 2000);
      }
    });
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="All" value="1" />
            <Tab label="Completed" value="2" />
            <Tab label="Pending" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {isSuccess && !isError && todos && todos.length > 0 && (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {" "}
              {todos.map((todo) => {
                let { title, createdAt, completed, _id } = todo;
                return (
                  <ListItem key={_id}>
                    <ListItemText
                      primary={title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {createdAt.split("T")[0]}
                          </Typography>
                          {completed ? "   Completed" : "   Pending"}
                        </React.Fragment>
                      }
                    />
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTodo(_id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Divider sx={{ color: "white" }} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </TabPanel>
        <TabPanel value="2">
          {isSuccess && !isError && todos && todos.length > 0 && (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {filteredTodo &&
                filteredTodo.length > 0 &&
                filteredTodo.map((todo) => {
                  let { title, createdAt, completed, _id } = todo;
                  return (
                    <ListItem key={_id}>
                      <ListItemText
                        primary={title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {createdAt.split("T")[0]}
                            </Typography>
                            {completed ? "   Completed" : "   Pending"}
                          </React.Fragment>
                        }
                      />
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTodo(_id)}>
                        <DeleteIcon />
                      </IconButton>
                      <Divider sx={{ color: "white" }} />
                    </ListItem>
                  );
                })}
            </List>
          )}
        </TabPanel>
        <TabPanel value="3">
          {isSuccess && !isError && todos && todos.length > 0 && (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {pendingTodos &&
                pendingTodos.length > 0 &&
                pendingTodos.map((todo) => {
                  let { title, createdAt, completed, _id } = todo;
                  return (
                    <ListItem key={_id}>
                      <ListItemText
                        primary={title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {createdAt.split("T")[0]}
                            </Typography>
                            {completed ? "   Completed" : "   Pending"}
                          </React.Fragment>
                        }
                      />
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTodo(_id)}>
                        <DeleteIcon />
                      </IconButton>
                      <Divider sx={{ color: "white" }} />
                    </ListItem>
                  );
                })}
            </List>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
