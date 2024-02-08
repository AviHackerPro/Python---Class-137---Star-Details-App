import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert, ImageBackground } from "react-native";
import { Card, Icon } from "react-native-elements";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `https://e64a-2405-6e00-291-60af-c5ad-c072-44ab-5c.ngrok-free.app/planet?name=${this.props.navigation.getParam("planet_name")}`
    };
  }

  componentDidMount() {
      //call getDetails function here so that the data is fetched as soon as the screen is mounted
  }
  getDetails = () => {
      //write the code to fetch the specific planet's data from the API
      const {url} = this.state;
      axios.get(url).then((response)=>{this.setDetails(response.data.data)})
      .catch((error)=>{alert(error.message)})
  };
  /*this function will determine the imagePath state depending on the planetType*/
  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

  this.setState({
    details: planetDetails,
    imagePath: imagePath,
  });
};
  render() {
    const {details, imagePath} = this.state;
    if(details.specifications){
      return(
      <View style = {styles.container}>
      <ImageBackground source = {require("../assets/bg.png")} style = {{flex:1, paddingTop:20}}></ImageBackground>
      </View>
    )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});
