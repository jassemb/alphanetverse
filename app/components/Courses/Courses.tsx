
"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiClock, FiBook, FiDollarSign, FiStar } from "react-icons/fi";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    price: number;
    duration: string;
    enrolled: number;
    rating: number;
    image: string;
  }>>([]);
  const [filteredCourses, setFilteredCourses] = useState<Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    price: number;
    duration: string;
    enrolled: number;
    rating: number;
    image: string;
  }>>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    price: number;
    duration: string;
    enrolled: number;
    rating: number;
    image: string;
  } | null>(null);

  const dummyCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Master modern web development with this comprehensive course",
      category: "beginner",
      difficulty: "beginner",
      price: 499,
      duration: "12 weeks",
      enrolled: 1234,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      description: "Deep dive into advanced JavaScript concepts and patterns",
      category: "advanced",
      difficulty: "advanced",
      price: 799,
      duration: "8 weeks",
      enrolled: 856,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 3,
      title: "Professional UI/UX Design",
      description: "Learn professional UI/UX design principles and tools",
      category: "professional",
      difficulty: "intermediate",
      price: 699,
      duration: "10 weeks",
      enrolled: 967,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-15094619832283-21af10586883"
    },
    {
      id: 4,
      title: "Machine Learning Specialization",
      description: "Master machine learning algorithms and implementations",
      category: "specialty",
      difficulty: "advanced",
      price: 899,
      duration: "16 weeks",
      enrolled: 543,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544819667-9bfc1de23d4e"
    }
  ];

  useEffect(() => {
    setCourses(dummyCourses);
    setFilteredCourses(dummyCourses);
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course => {
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
      const matchesPrice = course.price <= priceRange;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDifficulty && matchesPrice && matchesSearch;
    });
    setFilteredCourses(filtered);
  }, [selectedCategory, selectedDifficulty, priceRange, searchQuery, courses]);

  const CourseCard = ({ course }: { course: {
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    price: number;
    duration: string;
    enrolled: number;
    rating: number;
    image: string;
  } }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
         onClick={() => {
           setSelectedCourse(course);
           setShowModal(true);
         }}
         role="button"
         tabIndex={0}>
      <div className="relative pb-48">
        <img
          src={course.image}
          alt={course.title}
          className="absolute h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 text-sm rounded ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
          <span className="flex items-center text-yellow-500">
            <FiStar className="mr-1" />
            {course.rating}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <FiClock className="mr-1" />
            {course.duration}
          </span>
          <span className="flex items-center">
            <FiDollarSign className="mr-1" />
            {course.price}
          </span>
        </div>
      </div>
    </div>
  );

  const Modal = ({ course }: { course: {
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    price: number;
    duration: string;
    enrolled: number;
    rating: number;
    image: string;
  } }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold">Duration</h4>
            <p>{course.duration}</p>
          </div>
          <div>
            <h4 className="font-semibold">Enrolled</h4>
            <p>{course.enrolled} students</p>
          </div>
          <div>
            <h4 className="font-semibold">Difficulty</h4>
            <p className="capitalize">{course.difficulty}</p>
          </div>
          <div>
            <h4 className="font-semibold">Price</h4>
            <p>${course.price}</p>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Enroll Now
        </button>
      </div>
    </div>
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Courses & Learning Packs</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-8">
                <FiBook className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600">No courses found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedCourse && <Modal course={selectedCourse} />}
    </div>
  );
};

export default CoursesPage;