import React, { Component } from 'react';

export default class SearchCreatures extends Component{
    render() {
        return(
            <div className="search-appointments row justify-content-center my-4">
            <div className="col-md-6">
              <div className="input-group">
                <h3>Type Pokemon name here to search→</h3>
                <input
                  id="SearchApts"
                  type="text"
                  className="form-control"
                  aria-label="Search Appointments"
                />
              </div>
            </div>
          </div>
        )
    }
}