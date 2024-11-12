function ExampleImageComp({ source, width = 70, height = 100}) {
  return (
    <div
      style={{ width: `${width}px`, height: height ? `${height}%` : 'auto' }} 
      className="basic-image-container example-image"
    >
      <img src={source} className="rest-image" alt="Example" />
    </div>
  );
}

export default ExampleImageComp;
