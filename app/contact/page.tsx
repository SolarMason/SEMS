export const metadata = {
  title: "Contact — SEMS",
  description:
    "Get in touch with Sustainable Energy Management Systems for quotes, partnerships, or product information.",
};

export default function ContactPage() {
  return (
    <article className="container-xl max-w-3xl py-20">
      <h1 className="text-4xl font-bold md:text-5xl">Contact SEMS</h1>
      <p className="mt-6 text-lg text-sems-steel">
        Interested in a quote, partnership, or more information about our
        product lines? Send us a note and we&rsquo;ll get back to you.
      </p>

      <form className="mt-10 grid gap-5">
        <label className="grid gap-1 text-sm font-medium">
          Name
          <input
            type="text"
            name="name"
            required
            className="rounded-md border border-sems-navy/20 px-4 py-3 focus:border-sems-sun focus:outline-none focus:ring-2 focus:ring-sems-sun/30"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded-md border border-sems-navy/20 px-4 py-3 focus:border-sems-sun focus:outline-none focus:ring-2 focus:ring-sems-sun/30"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Company
          <input
            type="text"
            name="company"
            className="rounded-md border border-sems-navy/20 px-4 py-3 focus:border-sems-sun focus:outline-none focus:ring-2 focus:ring-sems-sun/30"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Message
          <textarea
            name="message"
            rows={5}
            required
            className="rounded-md border border-sems-navy/20 px-4 py-3 focus:border-sems-sun focus:outline-none focus:ring-2 focus:ring-sems-sun/30"
          />
        </label>
        <button type="submit" className="btn-primary w-fit">
          Send message
        </button>
      </form>

      <p className="mt-10 text-sm text-sems-steel">
        Or email us directly — contact information will be added when the form
        backend is wired up.
      </p>
    </article>
  );
}
