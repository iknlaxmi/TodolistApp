import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/ListDisplay.css';

function ListDisplay(props) {
  const [displayData, setDisplayData] = useState([]);

  function handleStrike(e) {
    props.chkbox(e);
  }
  function deleteTask(id, e) {
    e.stopPropagation();
    props.deleteItem(id);
    e.preventDefault();
  }
  //Delete all completed tasks
  function deleteAll(e) {
    e.stopPropagation();
    props.deleteAllCompletedItems();
    e.preventDefault();
  }
  useEffect(() => {
    if (props.buttonData === '1') {
      setDisplayData(props.listdata);
    } else if (props.buttonData === '2') {
      setDisplayData(
        props.listdata.filter((item) => {
          return item.completed === false;
        })
      );
    } else if (props.buttonData === '3') {
      setDisplayData(
        props.listdata.filter((item) => {
          return item.completed === true;
        })
      );
    }

    // console.log(completedList);
  }, [props.listdata, props.buttonData]);

  return (
    <div>
      <ul>
        {displayData.length !== 0 &&
          displayData.map((item) => (
            <div className="todolist-container">
              <div className="todolist-item flex1">
                <input
                  type="checkbox"
                  id={item.id}
                  // defaultChecked={item.completed}
                  checked={item.completed}
                  className="input-checkbox"
                  onChange={handleStrike}
                  value={item.item}
                />
                <li className="strikthru">{item.item}</li>
                {displayData.length !== 0 && props.buttonData === '3' && (
                  <div className="trash-item ">
                    <button type="text" className="delete-btn">
                      <i
                        className="fa fa-trash trash-icon"
                        key={item.id}
                        onClick={(e) => deleteTask(item.id, e)}
                      ></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

        {displayData.length !== 0 &&
          props.buttonData !== '1' &&
          props.buttonData !== '2' && (
            <div className="delall-container">
              <button className="deleteall-btn" onClick={deleteAll}>
                Delete
              </button>
            </div>
          )}
      </ul>
    </div>
  );
}

export default ListDisplay;
