import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Star, Users } from "lucide-react";
import { Button } from "../../components/ui/button";

const allCourses = [
  {
    id: "data-analytics",
    title: "Data Analytics",
    instructor: "Meghana Gowda V",
    rating: 4.9,
    reviews: 2626,
    trending: true,
    price: "₹25,000",
    description: "Master Data Analytics with comprehensive training, covering SQL, Python, Power BI, and more.",
    link: "/skillverse/data-analytics-crash-course"
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    instructor: "Shruthi Ganta",
    rating: 4.7,
    reviews: 4143,
    trending: true,
    price: "₹30,000",
    description: "AI focuses on creating smart systems. Dive into neural networks, deep learning.",
    link: "/skillverse/course"
  },
  {
    id: "web-dev",
    title: "Web Development",
    instructor: "Amrit Raj",
    rating: 4.9,
    reviews: 3897,
    trending: true,
    price: "₹20,000",
    description: "Learn to create responsive, user-friendly web applications with modern technologies.",
    link: "/skillverse/course"
  },
  {
    id: "data-science",
    title: "Data Science",
    instructor: "Meghana Gowda V",
    rating: 4.5,
    reviews: 2465,
    trending: true,
    price: "₹28,000",
    description: "Data Science blends programming with analytical skills to extract insights from data.",
    link: "/skillverse/course"
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    instructor: "Rohit Mukherjee",
    rating: 4.8,
    reviews: 1675,
    trending: true,
    price: "₹25,000",
    description: "Gain expertise in encryption, ethical hacking, and risk management.",
    link: "/skillverse/course"
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    instructor: "Shruthi Ganta",
    rating: 4.4,
    reviews: 2376,
    trending: true,
    price: "₹32,000",
    description: "Master Python libraries and algorithms to solve real-world problems.",
    link: "/skillverse/course"
  },
];

export default function SkillVerseCoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600">Explore our comprehensive range of professional courses</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className="bg-gradient-to-br from-red-500 to-red-700 h-48 flex items-center justify-center relative overflow-hidden">
                <GraduationCap className="h-20 w-20 text-white group-hover:scale-110 transition-transform" />
                {course.trending && (
                  <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Trending 2025
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-lg">{course.rating}</span>
                  <span className="text-gray-500">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {course.instructor}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-red-600">{course.price}</span>
                  <span className="text-sm text-gray-500">EMI available</span>
                </div>
                <Link to={course.link}>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
