// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { Component } from "react";
// import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
// import FormControl from "react-bootstrap/FormControl";



import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";

interface Level {
  lvl: number;
}

const availableLevels: Level[] = [
  { lvl: 10},
  { lvl: 20},
  { lvl: 30},
  { lvl: 40},
  { lvl: 50},
  { lvl: 60},
  { lvl: 70},
  { lvl: 80},
  { lvl: 90},
  { lvl: 95},
  { lvl: 99},
];

type CustomToggleProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(
  (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        props.onClick?.(e);
      }}
    >
      {props.children}
      <span style={{ paddingLeft: "5px" }}>&#x25bc;</span>
    </a>
  )
);

type CustomMenuProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
};

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  (props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={props.style}
        className={props.className}
        aria-labelledby={props.labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={e => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(props.children).filter(
            (child: any) =>
              !value || child.props.children.toString().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export const DropdownSelector = () => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const theChosenFruit = () => {
    const chosenLevel: Level | undefined= availableLevels.find(f => f.lvl === selectedLevel);
    return chosenLevel
      ? chosenLevel.lvl.toString()
      : "Level Selection";
  };

  return (
    <Dropdown onSelect={(e: any) => setSelectedLevel(Number(e))}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {theChosenFruit()}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {availableLevels.map(level => {
          return (
            <Dropdown.Item key={level.lvl} eventKey={level.lvl.toString()}>
              {level.lvl}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};


function DropDownSearch() {
  const [value,setValue]=useState<string>("Series2Level0");
  const handleSelect=(eventKey: any, event: Object)=>{
    console.log(eventKey);
    setValue(eventKey)
  }



  return (
    <DropdownSelector/>
  );
}

export default DropDownSearch;


