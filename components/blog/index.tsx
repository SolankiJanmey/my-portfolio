import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Zap, Filter, Search, X } from "lucide-react";
import { alice } from "@/pages";

const blogCategories = [
  "All",
  "Web Development",
  "Design",
  "AI",
  "Cloud",
  "Cybersecurity",
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of React Architecture",
    excerpt:
      "Exploring cutting-edge patterns in modern React development and scalable application design.",
    image: "https://placehold.co/800x600",
    date: "March 15, 2024",
    readTime: "8 min",
    category: "Web Development",
    difficulty: "Advanced",
    tags: ["React", "Architecture", "Performance"],
  },
  {
    id: 2,
    title: "AI-Driven Design Systems",
    excerpt:
      "How artificial intelligence is revolutionizing user interface design and component creation.",
    image: "https://placehold.co/800x600",
    date: "February 20, 2024",
    readTime: "7 min",
    category: "AI",
    difficulty: "Intermediate",
    tags: ["AI", "Design", "UI/UX"],
  },
  {
    id: 3,
    title: "Zero Trust Security Model",
    excerpt:
      "Deep dive into modern cybersecurity strategies and implementing zero trust architecture.",
    image: "https://placehold.co/800x600",
    date: "January 10, 2024",
    readTime: "9 min",
    category: "Cybersecurity",
    difficulty: "Advanced",
    tags: ["Security", "Network", "Cloud"],
  },
  {
    id: 4,
    title: "Serverless Cloud Innovations",
    excerpt:
      "Exploring the latest advancements in serverless computing and cloud-native technologies.",
    image: "https://placehold.co/800x600",
    date: "December 5, 2023",
    readTime: "6 min",
    category: "Cloud",
    difficulty: "Intermediate",
    tags: ["Cloud", "Serverless", "Architecture"],
  },
  {
    id: 5,
    title: "Design Language Evolution",
    excerpt:
      "How design systems are transforming the way we create consistent and scalable interfaces.",
    image: "https://placehold.co/800x600",
    date: "November 15, 2023",
    readTime: "7 min",
    category: "Design",
    difficulty: "Beginner",
    tags: ["Design", "UI", "Systems"],
  },
  {
    id: 6,
    title: "Machine Learning for Developers",
    excerpt:
      "Practical guide to integrating machine learning techniques into web and mobile applications.",
    image: "https://placehold.co/800x600",
    date: "October 22, 2023",
    readTime: "8 min",
    category: "AI",
    difficulty: "Advanced",
    tags: ["Machine Learning", "AI", "Development"],
  },
];

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: any) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div
      className={`min-h-screen  bg-gradient-to-br from-neutral-50 to-gray-50 p-8  ${alice.className}`}
    >
      <div className="container mx-auto max-w-[90rem] w-full my-[100px]">
        {/* Header and Search */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800"
          >
            My Writings
          </motion.h1>

          <div className="relative flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64 focus:ring-2 focus:ring-neutral-300 transition"
            />
            <Search className="absolute left-3 text-gray-400" size={20} />
            {searchTerm && (
              <X
                onClick={() => setSearchTerm("")}
                className="absolute right-3 text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap  gap-3 mb-8">
          {blogCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-2 rounded-full transition-all
                 ${
                   selectedCategory === category
                     ? "bg-neutral-900 text-white"
                     : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                 }
              `}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Blog Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg relative"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                  <div
                    className={`
                    absolute top-3 right-3 
                    ${getDifficultyColor(post.difficulty)} 
                    px-2 py-1 rounded-full text-xs font-semibold
                  `}
                  >
                    {post.difficulty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock size={16} className="mr-2" />
                      {post.readTime} read
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 flex items-center justify-center bg-neutral-900 text-white py-2 rounded-lg hover:bg-neutral-800 transition-all duration-500"
                  >
                    <BookOpen size={20} className="mr-2" />
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-lg"
          >
            <Zap size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-600">No blogs found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
