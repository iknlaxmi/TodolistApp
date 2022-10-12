import { useState, useEffect } from 'react';
import './App.css';
import ListDisplay from './components/ListDisplay';

let todo_data = ['Cooking', 'Reading', 'Shopping'];
let listLength = 0;
function App() {
  const [listData, setListData] = useState();
  const [mainList, setMainList] = useState([]); // const [list, setList] = useState([
  //   {
  //     id: Number,
  //     item: String,
  //     completed: Boolean,
  //   },
  // ]);
  const focusStyle = {
    borderBottom: '5px solid #2f80ed',
    outline: 'none',
  };
  const [list, setList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [actionList, setActionList] = useState([]);
  const [listType, setListType] = useState('1'); //1-All,2-Active,3-Completed
  const [styleDataAll, setStyleDataAll] = useState(focusStyle);
  const [styleDataComplete, setStyleDataComplete] = useState();
  const [styleDataActive, setStyleDataActive] = useState();

  //Handling list text input
  function handleInput(e) {
    e.preventDefault();
    // console.log(e.target.value);
    setListData(e.target.value);
  }

  // Handling list Add button click
  function handleClick(e) {
    console.log(listData);

    const found = list.find((obj) => {
      return obj.item === listData;
    });
    console.log(found);
    if (list.length === 0) {
      setList((prvActionList) => {
        return [
          ...prvActionList,
          {
            id: list.length + 1,
            item: listData,
            completed: false,
          },
        ];
      });
    } else if (found == undefined) {
      setList((prvActionList) => {
        return [
          ...prvActionList,
          {
            id: list.length + 1,
            item: listData,
            completed: false,
          },
        ];
      });
    }

    setMainList(list);

    setListData('');
    e.preventDefault();
  }

  //child executing function
  const handlehkboxStat = function (data) {
    console.log(data);
    const newList = list.map((obj) => {
      if (obj.id == data.target.id) {
        if (data.target.checked === true) {
          obj.completed = true;
        } else {
          obj.completed = false;
        }
      }
      return obj;
    });
    setList(newList);

    //Filtered list

    let filteredArray = list.filter((item) => item.completed === false);
    setActionList(filteredArray);

    // console.log(newList);
  };
  //Handle delete completed items
  function handleDelete(itemId) {
    setList(list.filter((item) => item.id !== itemId));
  }
  //Delete all completed items in the list
  function handleDeleteAllCompletedItems() {
    setList(list.filter((item) => item.completed === false));
  }
  //Handling which button pressed: All,Active,Completed buttons

  function handleListTypeButton(e) {
    // e.stopPropagation();

    console.log(e);

    // e.target.style(focusStyle);
    // e.currentTarget.style.borderBottom = '5px solid #2f80ed';
    // e.currentTarget.style.outline = 'none';
    if (e.target.value === '1') {
      setMainList(list);
      setStyleDataAll(focusStyle);
      setStyleDataComplete({});
      setStyleDataActive({});
    } else if (e.target.value === '2') {
      setMainList(actionList);
      setStyleDataAll();
      setStyleDataActive(focusStyle);
    } else if (e.target.value === '3') {
      setMainList(completedList);
      setStyleDataAll();
      setStyleDataComplete(focusStyle);
      setStyleDataActive({});
    }
    setListType(e.target.value);

    e.preventDefault();
  }

  return (
    <div className="App">
      <div className="title">
        <h1>#todo</h1>
      </div>
      <div className="nav-btns">
        <div className="nav-item">
          <button
            type="text"
            className="cls1 btn active"
            value="1"
            style={styleDataAll}
            onClick={handleListTypeButton}
          >
            All
          </button>
        </div>
        <div className="nav-item">
          <button
            type="text"
            className="cls2 btn"
            value="2"
            style={styleDataActive}
            onClick={handleListTypeButton}
          >
            Active
          </button>
        </div>
        <div className="nav-item">
          <button
            type="text"
            className="cls3 btn"
            value="3"
            style={styleDataComplete}
            onClick={handleListTypeButton}
          >
            Completed
          </button>
        </div>
      </div>
      <hr className="hr-tag"></hr>
      <div className="todo-container">
        <form>
          <input
            className="input-item"
            type="text"
            placeholder="add details"
            value={listData}
            onChange={handleInput}
          />
          <button type="text" className="btn-item" onClick={handleClick}>
            Add
          </button>
        </form>
      </div>

      <ListDisplay
        listdata={list}
        buttonData={listType}
        chkbox={handlehkboxStat}
        deleteItem={handleDelete}
        deleteAllCompletedItems={handleDeleteAllCompletedItems}
      />
    </div>
  );
}

export default App;
