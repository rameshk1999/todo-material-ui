import { Container, Grid } from "@mui/material";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Add from "../components/movies/Add";
import Watched from "../components/movies/Watched";
import WatchList from "../components/movies/WatchList";
import TodoList from "../components/todo/TodoList";
// import CreateTodo from "../components/todo/CreateTodo";

const index = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              {/* <CreateTodo /> */}
              <TodoList />
            </Grid>
          </Grid>
        </Route>
        <Route exact path="/watched">
          <Watched />
        </Route>
        <Route exact path="/watchlist">
          <WatchList />
        </Route>
        <Route exact path="/add">
          <Add />
        </Route>
      </Switch>
    </div>
  );
};

export default index;
