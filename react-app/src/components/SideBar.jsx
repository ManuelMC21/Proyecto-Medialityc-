import '../styles/side-bar.css'

function SideBar({children}){
  return(
    <div className="side-bar">
      {children}
      {/*<Welcome/>*/}
      <SearchResultsWindow/>
    </div>
  
  );
}

export default SideBar;

function SearchResultsWindow(){
  return(
    <SideBarWindow
      title="Results"
    >
      
    </SideBarWindow>
  );
}

function Welcome(){
  return(
    <SideBarWindow
    title="Welcome to Open Track!"
    >
      <p>OpenStreetMap is a map of the world, created by people like you and free to use under an open license. Hosting is supported by Fastly, OSMF corporate members, and other partners. </p>
    </SideBarWindow>
  )
}

function SideBarWindow({title = "NONE", children}){
  return(
    <div className="side-bar-window">
      <div className="window-header" >
        <h1>{title}</h1>
        <button className="close-button">X</button>
      </div>
      {children}
    </div>
  );
}