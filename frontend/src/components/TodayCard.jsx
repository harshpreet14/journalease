const TodayCard = () => {
    return (
      <div className="min-h-screen rounded-tr-3xl rounded-br-3xl border-2 border-yellow-500 bg-[#ffffff]">
        <div className="flex flex-col mt-2 mb-10 rounded-3xl p-2 overflow-hidden">
        <p className=" font-serif text-5xl text-center p-3">Today</p>
        <p className="font-serif text-2xl text-center p-3 mb-5">{new Date().toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
            })}</p>
            <div className="text-lg p-5 border border-yellow-400 rounded-xl bg-[#fdf5cd] shadow-lg  font-serif scrollbar-thin scrollbar-thumb-yellow-100 scrollbar-track-transparent">
            <p className="p-3">Once a day, especially in the early years of life and study, call yourselves to an account what new ideas, what new proposition or truth you have gained, what further confirmation of known truths, and what advances you have made in any part of knowledge.</p>
            <div/>
        </div>
      </div>
      </div>
    ); 
};

export default TodayCard;