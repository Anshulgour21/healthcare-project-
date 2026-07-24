import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import { Option, Select } from '../components/ui/Select';
import CourseCard from '../components/CourseCard';
import { languages, listCourses } from '../data/pocCourses';

export default function Courses() {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('all');
  const courses = useMemo(() => listCourses(), []);

  const filtered = courses.filter((course) => {
    const matchesLanguage = language === 'all' || course.language === language;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [course.title, course.description, course.category, course.language]
      .join(' ')
      .toLowerCase()
      .includes(query);
    return matchesLanguage && matchesSearch;
  });

  return (
    <div>
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              Healthcare LMS POC
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight mb-4">Healthcare Course Library</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Present multilingual healthcare training journeys with polished course detail, learning, assessment, and dummy enrollment flows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search healthcare courses..."
                  className="pl-10 h-12 text-base bg-background"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <Select value={language} onChange={setLanguage} className="w-full sm:w-[220px] h-12 bg-background text-base">
                {languages.map((item) => (
                  <Option key={item} value={item}>
                    {item === 'all' ? 'All Languages' : item}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-display font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try another keyword or language.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filtered.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
