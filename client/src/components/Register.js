import React, { Component } from "react";
import { EventEmitter } from "events";
import M from "materialize-css";
import moment from "moment";

class Register extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    username: "",
    date_of_birth: "",
    pass1: "",
    pass2: "",
    message: "",
    registerAs: ["B"],
    interests: [],
    linkedin: "",
    portfolio: "",
    AvailableInterests: ["Apple", "Microsoft", "Google"],
    SellerProfile: {
      about: "", //Quick Summary of the profile, mimium 20 characters and maximum 150
      portfolio: "", //Url of the portfolio
      linkedin: "" //Url/user name of Linkedin profile
    }
  };

  componentWillMount() {
    const context = this;
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".datepicker");
      var instances = M.Datepicker.init(elems, {
        format: "dd/mm/yyyy",
        maxDate: new Date(2010, 12, 31),
        minDate: new Date(1975, 1, 1),
        defaultDate: new Date(1998, 8, 23),
        yearRange: [1975, 2010],
        showDaysInNextAndPreviousMonths: true,
        onSelect: function(date) {
          context.dateChange(date);
        }
      });
    });
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".chips");
      var instances = M.Chips.init(elems, {
        placeholder: "Add Interests",
        secondaryPlaceholder: "Add",
        limit: 10,
        onChipAdd: function(event, chip) {
          const validChips = context.state.AvailableInterests;
          const entry = chip.firstChild.data;
          if (!validChips.includes(entry)) {
            console.log("Does not exist.. Will be removed");
            this.deleteChip(this.chipsData.length - 1);
            return;
          }
          // console.log('Chip Data:',this.chipsData[0].tag)
          // Before Sumbitting Change to a Normal Array
          context.setState({ interests: this.chipsData });
          console.log("Event:", event);
          console.log("Chip:", chip.firstChild.data);
        },
        onChipDelete: function() {
          console.log("DELETING");
          context.setState({ interests: this.chipsData });
        },
        autocompleteOptions: {
          //autocompleteOptions.data to be layouted based on interests from Database
          data: {
            Apple: null,
            Microsoft: null,
            Google: null
          },
          limit: 2
        }
      });
    });
  }
  dateChange = date => {
    const format = moment(date).format("DD/MM/YYYY");
    console.log(format);
    this.setState({ date_of_birth: format });
  };
  hasLowerCase = str => {
    return str.toUpperCase() !== str;
  };
  hasUpperCase = str => {
    return str.toLowerCase() !== str;
  };
  hasSpecialcase = str => {
    return str.match(/^[^a-zA-Z0-9]+$/) ? true : false;
  };
  handleChange = event => {
    console.log(event.target.value);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    //console.log(this.state.username)
  };
  handlePassword = event => {
    console.log(event.target.value);
    const id = "reg-pass-message";
    const pass1 = document.getElementById("icon_pass1").value;
    const pass2 = document.getElementById("icon_pass2").value;
    const error = [
      "Passwords do not match",
      "Password is less than 8 characters",
      "Password must have a lowercase, uppercase and special character"
    ];
    const succ = "Passwords Match";
    const cases =
      this.hasLowerCase(pass1) &&
      this.hasUpperCase(pass1) &&
      this.hasSpecialcase(pass1);
    console.log(pass1, cases);
    if (pass1.length <= 7) {
      document.getElementById(id).style.color = "red";
      document.getElementById(id).innerText = error[1];
    } else if (pass1 !== pass2) {
      document.getElementById(id).style.color = "red";
      document.getElementById(id).innerText = error[0];
    } else {
      document.getElementById(id).style.color = "green";
      document.getElementById(id).innerText = succ;
    }
    this.setState({ pass1: pass1 });
  };
  switchType = event => {
    const state = document.getElementById("switch-1e").checked;
    console.log(state);
    //console.log(event.target.value)
    if (state) {
      this.toggle()
      this.setState({ registerAs: ["B", "S"] });
    }
    if (!state) {
      this.toggle()
      this.setState({ registerAs: ["B"] });
    }
    console.log(this.state.registerAs);
  };
  submit = () => {
    console.log("Full Name:", this.state.name);
    console.log("Password:", this.state.pass1);
    console.log("userName:", this.state.username);
    console.log("Email:", this.state.email);
    console.log("Phone:", this.state.phone);
    console.log("DOB:", this.state.date_of_birth);
    console.log("AccountType:", this.state.registerAs);
  };
  toggle =()=>{
    var section = document.getElementById("seller-section")
    if(section.style.display === "none"){
      section.style.display = "block"
    }
    else {
      section.style.display = "none"
    }
  }
  render() {
    return (
      <div className="container">
        <i class="fab fa-linkedin"></i>
        <div class="row">
          <form class="col s12">
            <div class="row" id="Name and Phone">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="text"
                  class="validate"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label for="icon_prefix">Full Name</label>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">phone</i>
                <input
                  id="icon_telephone"
                  type="tel"
                  class="validate"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                <label for="icon_telephone">Phone</label>
              </div>
            </div>
            <div class="row" id="UserName and Email">
              <div class="input-field col s6">
                <i class="material-icons prefix">contact_mail</i>
                <input
                  id="icon_email"
                  type="email"
                  class="validate"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <label for="icon_email">Email</label>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">person</i>
                <input
                  id="icon_username"
                  type="text"
                  class="validate"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label for="icon_username">Username</label>
              </div>
            </div>
            <div class="row" id="PASS1 PASS2 MESSAGE">
              <div class="input-field col s4">
                <i class="material-icons prefix">security</i>
                <input
                  id="icon_pass1"
                  type="password"
                  class="validate"
                  name="pass1"
                  onChange={this.handlePassword}
                />
                <label for="icon_pass1">Password</label>
              </div>
              <div class="input-field col s4">
                <i class="material-icons prefix">security</i>
                <input
                  id="icon_pass2"
                  type="password"
                  class="validate"
                  name="pass2"
                  onChange={this.handlePassword}
                />
                <label for="icon_pass2">Confirm Password</label>
              </div>
              <div className="col s4">
                <h6 id="reg-pass-message" style={{ paddingTop: "20px" }}>
                  Please enter you password
                </h6>
              </div>
            </div>
            <div class="row" id="DOB Type">
              <div class="input-field col s4">
                <i class="material-icons prefix">date_range</i>
                <input
                  id="icon_dob"
                  name="date_of_birth"
                  type="text"
                  class="datepicker"
                  onChange={this.dateChange}
                />
                <label for="icon_dob">Date Of Birth</label>
              </div>
              <div class="col s4">
                <div
                  class="switch"
                  style={{ paddingTop: "30px", paddingLeft: "20px" }}
                >
                  <label>
                    Buyer
                    <input
                      id="switch-1e"
                      type="checkbox"
                      onChange={this.switchType}
                    />
                    <span class="lever" />
                    Seller
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  name="Submit"
                  title="Submit"
                  onClick={this.submit}
                >
                  Submit
                </button>
                <button type='button' onClick={this.toggle}> Toggle</button>
              </div>
            </div>
            <div class="row" id="interests">
              <div class="input-field col s12">
                <div class="chips">
                  <input class="custom-class" />
                </div>
              </div>
            </div>
            <div style={{display:'none'}} id="seller-section">
              <div class='row' id='seller-section1'>
              <div class="input-field col s12">
                  <i class="material-icons prefix">info</i>
                  <textarea
                    id="icon_about"
                    class="materialize-textarea"
                    name="about"
                    value={this.state.about}
                    onChange={this.handleChange}
                  />
                  <label for="icon_about">About</label>
                </div>
              </div>
              <div class="row" id="seller-section2">
                <div class="input-field col s6">
                  <i class="material-icons prefix">link</i>
                  <input
                    id="icon_portfolio"
                    type="text"
                    class="validate"
                    name="portfolio"
                    value={this.state.portfolio}
                    onChange={this.handleChange}
                  />
                  <label for="icon_portfolio">Portfolio Link</label>
                </div>
                <div class="input-field col s6">
                  <i class="fab fa-linkedin"></i>
                  <input
                    id="icon_linkedin"
                    type="url"
                    class="validate"
                    name="linkedin"
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                  />
                  <label for="icon_linkedin">LinkedIn</label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
