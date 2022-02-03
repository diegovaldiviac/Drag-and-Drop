import React from 'react';

/**
 * Using the hoc pattern with 'withStyles'
 * to inject css objects to dom...
 *
 * SEE
 *
 * https://material-ui.com/css-in-js/api/
 * https://material-ui.com/styles/basics/
 */

const SecurSamplerStyles = {



  outerGrid: {
    border: "solid 1px black",
    justifyContent: 'space-around',
  },
    
  innerGrid: {
    //border: "solid 1px green",
    justifyContent: 'space-around',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  column: {
    //border: "solid 1px purple",
    direction: 'column',
    justifyContent: 'space-around',
    display: 'inline-grid',
  },

  droppable: {
    backgroundcolor: "grey",
    width: 400,
    height: 300,
    border: "solid 1px orange"
  },

  

  insideList: {
    backgroundColor: "white",
    width: 200,
    display: 'inline-grid',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tagArea: {
    height: "500px",
    border: "solid 1px #555",
    backgroundColor: "#eee",
    color: "#555",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tag: {
    padding: '0.5rem 1rem',
    marginRight: '1rem',
    marginBottom: '1rem',
    cursor: 'move',
    float: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'lightblue', 
    fontSize:'20px'
  },

  taskheader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  listStyle: {
    border: 'inset 2px grey',
    width: "220px",
    height: "300px",
    overflowY: "auto",
    overflowX: "scrollable",
    display: 'inline-grid',
    //display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

};

export default SecurSamplerStyles;