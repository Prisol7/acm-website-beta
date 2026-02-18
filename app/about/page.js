export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-600 mb-8">
        We are the Association for Computing Machinery (ACM) student chapter —
        a community of students passionate about technology, software, and
        everything in between.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-600">
          To inspire and empower students to explore computer science through
          workshops, hackathons, networking events, and collaborative projects.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Host weekly tech talks and workshops</li>
          <li>Organize annual hackathons</li>
          <li>Connect members with industry professionals</li>
          <li>Support open-source and research projects</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
        <p className="text-gray-600">
          All students are welcome, regardless of major or experience level.
          Come to a meeting, join our Discord, or reach out to an officer to
          learn more.
        </p>
      </section>
    </main>
  );
}
