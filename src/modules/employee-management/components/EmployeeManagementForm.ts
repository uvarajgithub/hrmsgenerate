import { EmployeeFormInput, EmployeeValidationIssue } from '../types/employee-management';
import { buildFullName, validateEmployeeInput } from '../validators/employee-management.validators';
import { getEmployeeById } from '../services/employee-management.service';

export interface EmployeeFormField {
  name: keyof EmployeeFormInput;
  label: string;
  required: boolean;
  value: string;
  helpText?: string;
}

export interface EmployeeFormViewModel {
  title: string;
  fields: EmployeeFormField[];
  previewFullName: string;
  validationIssues: EmployeeValidationIssue[];
}

export function EmployeeManagementForm(
  input: Partial<EmployeeFormInput> = {},
  existingIds: string[] = []
): EmployeeFormViewModel {
  const snapshot = existingIds.map((id) => getEmployeeById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getEmployeeById>>[];
  const validationIssues = validateEmployeeInput(input, snapshot);

  const fields: EmployeeFormField[] = [
    { name: 'employeeCode', label: 'Employee Code', required: true, value: input.employeeCode ?? '' },
    { name: 'firstName', label: 'First Name', required: true, value: input.firstName ?? '' },
    { name: 'lastName', label: 'Last Name', required: true, value: input.lastName ?? '' },
    { name: 'department', label: 'Department', required: true, value: input.department ?? '' },
    { name: 'designation', label: 'Designation', required: false, value: input.designation ?? '' },
    { name: 'jobTitle', label: 'Job Title', required: false, value: input.jobTitle ?? '' },
    { name: 'managerId', label: 'Manager', required: false, value: input.managerId ?? '' },
    { name: 'joiningDate', label: 'Joining Date', required: true, value: input.joiningDate ?? '' },
    { name: 'employmentType', label: 'Employment Type', required: true, value: input.employmentType ?? '' },
    { name: 'email', label: 'Email', required: true, value: input.email ?? '' },
    { name: 'phone', label: 'Phone', required: false, value: input.phone ?? '' },
    { name: 'address', label: 'Address', required: false, value: input.address ?? '' },
  ];

  return {
    title: 'Employee Profile',
    fields,
    previewFullName: buildFullName({
      firstName: input.firstName ?? '',
      lastName: input.lastName ?? '',
    }),
    validationIssues,
  };
}
