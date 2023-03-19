import React, { useState } from "react";
import { usePopper } from "react-popper";
import OutsideElement from "../helpers/OutsideElement";
import { filters } from "../data/Filters";
import { useToDos } from "../context/toDoContext";
import { AiOutlineDelete } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";

const ToDoList = () => {
  // context functions
  const {
    isLoading,
    todosFilter,
    filterActive,
    deleteToDo,
    completeToDo,
    getToDos,
    handlerFilter,
    areToDos,
    handlerModal,
    sendToDo,
  } = useToDos();

  // Popper options
  const options = {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  };

  // Handler filters popper
  const [showPopper, setshowPopper] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    options
  );

  const handlerShowPopper = () => {
    setshowPopper(!showPopper);
  };

  /* set filter active and reload todos list */
  const setFilter = (filter) => {
    getToDos(filter);
    handlerFilter(filter);
    handlerShowPopper();
  };

  const hanlderDeleteToDo = (e, id) => {
    e.preventDefault();
    deleteToDo(id);
  };

  /* class to set in itemactive and list filter */
  const itemActiveClass = (filter) =>
    filterActive === filter ? " text-orange-600" : "";
  const filterClass =
    "flex justify-end items-center hover:bg-gray-200 pr-3 h-10 text-sm cursor-pointer font-sans";

  /* return popper element, this contains filter list */
  const popperFilters = () => {
    return (
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="flex flex-col rounded-lg shadow-2xl bg-white w-48"
      >
        {filters.map((filter, key) => {
          return (
            <span
              className={filterClass + itemActiveClass(filter.name)}
              onClick={() => {
                setFilter(filter.name);
              }}
              key={key}
              data-testid={filter.name + "-test"}
            >
              {filter.name}
            </span>
          );
        })}
      </div>
    );
  };

  const getToDosList = () => {
    return (
      <div className="pt-8 tracking-tight todoList">
        <div className="rounded-lg bg-white w-full p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-2 font-bold text-lg font-sans">
                To do list
              </span>
              {/* <img src={plus} className="cursor-pointer" alt="resetList" onClick={() => handlerModal()} /> */}
              {/* <IoMdAddCircleOutline /> */}
            </div>
            <OutsideElement showPopper={() => setshowPopper(false)}>
              <div
                className="flex cursor-pointer items-center"
                ref={setReferenceElement}
                onClick={() => handlerShowPopper()}
              >
                <span
                  className="mr-2 text-sm font-sans"
                  data-testid={filterActive + "activetest"}
                >
                  {filterActive}
                </span>
                {/* <img src={arrows} alt="showPopper" /> */}
                <BiFilterAlt />
              </div>
              {showPopper ? popperFilters() : null}
            </OutsideElement>
          </div>
          { !isLoading ? 
          
          todosFilter.map((todo, key) => {
            return (
              <div className="group flex flex-col pt-6" key={key}>
                <div className="flex justify-between items-center">
                  <div>
                    <input
                      type="checkbox"
                      className={`rounded-full text-orange-600 focus:ring-transparent transition duration-500`}
                      onChange={() => completeToDo(todo.completed, todo.id)}
                      checked={todo.completed}
                      style={{ cursor: "pointer" }}
                    />
                    <span
                      className={`pl-2 font-sans ${
                        todo.completed ? "text-gray-400" : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  {/* <span
                    className="cursor-pointer text-delete hidden text-xs underline underline-offset-0 group-hover:flex group-hover:underline-offset-1"
                    onClick={(e) => hanlderDeleteToDo(e, todo.id)}
                  >
                    Delete
                  </span> */}
                  <AiOutlineDelete
                    onClick={(e) => hanlderDeleteToDo(e, todo.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            );
          }) : 
          <div className="flex justify-center my-4">
              <div className="loading-spinner2"></div>
          </div>
          }
          { !isLoading && <button
            className="rounded-lg bg-orange-600 w-full h-10 hover:bg-orange-700 text-white shadow-lg transition duration-500 font-sans mt-6"
            onClick={(e) => handlerModal(e)}
            aria-label="addToDoButton"
          >
            Limpiar tareas
          </button>}
        </div>
      </div>
    );
  };

  return areToDos() ? getToDosList() : null;
};

export default ToDoList;
