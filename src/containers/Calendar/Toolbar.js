import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  arrows: {
    marginLeft: theme.spacing(3),
  },
  noElevation: {
    boxShadow: 0,
  },
}));

function ToolBar(props) {
  const { onNavigate, onView, date, localizer, views } = props;
  const classes = useStyles();
  return (
    <AppBar position="relative" color="inherit" elevation={0}>
      <Toolbar>
        <ButtonGroup color="primary">
          {views.map((name) => (
            <Button key={name} onClick={() => onView(name)}>
              {localizer.messages[name]}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup color="primary" className={classes.arrows}>
          <Button onClick={() => onNavigate("PREV")}>
            <KeyboardArrowLeft />
          </Button>
          <Button onClick={() => onNavigate("NEXT")}>
            <KeyboardArrowRight />
          </Button>
        </ButtonGroup>
        <DatePicker
          autoOk
          className={classes.arrows}
          variant="inline"
          disableToolbar
          value={date}
          onChange={(date) => onNavigate("DATE", date)}
        />
      </Toolbar>
    </AppBar>
  );
}

export default ToolBar;
