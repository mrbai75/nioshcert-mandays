import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { HealthPage } from '@/pages/HealthPage';
import { QuestionnairePage } from '@/pages/QuestionnairePage';
import { AnswersPage } from '@/pages/AnswersPage';
import { ReviewPage } from '@/pages/ReviewPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ResultPage } from '@/pages/ResultPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/questionnaire/new" element={<QuestionnairePage />} />
          <Route path="/questionnaire/answers" element={<AnswersPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

