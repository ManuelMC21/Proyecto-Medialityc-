import SupBar from './components/SupBar.jsx'
import SearchBar from './components/SearchBar.jsx'
import Map from './components/Map.jsx'
import SideBar from './components/SideBar.jsx'
import MoreInfoWindow from './components/MoreInfoWindow.jsx'
import './styles/aux-styles.css'
import { restaurantes } from './data/data.js'

function App() {
  return (
    <>
      <Map />
      <div className="content">
        <SupBar />
        <SideBar>
          <SearchBar />
        </SideBar> 
        <MoreInfoWindow
        place={restaurantes[1]}
        />
      </div>
    </>
  )
}

export default App
