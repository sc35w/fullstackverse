import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users } from "lucide-react";
import { PageHero, Section } from "../../components/site/blocks";

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
    <div className="bg-canvas">
      <PageHero
        eyebrow="Courses"
        title="All"
        highlight="Courses"
        lead="Explore our comprehensive range of professional courses"
        spec={[
          ['Courses', String(allCourses.length).padStart(2, '0')],
          ['Payment', 'EMI available'],
        ]}
      />

      <Section>
        <ol className="border-b border-line">
          {allCourses.map((course, i) => (
            <li key={course.id} className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-6">
              <span className="meta md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <div className="md:col-span-4">
                <h2 className="display-3 !text-[clamp(1.6rem,2.4vw,2.2rem)]">{course.title}</h2>
                <div className="mono mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-2">
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-ink text-ink" />{course.rating}</span>
                  <span>({course.reviews.toLocaleString()} reviews)</span>
                  {course.trending && <span className="tag">Trending 2025</span>}
                </div>
              </div>
              <div className="md:col-span-4">
                <p className="text-[15px] leading-relaxed text-ink-2">{course.description}</p>
                <p className="meta mt-4 flex items-center gap-2"><Users className="h-3.5 w-3.5" />{course.instructor}</p>
              </div>
              <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end">
                <div className="md:text-right">
                  <div className="font-display text-3xl tracking-[-0.03em]">{course.price}</div>
                  <div className="meta mt-1">EMI available</div>
                </div>
                <Link to={course.link} className="btn btn-secondary btn-sm">
                  View Details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
