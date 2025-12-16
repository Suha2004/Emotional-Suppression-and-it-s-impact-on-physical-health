import React from "react";

const blogs = [
  {
    id: 1,
    image: "/src/assets/blog1.jpg",
    category: "Emotional Health",
    title: "Effects of Emotional Suppression",
    description:
      "Learn how holding back emotions can effect our health, it's causes and consequences.",
    link: "https://cliniclesalpes.com/blog/effects-of-emotional-suppression/", // 🔗 Replace with your actual blog URL
  },
  {
    id: 2,
    image: "/src/assets/blog2.jpeg",
    category: "Mind-Body Connection",
    title: "How Emotions shape our Physical Wellbeing",
    description:
      "Understanding how emotions affect physical health helps explain why stress, anxiety, and other emotional factors can influence everything from headaches to immune response.",
    link: "https://mcclinic.com/blog/the-mind-body-connection-how-emotions-shape-our-physical-wellbeing/",
  },
  {
    id: 3,
    image: "/src/assets/blog3.jpeg",
    category: "Healing Journey",
    title: "Emotions trapped in the body:symptoms and release",
    description:
      "Simple practices like mindful breathwork and movement can help release emotional tension trapped in your body.",
    link: "https://www.medicalnewstoday.com/articles/emotions-trapped-in-the-body",
  },
  {
    id: 4,
    image: "/src/assets/blog4.jpg",
    category: "Mental Wellness",
    title: "Why Acknowledging Emotions Improves Physical Health",
    description:
      "Positive emotional well-being is when people manage emotions well and have a sense of meaning, purpose, and supportive relationships.",
    link: "https://www.cdc.gov/emotional-well-being/about/index.html#:~:text=Health%20benefits,Event%20%7C%20CDC%20Emergency%20Preparedness%20&%20Response",
  },
];

const BlogSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-blue-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Emotional Healing & Wellness
        </h2>
        <p className="text-lg text-blue-700 font-medium">
          Read insights and research about emotional suppression and its impact on your body.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {blogs.map((blog) => (
          <a
            key={blog.id}
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <p className="text-sm text-blue-600 font-semibold mb-2">
                {blog.category}
              </p>
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <span className="text-blue-700 font-medium hover:underline mt-auto">
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
