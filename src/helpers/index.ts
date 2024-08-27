export type CompanySize = 'Small' | 'Medium' | 'Big' | 'Grand';

export interface UserEnrichment {
  name: string;
  email: string;
  gender: string;
}

export interface CompanyEnrichment {
  name: string;
  size: CompanySize;
  domain: string;
}

export function categorize(
  userEnrichment?: UserEnrichment,
  companyEnrichment?: CompanyEnrichment
): 'Likely' | 'Unlikely' | undefined {
  const { name } = userEnrichment || {};
  const { name: companyName, size } = companyEnrichment || {};
  if (size === 'Grand' || (size === 'Big' && name && companyName)) {
    return 'Likely';
  }

  if (size === 'Big' || (size === 'Medium' && name && companyName)) {
    return 'Unlikely';
  }
}
