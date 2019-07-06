import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="icon_prefix" type="text" class="validate" />
                <label for="icon_prefix">Full Name</label>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">phone</i>
                <input id="icon_telephone" type="tel" class="validate" />
                <label for="icon_telephone">Phone</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
