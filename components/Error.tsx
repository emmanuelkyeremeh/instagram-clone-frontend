import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Error = ({ error, severity }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity={severity}>
        {severity === "info"
          ? "Loading..."
          : severity === "error"
          ? error
          : error}
      </Alert>
    </div>
  );
};

export default Error;
