export default function Search() {

  return (

    <div className="py-12 text-center">

      <h2 className="text-3xl font-bold mb-6">
        Search Projects
      </h2>

      <input
        type="text"
        placeholder="Search startup ideas..."
        className="border px-4 py-3 w-96 rounded-lg"
      />

      <button className="ml-4 px-6 py-3 bg-purple-600 text-white rounded-lg">
        Search
      </button>

    </div>

  );

}
