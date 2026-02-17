export default function Hero() {

  return (

    <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">

      <div className="max-w-6xl mx-auto px-8 py-20 flex justify-between items-center">

        <div>

          <h1 className="text-5xl font-bold mb-6">
            Find Partners. Build Startups.
          </h1>

          <p className="text-lg mb-6">
            Connect with developers, designers and entrepreneurs.
          </p>

          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>

        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="w-64"
        />

      </div>

    </section>

  );

}
