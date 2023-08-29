
function CardDetailMovie({movie}) {
  return (
    <article className="flex justify-start items-start rounded-md shadow-md shadow-white sm:max-w-[100vh] m-auto hover:shadow-lg duration-300">
       <img src={`${movie.img_url}`} alt="image detail image" className="max-w-[30vh] rounded-md"/>
       <section className="text-white px-4 py-2">
          <h1 className="text-center uppercase text-xl font-extrabold mb-3">
            {movie.title}
          </h1>
          <ul className="flex flex-col gap-2">
            <li>
            <span className="text-violet-800 font-bold text-md">
              Año :</span> {movie.year}
            </li>
            <li>
            <span className="text-violet-800 font-bold text-md">
              Género :</span> {movie.genero}
            </li>
            <li>
            <span className="text-violet-800 font-bold text-md">
              Sinopsis :</span> <br /> 
              {movie.sinopsis}
            </li>
          </ul>
       </section>
    </article>
  )
}

export default CardDetailMovie