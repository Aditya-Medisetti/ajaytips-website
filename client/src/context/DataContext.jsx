import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(['crs_1']);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/courses');
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
      }
    } catch (e) {
      console.warn('Backend server offline or loading mock fallback.');
    }

    try {
      const tRes = await fetch('/api/tests');
      if (tRes.ok) {
        const tData = await tRes.json();
        setTests(tData.tests || []);
      }
    } catch (e) {}

    try {
      const lRes = await fetch('/api/live-classes');
      if (lRes.ok) {
        const lData = await lRes.json();
        setLiveClasses(lData.liveClasses || []);
      }
    } catch (e) {}

    try {
      const mRes = await fetch('/api/materials');
      if (mRes.ok) {
        const mData = await mRes.json();
        setMaterials(mData.materials || []);
      }
    } catch (e) {}

    setLoading(false);
  };

  const enrollInCourse = (courseId) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds((prev) => [...prev, courseId]);
    }
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DataContext.Provider
      value={{
        courses,
        tests,
        liveClasses,
        materials,
        enrolledCourseIds,
        notifications,
        searchQuery,
        setSearchQuery,
        enrollInCourse,
        markNotificationsRead,
        refreshData: fetchData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
