const projects = [

  {
    title: "Startup Collaboration Platform",
    tech: "Next.js, Firebase",
    desc: "Find cofounders and build startups"
  },

  {
    title: "Encrypted Messaging App",
    tech: "React, Node, Crypto",
    desc: "Secure chat application"
  },

  {
    title: "Myntra Clone",
    tech: "HTML, CSS, JS",
    desc: "Ecommerce frontend clone"
  }

];

export default function Courses() {

  return (

    <section className="bg-gray-100 py-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Real Projects
      </h2>

      <div className="flex justify-center gap-8">

        {projects.map((project, index) => (

          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl w-72 hover:scale-105 transition"
          >

            <h3 className="text-xl font-bold">
              {project.title}
            </h3>

            <p className="text-gray-500">
              {project.tech}
            </p>

            <p className="mt-2">
              {project.desc}
            </p>

            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
              View Project
            </button>

          </div>

        ))}

      </div>

    </section>

  );

}
