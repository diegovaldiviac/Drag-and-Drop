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
    //alignItems: 'center',
  },

  column: {
    //border: "solid 1px purple",
    direction: 'column',
    justifyContent: 'space-around',
    display: 'inline-grid',
  },

  droppable: {
    width: 400,
    height: 300,
    border: "solid 1px black"
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