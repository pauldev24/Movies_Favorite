import { URL_MOVIES_POSTER } from '../constants'

function CardDetailMovie({movie}) {
  const img_url = (movie.img_url == null) ? 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg' : `${URL_MOVIES_POSTER + movie.img_url}`
  return (
    <article className="flex justify-start items-start rounded-md shadow-md shadow-white sm:max-w-[100vh] m-auto hover:shadow-lg duration-300">
       <img src={`${img_url}`} alt="image detail image" className="max-w-[30vh] rounded-md"/>
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
              Género :</span> 
              <section className='flex flex-col gap-2 my-2'>
                <ul className="flex justify-center gap-3 flex-wrap">
                  {movie.genero.map((genero, index) => (
                      <li key={index} className="py-1 px-2 bg-violet-700 rounded-lg">
                        {genero}
                      </li>
                  ))
                  }
                </ul>
              </section>
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