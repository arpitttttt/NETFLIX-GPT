const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[10%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="cursor-pointer bg-black text-white py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-white hover:text-black">
        ▷ Play
        </button>
        <button className="cursor-pointer hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl hover:bg-gray-200 hover:text-black rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
