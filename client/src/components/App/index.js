import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { getThemeProps } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function MovieSelection(props) {
  return (
    <div>
      <InputLabel id="demo-simple-select-label">Movie Title</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.movieName}
        onChange={props.handleTitle}
        //HelperText={(props.movieName == '' && props.isSubmit) && ('Select Movie')}
      >
        <MenuItem value={"Finding Nemo"}>Finding Nemo</MenuItem>
        <MenuItem value={"The Incredibles"}>The Incredibles</MenuItem>
        <MenuItem value={"Frozen"}>Frozen</MenuItem>
        <MenuItem value={"Coco"}>Coco</MenuItem>
        <MenuItem value={"Ratatouille"}>Ratatouille</MenuItem>
      </Select>
    </div>
  );
}

function ReviewTitle(props) {
  return (
    <TextField
      id="reviewTitle"
      label="Review Title"
      variant="outlined"
      reviewtitle={props.reviewTitle}
      onChange={props.handleReviewTitle}
    />
  );
}

function ReviewBody(props) {
  return (
    <div>
      <TextField
        id="review"
        label="Review"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        multiline
        minRows={4}
        //container
        review={props.review}
        variant="filled"
        onChange={props.handleReview}
      />
    </div>
  );
}

function ReviewRating(props) {
  return (
    <>
      <FormLabel component="legend">Rating</FormLabel>
      <RadioGroup
        aria-label="Rating"
        name="Rating"
        rating={props.rating}
        onChange={props.handleRating}
        row={true}
      >
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="1"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="2"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="3"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="4"
          control={<Radio />}
          label="4"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="5"
          control={<Radio />}
          label="5"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </>
  );
}

export default function Home() {
  const classes = useStyles();

  //Movie Title
  const [movieName, setName] = React.useState("");

  const handleTitle = (event) => {
    setName(event.target.value);
  };

  //Review Title
  const [reviewTitle, setReviewTitle] = React.useState("");

  const handleReviewTitle = (event) => {
    setReviewTitle(event.target.reviewTitle);
  };

  const reviewTitle1 = document.getElementById("reviewTitle");

  //Review
  const [review, setReview] = React.useState("");

  const handleReview = (event) => {
    setReview(event.target.review);
  };

  const review1 = document.getElementById("review");

  //Rating
  const [rating, setRating] = React.useState("");

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  const [isSubmit, setSubmit] = React.useState(false);

  const handleClick = () => {
    setSubmit(true);

    const err = document.getElementById("fail");
    const succ = document.getElementById("success");
    const movTitle = document.getElementById("mTitle");
    const revTitle = document.getElementById("rTitle");
    const revBody = document.getElementById("rBody");
    const rated = document.getElementById("rate");

    if (movieName !== "" && reviewTitle1.value !== "" && review1.value !== "" && rating !== "") {
      err.innerHTML = "";
      succ.innerHTML = "Your Review Has Been Submitted";
      movTitle.innerHTML = "Movie Title: " + movieName;
      revTitle.innerHTML = "Review Title: " + reviewTitle1.value;
      revBody.innerHTML = "Review: " + review1.value;
      rated.innerHTML = "Rating: " + rating;
    }else if (movieName === null &&reviewTitle1.value !== "" &&review1.value !== "" &&rating !== "") {
      err.innerHTML = "Please Select Movie";
      succ.innerHTML = "";
      movTitle.innerHTML = "";
      revTitle.innerHTML = "";
      revBody.innerHTML = "";
      rated.innerHTML = "";
    }else if (movieName !== "" &&reviewTitle1.value === "" &&review1.value !== "" &&rating !== "") {
      err.innerHTML = "Please Enter Review Title";
      succ.innerHTML = "";
      movTitle.innerHTML = "";
      revTitle.innerHTML = "";
      revBody.innerHTML = "";
      rated.innerHTML = "";
    }else if (movieName !== "" &&reviewTitle1.value !== "" &&review1.value === "" &&rating !== "") {
      err.innerHTML = "Please Enter Review Body";
      succ.innerHTML = "";
      movTitle.innerHTML = "";
      revTitle.innerHTML = "";
      revBody.innerHTML = "";
      rated.innerHTML = "";
    }else if (movieName !== "" &&reviewTitle1.value !== "" &&review1.value !== "" &&rating === "") {
      err.innerHTML = "Please Select Movie Rating";
      succ.innerHTML = "";
      movTitle.innerHTML = "";
      revTitle.innerHTML = "";
      revBody.innerHTML = "";
      rated.innerHTML = "";
    } 
    else{
      err.innerHTML = "You Have Left More Than One Space Empty";
      succ.innerHTML = "";
      movTitle.innerHTML = "";
      revTitle.innerHTML = "";
      revBody.innerHTML = "";
      rated.innerHTML = "";
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Review A Movie
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl className={classes.formControl}>
            <MovieSelection
              movieName={movieName}
              handleTitle={handleTitle}
              isSubmit={isSubmit}
            />
          </FormControl>
        </Grid>

        <Grid
          item
          xs={6}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form className={classes.root} noValidate autoComplete="off">
            <ReviewTitle
              reviewTitle={reviewTitle}
              handleReviewTitle={handleReviewTitle}
            />
          </form>
        </Grid>

        <Grid item xs={1}></Grid>

        <Grid item xs={10}>
          <form className={classes.root} noValidate autoComplete="off">
            <ReviewBody review={review} handleReview={handleReview} />
          </form>
        </Grid>

        <Grid item xs={1}></Grid>

        <Grid item xs={1}></Grid>

        <Grid item xs={6}>
          <FormControl component="fieldset">
            <ReviewRating rating={rating} handleRating={handleRating} />
          </FormControl>
        </Grid>

        <Grid item xs={2}></Grid>

        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Submit
          </Button>
        </Grid>

        <Grid item xs={1}></Grid>

        <Grid item xs={10}>
          <Typography variant="h5" component="h5" gutterBottom>
            Reviews:
          </Typography>
          <p style={{ color: "red" }} id="fail"></p>
          <p style={{ color: "green" }} id="success"></p>
          <p id="mTitle"></p>
          <p id="rTitle"></p>
          <p id="rBody"></p>
          <p id="rate"></p>
        </Grid>
      </Grid>
    </div>
  );
}
