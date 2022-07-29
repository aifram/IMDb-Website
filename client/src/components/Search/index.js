import React from "react";
import Typography from "@material-ui/core/Typography";
import ResponsiveAppBar from "../ResponsiveAppBar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function MovieTitle(props) {
  return (
    <TextField
      id="movieTitle"
      label="Movie Title"
      variant="outlined"
      movieTitle={props.movieTitle}
      onChange={props.handleMovieTitle}
    />
  );
}

function ActorName(props) {
  return (
    <TextField
      id="ActorName"
      label="Actor's Name"
      variant="outlined"
      actorName={props.actorName}
      onChange={props.handleActorName}
    />
  );
}

function DirectorName(props) {
  return (
    <TextField
      id="DirectorName"
      label="Director's Name"
      variant="outlined"
      directorName={props.directorName}
      onChange={props.handleDirectorName}
    />
  );
}

const Search = () => {
  const [movieTitle, setMovieTitle] = React.useState("");

  const handleMovieTitle = (event) => {
    setMovieTitle(event.target.value);
  };

  const [actorName, setActorName] = React.useState("");

  const handleActorName = (event) => {
    setActorName(event.target.value);
  };

  const [directorName, setDirectorName] = React.useState("");

  const handleDirectorName = (event) => {
    setDirectorName(event.target.value);
  };

  // const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3033";

  const serverURL = "";

  const callApiSearchMovies = async () => {
    const url = serverURL + "/api/searchMovies";
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: movieTitle,
        actor: actorName,
        director: directorName,
      }),
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
  };

  //   const callApiSearchMovies = async () => {
  //     const url = serverURL + "/api/searchMovies";
  //     console.log(url);
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: movieTitle,
  //         actor: actorName,
  //         director: directorName,
  //       }),
  //     });
  //     const body = await response.json();

  //     if (response.status !== 200) throw Error(body.message);
  //     console.log("Movies: ", body);
  //     return body;
  //   };

  const [searchedMoviesID, setMovies] = React.useState([]);

  //   const title = document.getElementById("movieTitle");

  const loadSearchedMovies = () => {
    callApiSearchMovies().then((res) => {
      console.log("callApiGetMovies returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiGetMovies parsed: ", parsed);
      setMovies(parsed);
    });
  };

  const handleClick = () => {
    console.log(movieTitle);
    console.log(actorName);
    console.log(directorName);
    // callApiSearchMovies();
    loadSearchedMovies();
    console.log("movies:" + searchedMoviesID);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Grid container spacing={4}>
        <Grid item xs={12}></Grid>

        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Search For A Movie
          </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form noValidate autoComplete="off">
            <MovieTitle
              movieTitle={movieTitle}
              handleMovieTitle={handleMovieTitle}
            />
          </form>
        </Grid>

        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form noValidate autoComplete="off">
            <ActorName
              actorName={actorName}
              handleActorName={handleActorName}
            />
          </form>
        </Grid>

        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form noValidate autoComplete="off">
            <DirectorName
              directorName={directorName}
              handleDirectorName={handleDirectorName}
            />
          </form>
        </Grid>

        <Grid item xs={12}></Grid>

        {/* <Grid item xs={8}></Grid> */}

        <Grid container justify="center">
          <Button
            variant="contained"
            onClick={handleClick}
            style={{ color: "red" }}
          >
            Search
          </Button>
        </Grid>

        {searchedMoviesID.map((movie) => (
          <Grid
            item
            xs={4}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h11" component="h11" gutterBottom>
              Movie: {movie.name}
            </Typography>

            <Typography variant="h11" component="h11" gutterBottom>
              Directed by: {movie.director_name}
            </Typography>

            {movie.reviewContent ? (
              <Grid
                // item
                // xs={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography>Average Score: {movie.reviewScore}</Typography>
                <Typography>Reviews: {movie.reviewContent}</Typography>{" "}
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default Search;
