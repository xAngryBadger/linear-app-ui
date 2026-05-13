import type { Issue, Team, Member, Label } from '../types'

export const teams: Team[] = [
  { id: 'team-1', name: 'Engineering', key: 'ENG', icon: '⚙️' },
  { id: 'team-2', name: 'Design', key: 'DSN', icon: '🎨' },
  { id: 'team-3', name: 'Operations', key: 'OPS', icon: '🔧' },
]

export const members: Member[] = [
  { id: 'member-1', name: 'Isaac', avatar: 'IS', isCurrentUser: true },
  { id: 'member-2', name: 'Alice', avatar: 'AL', isCurrentUser: false },
  { id: 'member-3', name: 'Bob', avatar: 'BO', isCurrentUser: false },
  { id: 'member-4', name: 'Carol', avatar: 'CA', isCurrentUser: false },
  { id: 'member-5', name: 'Dave', avatar: 'DA', isCurrentUser: false },
]

export const labels: Label[] = [
  { id: 'label-1', name: 'Bug', color: '#f54242' },
  { id: 'label-2', name: 'Feature', color: '#5e6ad2' },
  { id: 'label-3', name: 'Improvement', color: '#f5d142' },
  { id: 'label-4', name: 'Documentation', color: '#42b5f5' },
  { id: 'label-5', name: 'Performance', color: '#f58a42' },
  { id: 'label-6', name: 'Security', color: '#42f575' },
  { id: 'label-7', name: 'Design', color: '#d242f5' },
  { id: 'label-8', name: 'Infrastructure', color: '#8b8b8b' },
]

export const issues: Issue[] = [
  { id: 'issue-1', identifier: 'ENG-1', title: 'Implement authentication flow with OAuth2', description: 'Set up OAuth2 authentication with support for Google and GitHub providers. Include token refresh and session management.', status: 'in_progress', priority: 'high', assigneeId: 'member-1', teamId: 'team-1', labelIds: ['label-2'], createdAt: '2026-01-15T10:00:00Z', updatedAt: '2026-05-10T14:30:00Z' },
  { id: 'issue-2', identifier: 'ENG-2', title: 'Fix memory leak in WebSocket connection handler', description: 'WebSocket connections are not properly cleaned up when components unmount, leading to memory leaks in long-running sessions.', status: 'in_progress', priority: 'urgent', assigneeId: 'member-3', teamId: 'team-1', labelIds: ['label-1', 'label-5'], createdAt: '2026-02-01T09:00:00Z', updatedAt: '2026-05-12T08:15:00Z' },
  { id: 'issue-3', identifier: 'ENG-3', title: 'Add pagination to API endpoints', description: 'Implement cursor-based pagination for all list endpoints. Return page info and total count in response metadata.', status: 'todo', priority: 'medium', assigneeId: 'member-2', teamId: 'team-1', labelIds: ['label-2'], createdAt: '2026-02-10T11:00:00Z', updatedAt: '2026-02-10T11:00:00Z' },
  { id: 'issue-4', identifier: 'ENG-4', title: 'Migrate database schema to v3', description: 'Apply migration scripts for v3 schema changes including new audit tables and index optimizations.', status: 'todo', priority: 'high', assigneeId: 'member-1', teamId: 'team-1', labelIds: ['label-8'], createdAt: '2026-02-15T14:00:00Z', updatedAt: '2026-03-01T10:00:00Z' },
  { id: 'issue-5', identifier: 'ENG-5', title: 'Set up CI/CD pipeline with GitHub Actions', description: 'Configure automated testing, building, and deployment pipeline. Include staging and production environments.', status: 'done', priority: 'high', assigneeId: 'member-3', teamId: 'team-1', labelIds: ['label-8'], createdAt: '2026-01-20T08:00:00Z', updatedAt: '2026-04-05T16:00:00Z' },
  { id: 'issue-6', identifier: 'ENG-6', title: 'Implement rate limiting middleware', description: 'Add rate limiting to protect API endpoints from abuse. Use sliding window algorithm with Redis backend.', status: 'todo', priority: 'medium', assigneeId: 'member-2', teamId: 'team-1', labelIds: ['label-6', 'label-5'], createdAt: '2026-03-01T10:00:00Z', updatedAt: '2026-03-01T10:00:00Z' },
  { id: 'issue-7', identifier: 'ENG-7', title: 'Refactor error handling to use result types', description: 'Replace thrown exceptions with Result type pattern for better error handling in the service layer.', status: 'backlog', priority: 'low', assigneeId: null, teamId: 'team-1', labelIds: ['label-3'], createdAt: '2026-03-05T12:00:00Z', updatedAt: '2026-03-05T12:00:00Z' },
  { id: 'issue-8', identifier: 'ENG-8', title: 'Add integration tests for payment module', description: 'Write comprehensive integration tests covering all payment flows including refunds and subscriptions.', status: 'backlog', priority: 'medium', assigneeId: null, teamId: 'team-1', labelIds: ['label-1'], createdAt: '2026-03-10T09:00:00Z', updatedAt: '2026-03-10T09:00:00Z' },
  { id: 'issue-9', identifier: 'ENG-9', title: 'Optimize SQL queries for dashboard', description: 'Dashboard page loads are slow due to N+1 queries. Optimize with eager loading and query caching.', status: 'in_progress', priority: 'high', assigneeId: 'member-3', teamId: 'team-1', labelIds: ['label-5'], createdAt: '2026-03-15T11:00:00Z', updatedAt: '2026-05-11T09:00:00Z' },
  { id: 'issue-10', identifier: 'DSN-1', title: 'Design new onboarding flow', description: 'Create a streamlined onboarding experience with progressive disclosure and interactive walkthrough.', status: 'in_progress', priority: 'high', assigneeId: 'member-4', teamId: 'team-2', labelIds: ['label-7', 'label-2'], createdAt: '2026-02-01T10:00:00Z', updatedAt: '2026-05-10T15:00:00Z' },
  { id: 'issue-11', identifier: 'DSN-2', title: 'Update design system color tokens', description: 'Revise color palette to meet WCAG 2.1 AA contrast requirements. Update all component token references.', status: 'todo', priority: 'medium', assigneeId: 'member-4', teamId: 'team-2', labelIds: ['label-7'], createdAt: '2026-02-15T09:00:00Z', updatedAt: '2026-02-15T09:00:00Z' },
  { id: 'issue-12', identifier: 'DSN-3', title: 'Create icon set for navigation', description: 'Design a consistent set of 24x24 navigation icons in two weights (regular and bold).', status: 'done', priority: 'low', assigneeId: 'member-4', teamId: 'team-2', labelIds: ['label-7'], createdAt: '2026-01-10T08:00:00Z', updatedAt: '2026-03-20T12:00:00Z' },
  { id: 'issue-13', identifier: 'DSN-4', title: 'Redesign settings page layout', description: 'Settings page needs better information architecture. Group related settings and add search functionality.', status: 'backlog', priority: 'low', assigneeId: null, teamId: 'team-2', labelIds: ['label-3', 'label-7'], createdAt: '2026-03-01T11:00:00Z', updatedAt: '2026-03-01T11:00:00Z' },
  { id: 'issue-14', identifier: 'DSN-5', title: 'Implement dark mode toggle animation', description: 'Create smooth transition animation when switching between themes. Use shared element transitions.', status: 'todo', priority: 'medium', assigneeId: 'member-2', teamId: 'team-2', labelIds: ['label-2', 'label-7'], createdAt: '2026-03-10T14:00:00Z', updatedAt: '2026-03-10T14:00:00Z' },
  { id: 'issue-15', identifier: 'DSN-6', title: 'Audit component accessibility', description: 'Run axe-core audit on all components. Fix critical and serious accessibility violations.', status: 'backlog', priority: 'high', assigneeId: null, teamId: 'team-2', labelIds: ['label-3'], createdAt: '2026-03-20T09:00:00Z', updatedAt: '2026-03-20T09:00:00Z' },
  { id: 'issue-16', identifier: 'OPS-1', title: 'Set up monitoring and alerting', description: 'Configure Prometheus metrics, Grafana dashboards, and PagerDuty alerting for production services.', status: 'todo', priority: 'urgent', assigneeId: 'member-5', teamId: 'team-3', labelIds: ['label-8'], createdAt: '2026-01-25T08:00:00Z', updatedAt: '2026-01-25T08:00:00Z' },
  { id: 'issue-17', identifier: 'OPS-2', title: 'Automate infrastructure provisioning', description: 'Write Terraform modules for all cloud resources. Implement workspace-based environment isolation.', status: 'in_progress', priority: 'high', assigneeId: 'member-5', teamId: 'team-3', labelIds: ['label-8'], createdAt: '2026-02-05T10:00:00Z', updatedAt: '2026-05-08T11:00:00Z' },
  { id: 'issue-18', identifier: 'OPS-3', title: 'Create runbook for incident response', description: 'Document step-by-step procedures for common incidents. Include escalation paths and communication templates.', status: 'backlog', priority: 'medium', assigneeId: null, teamId: 'team-3', labelIds: ['label-4'], createdAt: '2026-02-20T09:00:00Z', updatedAt: '2026-02-20T09:00:00Z' },
  { id: 'issue-19', identifier: 'OPS-4', title: 'Implement log aggregation pipeline', description: 'Set up centralized logging with ELK stack. Configure log retention policies and structured logging format.', status: 'done', priority: 'high', assigneeId: 'member-5', teamId: 'team-3', labelIds: ['label-8'], createdAt: '2026-01-15T08:00:00Z', updatedAt: '2026-04-10T14:00:00Z' },
  { id: 'issue-20', identifier: 'OPS-5', title: 'Configure auto-scaling policies', description: 'Set up horizontal pod auto-scaling based on CPU and custom metrics. Define scaling boundaries and cooldown periods.', status: 'todo', priority: 'medium', assigneeId: 'member-5', teamId: 'team-3', labelIds: ['label-5', 'label-8'], createdAt: '2026-03-05T11:00:00Z', updatedAt: '2026-03-05T11:00:00Z' },
  { id: 'issue-21', identifier: 'ENG-10', title: 'Implement file upload with resumable support', description: 'Add chunked file upload with resume capability for large files. Store chunks in object storage.', status: 'backlog', priority: 'medium', assigneeId: null, teamId: 'team-1', labelIds: ['label-2'], createdAt: '2026-03-20T10:00:00Z', updatedAt: '2026-03-20T10:00:00Z' },
  { id: 'issue-22', identifier: 'ENG-11', title: 'Add real-time collaboration features', description: 'Implement operational transform for concurrent editing. Show presence indicators and cursor positions.', status: 'backlog', priority: 'high', assigneeId: null, teamId: 'team-1', labelIds: ['label-2'], createdAt: '2026-04-01T09:00:00Z', updatedAt: '2026-04-01T09:00:00Z' },
  { id: 'issue-23', identifier: 'DSN-7', title: 'Design mobile responsive layouts', description: 'Create responsive breakpoints and adaptive layouts for all pages. Prioritize mobile-first approach.', status: 'cancelled', priority: 'medium', assigneeId: 'member-4', teamId: 'team-2', labelIds: ['label-7'], createdAt: '2026-01-30T10:00:00Z', updatedAt: '2026-04-15T09:00:00Z' },
  { id: 'issue-24', identifier: 'OPS-6', title: 'Set up disaster recovery plan', description: 'Define RPO and RTO targets. Document failover procedures and test recovery scenarios quarterly.', status: 'backlog', priority: 'high', assigneeId: null, teamId: 'team-3', labelIds: ['label-8', 'label-6'], createdAt: '2026-04-05T08:00:00Z', updatedAt: '2026-04-05T08:00:00Z' },
  { id: 'issue-25', identifier: 'OPS-7', title: 'Migrate to multi-region deployment', description: 'Extend infrastructure to secondary region. Set up cross-region replication and traffic routing.', status: 'backlog', priority: 'urgent', assigneeId: null, teamId: 'team-3', labelIds: ['label-8'], createdAt: '2026-04-10T09:00:00Z', updatedAt: '2026-04-10T09:00:00Z' },
]
