import { useApplicationStore } from '@/lib/applicationStore';
import { FormInput } from '@/components/forms/FormInput';
import { FormTextarea } from '@/components/forms/FormTextarea';
import { FormSelect } from '@/components/forms/FormSelect';

export function Step7Documentation() {
  const documentation = useApplicationStore((s) => s.data.documentation);
  const updateDocumentation = useApplicationStore((s) => s.updateDocumentation);
  const additional = useApplicationStore((s) => s.data.additional);
  const updateAdditional = useApplicationStore((s) => s.updateAdditional);

  return (
    <div className="space-y-6">
      {/* Documentation Status */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Management System Documentation
          </h2>
          <p className="text-sm text-gray-600">
            State the status of your management system documentation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="msEstablished"
            checked={documentation.established}
            onChange={(e) =>
              updateDocumentation({ established: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="msEstablished" className="text-sm text-gray-700">
            Documentation has been established (policy, manual, procedures)
          </label>
        </div>

        <FormSelect
          label="Type of Management System Documentation"
          value={documentation.type}
          onChange={(v) =>
            updateDocumentation({ type: v as 'Individual' | 'Integrated' | '' })
          }
          options={[
            { value: 'Individual', label: 'Individual' },
            { value: 'Integrated', label: 'Integrated' },
          ]}
          placeholder="Select type"
        />

        {documentation.type === 'Integrated' && (
          <div className="space-y-3 pl-6 border-l-2 border-blue-200">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="manualIntegrated"
                checked={documentation.manualIntegrated}
                onChange={(e) =>
                  updateDocumentation({ manualIntegrated: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="manualIntegrated" className="text-sm text-gray-700">
                Manual & procedures established in integrated form
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="policyIntegrated"
                checked={documentation.policyIntegrated}
                onChange={(e) =>
                  updateDocumentation({ policyIntegrated: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="policyIntegrated" className="text-sm text-gray-700">
                Policy established in integrated form
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="internalAuditIntegrated"
                checked={documentation.internalAuditIntegrated}
                onChange={(e) =>
                  updateDocumentation({
                    internalAuditIntegrated: e.target.checked,
                  })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="internalAuditIntegrated"
                className="text-sm text-gray-700"
              >
                Internal audit & management review carried out as integrated
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Additional Information
          </h2>
        </div>

        <FormInput
          label="When do you plan to receive the certificate? (estimation)"
          value={additional.targetDate}
          onChange={(v) => updateAdditional({ targetDate: v })}
          placeholder="e.g. Q2 2027"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasOtherCerts"
            checked={additional.hasOtherCerts}
            onChange={(e) =>
              updateAdditional({ hasOtherCerts: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="hasOtherCerts" className="text-sm text-gray-700">
            The company has been certified to other ISO certification(s)
          </label>
        </div>

        {additional.hasOtherCerts && (
          <FormTextarea
            label="Please specify the ISO certification(s)"
            value={additional.otherCertsDetails}
            onChange={(v) => updateAdditional({ otherCertsDetails: v })}
            placeholder="e.g. ISO 9001:2015 (certified by XYZ)"
            rows={2}
          />
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasConsultant"
            checked={additional.hasConsultant}
            onChange={(e) =>
              updateAdditional({ hasConsultant: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="hasConsultant" className="text-sm text-gray-700">
            Engaged a consultant to set up the management system
          </label>
        </div>

        {additional.hasConsultant && (
          <FormInput
            label="Consultant's Name"
            value={additional.consultantName}
            onChange={(v) => updateAdditional({ consultantName: v })}
            placeholder="e.g. ABC Consultancy Sdn Bhd"
          />
        )}

        <FormSelect
          label="How did you hear of NIOSH Certification?"
          value={additional.marketingSource}
          onChange={(v) => updateAdditional({ marketingSource: v })}
          options={[
            {
              value: 'Facebook/LinkedIn/NIOSH Certification Website',
              label: 'Facebook/LinkedIn/NIOSH Certification Website',
            },
            { value: 'Exhibition/Seminar', label: 'Exhibition/Seminar' },
            { value: 'Consultant', label: 'Consultant' },
            { value: 'Newspaper', label: 'Newspaper' },
            {
              value: 'Friend/company that has been certified by NIOSH Certification',
              label: 'Friend/company that has been certified',
            },
            { value: 'Other', label: 'Other' },
          ]}
          placeholder="Select source"
        />
      </div>

      {/* Declaration */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Declaration</h2>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="declaration"
            checked={additional.declaration}
            onChange={(e) =>
              updateAdditional({ declaration: e.target.checked })
            }
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="declaration" className="text-sm text-gray-700">
            I hereby declare that I have understood and agreed with all terms
            and conditions as per Terms, Conditions and PDPA Consent Notice. I
            have answered all relevant questions as required.
          </label>
        </div>
      </div>
    </div>
  );
}

