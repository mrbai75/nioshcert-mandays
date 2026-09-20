import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '@/lib/applicationStore';
import { useQuestionnaireStore } from '@/lib/questionnaireStore';

// =============================================================================
// RESULT PAGE
// =============================================================================
// Papar result dari state (dihantar dari AnswersPage selepas submit)
// Guna window.history.state atau sessionStorage

interface ResultState {
  applicationId: string | null;
  referenceNo: string | null;
  fte: number;
  fteFormula: string;
  totalEffectiveMd: number;
  isIms: boolean;
  standards: Array<{
    standard: string;
    complexity: string | null;
    baseMd: number | null;
    effectiveMd: number | null;
    stage1Md: number | null;
    stage2Md: number | null;
    surveillanceMd: number | null;
    recertMd: number | null;
  }>;
  ims?: {
    rawTotalMd: number;
    actualReduction: number;
    finalTotalMd: number;
  };
}

export function ResultPage() {
  const navigate = useNavigate();
  const resetApplication = useApplicationStore((s) => s.reset);
  const resetQuestionnaire = useQuestionnaireStore((s) => s.reset);

  // Ambil result dari sessionStorage
  const resultJson = sessionStorage.getItem('scale-last-result');
  const result: ResultState | null = resultJson ? JSON.parse(resultJson) : null;

  const handleNewApplication = () => {
    sessionStorage.removeItem('scale-last-result');
    resetApplication();
    resetQuestionnaire();
    navigate('/');
  };

  if (!result) {
    return (
      <div className="max-w-3xl">
        <div className="bg-amber-50 border border-amber-200 rounded p-6 text-center">
          <p className="text-amber-800 font-medium mb-2">No result found</p>
          <p className="text-sm text-amber-700 mb-4">
            Sila submit questionnaire terlebih dahulu.
          </p>
          <button
            onClick={() => navigate('/questionnaire/new')}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded p-6">
        <h1 className="text-2xl font-bold text-green-900 mb-1">
          ✅ Calculation Complete
        </h1>
        <p className="text-sm text-green-700">
          Application {result.referenceNo ?? 'N/A'} telah dihantar.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Reference No:</span>
            <span className="ml-2 font-medium">{result.referenceNo ?? 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-500">Application ID:</span>
            <span className="ml-2 font-mono text-xs">{result.applicationId ?? 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-500">FTE:</span>
            <span className="ml-2 font-medium">{result.fte}</span>
          </div>
          <div>
            <span className="text-gray-500">Is IMS:</span>
            <span className="ml-2 font-medium">{result.isIms ? 'Yes' : 'No'}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">FTE Formula:</span>
            <span className="ml-2 font-mono text-xs">{result.fteFormula}</span>
          </div>
        </div>
      </div>

      {/* Standards Table */}
      <div className="bg-white border border-gray-200 rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Per Standard</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Standard</th>
                <th className="px-3 py-2 text-left">Complexity</th>
                <th className="px-3 py-2 text-right">Base MD</th>
                <th className="px-3 py-2 text-right">Effective MD</th>
                <th className="px-3 py-2 text-right">Stage 1</th>
                <th className="px-3 py-2 text-right">Stage 2</th>
                <th className="px-3 py-2 text-right">Surveillance</th>
                <th className="px-3 py-2 text-right">Recert</th>
              </tr>
            </thead>
            <tbody>
              {result.standards.map((s) => (
                <tr key={s.standard} className="border-t">
                  <td className="px-3 py-2 font-medium">{s.standard}</td>
                  <td className="px-3 py-2">{s.complexity ?? 'N/A'}</td>
                  <td className="px-3 py-2 text-right">{s.baseMd ?? 'N/A'}</td>
                  <td className="px-3 py-2 text-right">{s.effectiveMd ?? 'N/A'}</td>
                  <td className="px-3 py-2 text-right">{s.stage1Md ?? 'N/A'}</td>
                  <td className="px-3 py-2 text-right">{s.stage2Md ?? 'N/A'}</td>
                  <td className="px-3 py-2 text-right">{s.surveillanceMd ?? 'N/A'}</td>
                  <td className="px-3 py-2 text-right">{s.recertMd ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMS Info */}
      {result.isIms && result.ims && (
        <div className="bg-blue-50 border border-blue-200 rounded p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            IMS Reduction
          </h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Raw Total MD:</span>
              <span className="ml-2 font-medium">{result.ims.rawTotalMd}</span>
            </div>
            <div>
              <span className="text-gray-600">Reduction:</span>
              <span className="ml-2 font-medium">
                {(result.ims.actualReduction * 100).toFixed(0)}%
              </span>
            </div>
            <div>
              <span className="text-gray-600">Final Total MD:</span>
              <span className="ml-2 font-bold text-blue-700">
                {result.ims.finalTotalMd.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Final Total */}
      <div className="bg-gray-900 text-white rounded p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Effective MD</p>
            <p className="text-3xl font-bold">{result.totalEffectiveMd.toFixed(2)}</p>
          </div>
          <button
            onClick={handleNewApplication}
            className="px-6 py-2 bg-white text-gray-900 text-sm font-medium rounded hover:bg-gray-100"
          >
            New Application
          </button>
        </div>
      </div>
    </div>
  );
}
