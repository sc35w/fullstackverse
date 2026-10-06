import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Star, Users } from "lucide-react";

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
    <div className="bg-white">
      <section className="nb-hero">
        <div className="nb-container py-14 text-center md:py-20">
          <h1 className="nb-h1">All Courses</h1>
          <p className="nb-lead mx-auto mt-4 max-w-2xl md:text-lg">Explore our comprehensive range of professional courses</p>
        </div>
      </section>

      <section className="nb-section nb-section--soft">
        <div className="nb-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allCourses.map((course) => (
            <div key={course.id} className="nb-card flex flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="nb-icon">
                  <GraduationCap className="h-5 w-5" />
                </span>
                {course.trending && <span className="nb-chip">Trending 2025</span>}
              </div>
              <h3 className="text-xl font-semibold text-nb-text">{course.title}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-slate-500">({course.reviews.toLocaleString()} reviews)</span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-nb-muted">{course.description}</p>
              <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
                <Users className="h-4 w-4" />
                {course.instructor}
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-nb-line pt-4">
                <span className="text-2xl font-bold text-nb-text">{course.price}</span>
                <span className="text-sm text-slate-500">EMI available</span>
              </div>
              <Link to={course.link} className="btn-solid btn-sm mt-4 w-full">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
