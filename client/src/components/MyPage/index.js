import React from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveAppBar from "../ResponsiveAppBar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BGV from "../BGV";

function ActorGuess(props) {
  return (
    <TextField
      id="actorName"
      label="Actor Name"
      variant="outlined"
      actorGuess={props.actorGuess}
      onChange={props.handleActorGuess}
    />
  );
}

const MyPage = () => {
  const serverURL = "";

  const callApiGetActors = async () => {
    const url = serverURL + "/api/findListActors";
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
  };

  // let Arr = [];

  const [movie, setMovie] = React.useState([{ name: "" }]);

  const loadMovies = () => {
    callApiGetActors().then((res) => {
      console.log("callApiGetActors returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiGetActors parsed: ", parsed);
      setMovie(parsed);
    });
  };

  React.useEffect(() => {
    loadMovies();
  }, []);

  const [submission, setSubmission] = React.useState("");

  const handleClick = () => {
    if (
      actorGuess.toLocaleLowerCase() ===
        movie[0].first_name.toLocaleLowerCase() ||
      actorGuess.toLocaleLowerCase() ===
        movie[0].first_name.toLocaleLowerCase() +
          " " +
          movie[0].last_name.toLocaleLowerCase()
    ) {
      console.log("u got it");
      setSubmission("Good Job!");
      loadMovies();
    } else {
      console.log("nope");
      setSubmission("Try Again!");
    }
  };

  const handleSkip = () => {
    loadMovies();
  };

  const [actorGuess, setActorGuess] = React.useState("");

  const handleActorGuess = (event) => {
    setActorGuess(event.target.value);
  };

  return (
    <div>
      <ResponsiveAppBar />
      
      <Grid container spacing={4}>
        <Grid item xs={12} />

        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Guess The Actor!
          </Typography>
        </Grid>
        <Grid item xs={12} />

        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" component="h3" gutterBottom>
            Movie: {movie[0].name}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form noValidate autoComplete="off">
            <ActorGuess
              actorGuess={actorGuess}
              handleActorGuess={handleActorGuess}
            />
          </form>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={handleClick}
            style={{ color: "red" }}
          >
            Submit
          </Button>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={handleSkip}
            style={{ color: "red" }}
          >
            Skip
          </Button>
          <Typography variant="h11" component="h11" gutterBottom></Typography>
          <Typography variant="h11" component="h11" gutterBottom>
            You're a Loser If You Press ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" component="h3" gutterBottom>
            {submission}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default MyPage;
