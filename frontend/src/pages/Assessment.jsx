import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { getCourse } from '../data/pocCourses';
import { saveAssessmentResult } from '../utils/pocStorage';
import { courseLabels } from '../utils/courseLanguage';

export default function Assessment() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const course = useMemo(() => getCourse(courseId), [courseId]);
  const module = course?.modules.find((item) => item.id === moduleId);
  const assessment = module?.assessment;
  const t = courseLabels(course?.language);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  if (!course || !module || !assessment) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{t.noAssessment}</h2>
        <Button as={Link} to="/courses">Browse Courses</Button>
      </div>
    );
  }

  function selectAnswer(questionIndex, optionIndex) {
    const next = [...answers];
    next[questionIndex] = optionIndex;
    setAnswers(next);
  }

  function submit() {
    const correct = assessment.questions.filter((question, index) => answers[index] === question.correctOption).length;
    const score = Math.round((correct / assessment.questions.length) * 100);
    const nextResult = { score, passed: score >= assessment.passingScore };
    saveAssessmentResult(assessment.id, nextResult);
    setResult(nextResult);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl">
        <Link to={`/courses/${course.id}/learn`} className="text-sm text-muted-foreground hover:text-foreground">
          {t.backToLesson}
        </Link>
        <div className="mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Trophy className="h-4 w-4" />
            {t.assessment}
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">{module.title}</h1>
          <p className="text-muted-foreground">{t.answerPrompt}</p>
        </div>

        <div className="space-y-4">
          {assessment.questions.map((question, questionIndex) => (
            <div key={question.text} className="border rounded-2xl bg-card p-5">
              <div className="font-semibold mb-4">{question.text}</div>
              <div className="grid gap-2">
                {question.options.map((option, optionIndex) => (
                  <label key={option} className="flex items-center gap-3 rounded-lg border px-3 py-2 hover:bg-muted/40 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${questionIndex}`}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() => selectAnswer(questionIndex, optionIndex)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={submit}>{t.submitAssessment}</Button>
          {result && (
            <div className={`mt-4 rounded-2xl border p-5 ${result.passed ? 'bg-primary/5 text-primary' : 'bg-destructive/5 text-destructive'}`}>
              <div className="flex items-center gap-2 font-semibold">
                {result.passed ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {t.score}: {result.score}% - {result.passed ? t.passed : t.tryAgain}
              </div>
              <Button variant="outline" className="mt-4" onClick={() => navigate(`/courses/${course.id}`)}>
                {t.returnToCourse}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
