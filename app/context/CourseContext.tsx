import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { CourseRequest, CourseResponse } from '../../types/coursesProps';

type ChildrenProps = {
  children: ReactNode;
};

interface ICourseContext {
  courseSelected: CourseResponse | null;
  setCourseSelected: Dispatch<SetStateAction<CourseResponse | null>>;
  courses: CourseResponse[] | null;
  setCourses: Dispatch<SetStateAction<CourseResponse[] | null>>;
  newCourse: CourseRequest | null;
  setNewCourse: Dispatch<SetStateAction<CourseRequest | null>>;
}
const initialdata = {
  courseSelected: null,
  setCourseSelected: () => {},
  courses: null,
  setCourses: () => {},
  newCourse: null,
  setNewCourse: () => {},
};

export const CourseContext = createContext<ICourseContext>(initialdata);

export const CourseProvider = ({ children }: ChildrenProps) => {
  const [courseSelected, setCourseSelected] = useState<CourseResponse | null>(
    initialdata.courseSelected
  );
  const [courses, setCourses] = useState<CourseResponse[] | null>(
    initialdata.courses
  );
  const [newCourse, setNewCourse] = useState<CourseRequest | null>(
    initialdata.newCourse
  );

  return (
    <CourseContext.Provider
      value={{
        courseSelected,
        setCourseSelected,
        courses,
        setCourses,
        newCourse,
        setNewCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
