import type { NmRegion, OrgType, FunderType, GrantStatus } from './types';

export function formatCurrency(amount: string | number | null): string {
  if (amount == null) return 'Amount not disclosed';
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(n)) return 'Amount not disclosed';
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(n);
}

export function formatGrantRange(
  min: string | null, max: string | null
): string {
  if (!min && !max) return 'Amount not disclosed';
  if (!min) return `Up to ${formatCurrency(max)}`;
  if (!max) return `From ${formatCurrency(min)}`;
  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

export function formatDeadline(date: string | null): string {
  if (!date) return 'Rolling';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(date));
}

export function regionLabel(code: NmRegion): string {
  const labels: Record<NmRegion, string> = {
    albuquerque_metro: 'Albuquerque Metro',
    northern_nm:       'Northern NM',
    southern_nm:       'Southern NM',
    eastern_nm:        'Eastern NM',
    four_corners:      'Four Corners',
    statewide:         'Statewide',
  };
  return labels[code] ?? code;
}

export function orgTypeLabel(type: OrgType): string {
  const labels: Record<OrgType, string> = {
    nonprofit_501c3:    '501(c)(3) Nonprofit',
    nonprofit_501c4:    '501(c)(4) Social Welfare',
    fiscal_sponsor:     'Fiscal Sponsor',
    tribal_organization:'Tribal Organization',
    government_agency:  'Government Agency',
    community_foundation:'Community Foundation',
    private_foundation: 'Private Foundation',
    corporate_funder:   'Corporate Funder',
    collaborative_fund: 'Collaborative Fund',
    resource_hub:       'Resource Hub',
  };
  return labels[type] ?? type;
}

export function funderTypeLabel(type: FunderType): string {
  const labels: Record<FunderType, string> = {
    community_foundation: 'Community Foundation',
    private_foundation:   'Private Foundation',
    family_foundation:    'Family Foundation',
    corporate_foundation: 'Corporate Foundation',
    government_grant:     'Government Grant',
    tribal_grant:         'Tribal Grant',
    federal_pass_through: 'Federal Pass-Through',
  };
  return labels[type] ?? type;
}

export function grantStatusLabel(status: GrantStatus): string {
  const labels: Record<GrantStatus, string> = {
    open:     'Open',
    closed:   'Closed',
    rolling:  'Rolling',
    upcoming: 'Upcoming',
  };
  return labels[status] ?? status;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function truncate(text: string | null, length: number): string {
  if (!text) return '';
  return text.length <= length ? text : text.slice(0, length - 1) + '…';
}

export function buildMetaTitle(title: string, suffix = 'NM Nonprofits'): string {
  return `${title} | ${suffix}`;
}
