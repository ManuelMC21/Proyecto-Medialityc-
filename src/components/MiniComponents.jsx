import "../styles/aux-styles.css"
export function Overlay({children}) {
  return (
    <div className="overlay">
      {children}
    </div>
  );
}