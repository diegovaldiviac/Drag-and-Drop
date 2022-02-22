import { Grid, List, TextField, Fab, Button } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Style';
import Logo from './MicrosoftTeams-image.png'
import FlashMessage from './components/flash-message'
//import axois from 'axios';
 

const SnackbarType = {
  success: "success",
  fail: "error",
  warning: 'warning'
};

class App extends React.Component {


  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
    this.state = {
      selectedFile: null,
      isFileSelected: false,
      imagePreviewUrl: "",
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
      descriptionInput: '',
      isThreat: false,
      isZoom: false
    }
  };

  // Handle Event Functions
  //-----------------------------------------------------------
  // Drag function handelers
  handleDragStart = (ev, id) => {
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
      this.messageRef.current
      .show(id + ' label has been assinged', SnackbarType.success)
      // checking repition 
    } else if (newComplete.indexOf(id) > -1) {
      this.messageRef.current
      .show(id + ' has already been assigned to this picture', SnackbarType.warning)
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
  // Meta Data handlers

  handleTitleInput = (ev) => {
    this.setState({ titleInput: ev.target.value });
  }

  handleDescriptionInput = (ev) => {
    this.setState({ descriptionInput: ev.target.value });
  }

  handleThreatCheck = (ev) => {
    this.setState({ isThreat: ev.target.checked});
  }

  handleZoomCheck = (ev) => {
    this.setState({ isZoom: ev.target.checked});
  }

  //-----------------------------------------------------------
  // File upload

  handleFileChange = (ev) => {
    ev.preventDefault();
    let reader = new FileReader();
    let inFile = ev.target.files[0]
    reader.onloadend = () => {
      this.setState({ 
        selectedFile: inFile, isFileSelected: true, imagePreviewUrl: reader.result 
      });
    }
    reader.readAsDataURL(inFile);
  }




    //-----------------------------------------------------------
  // Local storage
  handleSumbitData = () => {
    // create an object of form data
    const formData = new FormData();
    // request made to the backend file
    // send formData object
    //axois.post("api/uploadFile", formData);

    // Check if a file has been uploaded

    if (!this.state.isFileSelected) { 
      this.messageRef.current.show('Please select a file', SnackbarType.fail)
    }
    else if (this.state.titleInput.length === 0) {
      this.messageRef.current.show('Missing a title', SnackbarType.warning)
    } else {
      // Update the formData object
      formData.append(
        "File",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      localStorage.setItem('Image', JSON.stringify(this.state.imagePreviewUrl));
      localStorage.setItem('Labels', JSON.stringify(this.state.complete));
      localStorage.setItem('Title', JSON.stringify(this.state.titleInput));
      localStorage.setItem('Description', JSON.stringify(this.state.descriptionInput));
      localStorage.setItem('Threat', JSON.stringify(this.state.checked));
      localStorage.setItem('Zoom', JSON.stringify(this.state.isZoom));
      
      this.setState({ 
        descriptionInput: '', titleInput: '', isThreat: false, isZoom: false,
        isFileSelected: false, selectedFile: null, imagePreviewUrl: ""
      });
      this.messageRef.current.show('Submited!', SnackbarType.success)
    }
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
            <Grid className={classes.column} >
              {this.state.isFileSelected ? (
                <div className={classes.droppable}
                  onDragOver={(e)=>this.handleDragOver(e)}
                  onDrop={(e)=>this.handleOnDrop(e)}>
                    <img 
                    src={this.state.imagePreviewUrl}
                    width={400} height={300}
                    alt="..." style={{objectFit: 'cover'}}
                    />
                </div>
              ) : (
                <p>Select a file</p>
              )}
              <input type='file' accept='image/*' id='button-file' onChange={(e) => this.handleFileChange(e)}>
              </input>
            </Grid>
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
                onChange={(e) => this.handleTitleInput(e)} value={this.state.titleInput}/>
                <div>
                <textarea id='descriptionText' name='description' rows={10} cols={40} 
                onChange={(e) => this.handleDescriptionInput(e)} value={this.state.descriptionInput}/>
                </div>
                <label>
                  <input id='threatChecked' type='checkbox' 
                  checked={this.state.isThreat} onChange={(e) => this.handleThreatCheck(e)}/>
                  <span> Threat </span>
                  <input id='zoomChecked' type='checkbox'
                  checked={this.state.isZoom} onChange={(e) => this.handleZoomCheck(e)}/>
                  <span> Zoom View </span>
                </label>
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
          <FlashMessage ref={this.messageRef}/>
      </div>
    );
  }
};
App = withStyles( Styles ) (App);
export default App;
