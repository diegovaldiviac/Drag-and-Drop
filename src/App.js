import { Grid, List, TextField, Fab, Button } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Style';
import Logo from './MicrosoftTeams-image.png'
 
class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

      // backend pobla esta lista inicialmente vacida
      labels: [
          {name:'Powder', id: 1},
          {name:'Gun', id: 2},
          {name:'Bomb', id: 3},
          {name:'Apple', id: 4},
          {name:'Banana', id: 5},
          {name:'Wire', id: 6},
          {name:'Mail', id: 7},
          {name:'Metal', id: 8},
          {name:'Scissors', id: 9},
          {name:'Pipe', id: 10},
          {name:'Drug Mail', id:11},
          {name:'Paper', id:12},
          {name:'Box', id:13},
          {name:'Water', id:14},
          {name:'Alcohol', id:15},
          {name:'Knife', id:16},
        ],
      complete: [],
      tagInput: '',
      titleInput: '',
      descriptionInput: ''
    }
  };

  // Handle Event Functions
  //-----------------------------------------------------------
  // Drag function handelers
  handleDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("id", id);
    
  };

  handleDragOver = (ev) => {
    ev.preventDefault();
  }

  handleOnDrop = (ev) => {

    let id = ev.dataTransfer.getData("id");
    console.log('item recieved:', id);

    // TODO copia
    let newComplete = [... this.state.complete];

    /**
     * Handle repetition of assigned labels
     */
    if (newComplete.indexOf(id) === -1) {
      newComplete.push(id);
      alert(id + ' label assigned to this image');
      // checking repition 
    } else if (newComplete.indexOf(id) > -1) {
      alert('¡Warning!');
      alert(id + ' has already been assigned to this image');
    }
    this.setState({ complete: newComplete });
  };


  //-----------------------------------------------------------
  // Tag input handlers
  handleTagInput = (ev) => {
    this.setState({ tagInput: ev.target.value })
  }

  handleAddClick = () => {
    let input = [...this.state.tagInput];
    let newLabels = [...this.state.labels];

    /**
     * Check if input exits in the label list
     * Extract name string from label, convert input to text
     */
    if (input.join("") !== '') {
      let nameList = (newLabels.map(function(label) {
        return label.name.toUpperCase();
      }))   
      if (nameList.indexOf(input.join("").toUpperCase()) === -1) {
        // Currently giving it a random id
        // Pablo has id's set up in the backend
        newLabels.push({name: input.join(""), id: Math.random()})
      }
  } 

    this.setState({ labels: newLabels })
    document.getElementById('tag').value = '';
    this.setState({ tagInput: '' });
  }

  //-----------------------------------------------------------
  // Meta description handlers

  handleTitleInput = (ev) => {
    this.setState({ titleInput: ev.target.value })
  }

  handleDescriptionInput = (ev) => {
    this.setState({ descriptionInput: ev.target.value })
  }

  //-----------------------------------------------------------
  // Local storage
  handleSumbitData = () => {
    localStorage.setItem('Labels', JSON.stringify(this.state.complete));
    localStorage.setItem('Title', JSON.stringify(this.state.titleInput));
    localStorage.setItem('Description', JSON.stringify(this.state.descriptionInput));
    document.getElementById('titleText').value = '';
    document.getElementById('descriptionText').value = '';
    alert('sumbited');
  }


  //-----------------------------------------------------------



  render() {

    //Label List
    // - Filtered for text input
    // - Sorted alphabetetically
    // - Mapped into draggable div components

    const { classes } = this.props;  
    return (

      <div className="container-drag">
        <h2 style={{ backgroundColor: 'black'}} >
          <img src={Logo} alt="Logo"/>
        </h2>
        <Grid className={classes.outerGrid} container spacing={2}>
          <Grid className={classes.innerGrid} item xs={4}>
              <div className={classes.droppable}
                onDragOver={(e)=>this.handleDragOver(e)}
                onDrop={(e)=>this.handleOnDrop(e)}>
                Target
              </div>
          </Grid>
          <Grid className={classes.innerGrid} item xs={4}>
            <Grid className={classes.column} >
            <Grid  item xs>
              <TextField id="tag" label="Tag" variant="outlined"
              onChange={(e) => this.handleTagInput(e)}></TextField>
              <Fab variant='circular' color='primary' value='Add' size='small'
              onClick={this.handleAddClick}>+</Fab>
              </Grid>
              <List id='list' className={classes.listStyle}>
                {this.state.labels
                .filter((f =>f.name.toUpperCase().includes(this.state.tagInput.toUpperCase())))
                .sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1)
                .map((item) => (
                  <div className={classes.tag}
                    onDragStart={(e) => this.handleDragStart(e, item.name)}
                    key={item.id}
                    draggable>
                      {item.name}
                  </div>
                ))}
                </List>
              </Grid>
            </Grid>
            <Grid className={classes.innerGrid} item xs={4}>
              <Grid className={classes.column} >
                <TextField id="titleText" label="Title" variant="outlined"
                onChange={(e) => this.handleTitleInput(e)}/>
                <textarea id='descriptionText' name='description' rows={20} cols={20} 
                onChange={(e) => this.handleDescriptionInput(e)}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent='space-between'>
            <Grid paddingtop = {2} paddingleft = {1}>
              <h2 className="header">DRAG & DROP PROTOTYPE II</h2>
              <p className='author'>Diego Valdivia</p>
            </Grid>
            <Grid paddingtop = {2} paddingtight = {1}>
              <Button color='primary' variant='contained'
               onClick={this.handleSumbitData}>
                Sumbit
              </Button>
            </Grid>
          </Grid>
      </div>
    );
  }
};
App = withStyles( Styles ) (App);
export default App;
