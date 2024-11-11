import SupBar from './components/SupBar.jsx'
import SearchBar from './components/SearchBar.jsx'
import Map from './components/Map.jsx'
import SideBar from './components/SideBar.jsx'
import './styles/aux-styles.css'

function App() {
  return (
    <>
      <Map />
      <div className="content">
        <SupBar />
        <SideBar>
          <SearchBar />
        </SideBar> 
      </div>
    </>
  )
}

export default App
