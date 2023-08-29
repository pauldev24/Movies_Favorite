
function Home() {
  return (
    <article className="w-screen h-screen absolute top-0 -z-10 overflow-hidden">
      <section className="w-full relative h-screen">
          <div className="w-full h-full bg-cover absolute z-10" style={{backgroundImage: "url('https://v4.cdnpk.net/videvo_files/video/free/video0479/thumbnails/_import_6285e3b35f75b0.35480046_large.jpg?ga=GA1.1.1403329600.1693271424&item_id=176556')"}}>
          </div>
          <div className="bg-black/20 absolute top-0 left-0 w-full h-full z-20" />
          <h1 className="text-slate-200 text-7xl text-center w-full font-bold absolute top-[40%] z-20">YOUR PA MOVIES</h1>
      </section>
    </article>
  )
}

export default Home