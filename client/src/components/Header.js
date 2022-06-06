import React from "react";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Component } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Authenticating";
      case false:
        return (
          <Button sx={{ bgcolor: "white" }} color="secondary">
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="/auth/google"
            >
              LOGIN WITH GOOGLE
            </a>
          </Button>
        );
      default:
        return (
          <div>
            <span style={{padding:"10px"}}>{this.props.auth.name}</span>
            <Button sx={{ bgcolor: "white" }} color="secondary">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="auth/api/logout"
              >
                Logout
              </a>
            </Button>
          </div>
        );
    }
  }
  render() {
    console.log(this.props);
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "blue" }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <Link style={{textDecoration:"none", color:"white"}}to={this.props.auth ? '/surveys' : '/'}>Emaily</Link>
            </Typography>
              {this.renderContent()}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

function mapStateToProps({ auth }) {
  return ({ auth });
}
export default connect(mapStateToProps)(Header);
