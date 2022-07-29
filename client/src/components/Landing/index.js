import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import history from "../Navigation/history";
import ResponsiveAppBar from "../ResponsiveAppBar";
import Grid from "@material-ui/core/Grid";
import BGV from "../BGV";


const Landing = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <BGV/>
      <Grid container spacing={4}>
        {/* <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid> */}
       

        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" component="h3" gutterBottom style={{color:'white'}}>
            Adnan Ifram's IMDB
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default Landing;
