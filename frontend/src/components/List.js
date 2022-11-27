import { React, useState } from "react"
import Card1 from "./Card1"
import data from "./ListData.json"
import "./styles2.css"

function List(props) {
  //create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input === "") {
      return el
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(props.input)
    }
  })
  return (
    <ul>
      {filteredData.map((item) => (
        <Card1 batch={item.batch} name={item.name} photo={item.photo}></Card1>
      ))}
    </ul>
  )
}

export default List
