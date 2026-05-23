const CategoryCard = ({ category, onClick }) => {
  if (!category) return null;

  const { titleAr, name, tailwindClass, gradient } = category;

  return (
    <div
      onClick={onClick}
      className={`relative h-36 w-full rounded-2xl p-5 flex flex-col justify-between cursor-pointer 
                  overflow-hidden transform transition-all duration-300 ease-out 
                  hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]
                  bg-gradient-to-br ${tailwindClass || ''}`}
      style={!tailwindClass ? { backgroundImage: gradient } : {}}
    >
      <span className="text-white/10 font-black text-4xl absolute -right-4 -top-2 select-none pointer-events-none uppercase tracking-wider">
        {name?.split(' ')[0]} 
      </span>

      <div className="flex justify-end">
        <div className="bg-white/20 backdrop-blur-md rounded-full p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        </div>
      </div>

      <h3 className="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-10 leading-tight">
        {titleAr}
      </h3>
    </div>
  );
};

export default CategoryCard;
