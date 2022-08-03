import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect(()=> {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, [])  //We leave the second array empty because we don't want to trigger this callback ever again

  useEffect(()=> {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };


  return (
    <div className="App">
      <h1 className="app-title"> Monsters Rolodex </h1>
      <SearchBox
        className="search-box monsters"
        onChangeHandler={onSearchChange}
        placeholder="Search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};


// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase(); //because the includes() method is case sensitive
//     this.setState(() => {
//       return { searchField: searchField };
//     });
//   };

//   render() {

//     return (
//       <div className="App">
//         <h1 className="app-title"> Monsters Rolodex </h1>
//         <SearchBox
//           className="search-box monsters"
//           onChangeHandler={this.onSearchChange}
//           placeholder="Search monsters"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
